import { useMemo } from 'react';
import { APNStatic, APNType, getAPN, loadAPN } from '../apn/APN';
import {
  CountryISO,
  DEFAULT_COUNTRY,
  getCountryCode,
  toCountryISO,
} from '../country-code-metadata/CountryCodeMetadata';

const PLUS_SIGN = '+';
const NON_PHONE_SYMBOLS_PATTERN = /[^+\d]/g;
const PHONE_PATTERN = /^\+?\d+/g;

function getPrefix(country: CountryISO): string {
  return PLUS_SIGN + String(getCountryCode(toCountryISO(country)));
}

function trim(input: unknown): string | undefined {
  return typeof input == 'string' ? input.trim() : undefined;
}

function normalize(input: unknown): string {
  if (typeof input == 'string') {
    const matches = input
      .replace(NON_PHONE_SYMBOLS_PATTERN, '')
      .match(PHONE_PATTERN);
    if (matches?.[0]) return matches[0];
  }

  return '';
}

function normalizeNational(country: CountryISO, input: unknown): string {
  const phone = normalize(input);
  const prefix = getPrefix(country);

  if (phone.startsWith(PLUS_SIGN)) {
    return phone.slice(prefix.length);
  }

  return phone;
}

export type PhoneNumberPossibility =
  | 'is-possible'
  | 'invalid-country-code'
  | 'invalid-number'
  | 'too-long'
  | 'too-short'
  | 'unknown';

interface PhoneNumberJSON {
  valid: boolean;
  possible: boolean;
  possibility: PhoneNumberPossibility;

  regionCode: CountryISO;
  number: {
    input: string;
    national?: string;
  };
}

export interface PhoneNumberInfo {
  country: CountryISO;
  nationalNumber: string;
}

export type PhoneNumberFormat =
  | 'e164'
  | 'international'
  | 'national'
  | 'rfc3966';

export interface PhoneValidationRules {
  required?: boolean;
  requiredMessage?: string;
  tooShortMessage?: string;
  tooLongMessage?: string;
  invalidMessage?: string;
}

export interface PhoneFormatOptions {
  fallback?: string;
  country?: CountryISO;
  format?: PhoneNumberFormat;
}

export class PhoneService {
  static load(): Promise<PhoneService> {
    return loadAPN().then((APN) => new PhoneService(APN));
  }

  static checkPossibility(input: unknown): Promise<PhoneNumberPossibility> {
    return this.load().then((phoneService) =>
      phoneService.checkPossibility(input),
    );
  }

  static validate(
    input: unknown,
    rules?: PhoneValidationRules,
  ): Promise<string | undefined> {
    return this.load().then((phoneService) =>
      phoneService.validate(input, rules),
    );
  }

  readonly APN;

  constructor(APN: APNStatic) {
    this.APN = APN;
  }

  createAPN(phone: string, country?: CountryISO): APNType {
    const asYouType = this.APN.getAsYouType(toCountryISO(country));

    asYouType.reset(normalize(phone));

    return asYouType.getPhoneNumber();
  }

  getJSON(phone: string, country?: CountryISO): PhoneNumberJSON {
    return this.createAPN(phone, country).toJSON() as PhoneNumberJSON;
  }

  checkPossibility(input: unknown): PhoneNumberPossibility {
    const phone = trim(input);

    if (!phone) {
      return 'unknown';
    }

    const apn = phone.startsWith(PLUS_SIGN)
      ? new this.APN(phone)
      : new this.APN(phone, DEFAULT_COUNTRY);
    const { valid, possible, possibility } = apn.toJSON() as PhoneNumberJSON;

    // Avoid false positive short phone numbers.
    if (!valid && possible) {
      return 'invalid-number';
    }

    return possibility;
  }

  validate(
    input: unknown,
    {
      required,
      requiredMessage = 'This field is required',
      invalidMessage = 'Invalid phone number',
      tooLongMessage = 'Phone number is too long',
      tooShortMessage = 'Phone number is too short',
    }: PhoneValidationRules = {},
  ): string | undefined {
    const phone = trim(input);

    if (!phone) {
      if (required) {
        return requiredMessage;
      }

      return undefined;
    }

    switch (this.checkPossibility(phone)) {
      case 'is-possible':
        return undefined;
      case 'too-long':
        return tooLongMessage;
      case 'too-short':
        return tooShortMessage;
    }

    return invalidMessage;
  }

  getInfo(phone: string): PhoneNumberInfo {
    let {
      regionCode,
      number: { input, national: nationalNumber },
    } = this.getJSON(phone);

    const country = toCountryISO(regionCode);

    if (!nationalNumber) {
      nationalNumber = normalizeNational(country, input);
    }

    return { country, nationalNumber };
  }

  format(
    input: unknown,
    { country, format = 'e164', fallback = '' }: PhoneFormatOptions = {},
  ): string {
    const phone = normalize(input);

    if (!phone) {
      return fallback;
    }

    const apn = this.createAPN(phone, country);
    let formatted = apn.getNumber(format);

    if (!formatted) {
      country = toCountryISO(apn.getRegionCode());

      const nationalNumber = normalizeNational(country, phone);

      if (format === 'national') {
        return nationalNumber;
      }

      let prefix = '';
      let separator = '';

      if (format === 'rfc3966') {
        prefix = 'tel:';
        separator = '-';
      }

      if (format === 'international') {
        separator = ' ';
      }

      formatted = prefix + getPrefix(country);

      if (nationalNumber) {
        formatted += separator + nationalNumber;
      }
    }

    return formatted;
  }
}

export function usePhoneService(): PhoneService {
  const APN = getAPN();

  return useMemo(() => new PhoneService(APN), [APN]);
}
