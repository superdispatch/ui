import { useMemo } from 'react';

import { APNStatic, APNType, getAPN } from '../apn/APN';
import {
  CountryISO,
  getCountryCode,
  toCountryISO,
} from '../country-code-metadata/CountryCodeMetadata';

const PLUS_SIGN = '+';
const NON_PHONE_SYMBOLS_PATTERN = /[^+\d]/g;
const PHONE_PATTERN = /^\+?\d+/g;

export type PhoneNumberPossibility =
  | 'is-possible'
  | 'invalid-country-code'
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
  protected static getPrefix(country: CountryISO): string {
    return PLUS_SIGN + String(getCountryCode(toCountryISO(country)));
  }

  protected static normalize(input: unknown): string {
    if (typeof input == 'string') {
      const matches = input
        .replace(NON_PHONE_SYMBOLS_PATTERN, '')
        .match(PHONE_PATTERN);

      if (matches) {
        return matches[0];
      }
    }

    return '';
  }

  protected static normalizeNational(
    country: CountryISO,
    input: unknown,
  ): string {
    const phone = this.normalize(input);

    if (phone.startsWith(PLUS_SIGN)) {
      const prefix = this.getPrefix(country);

      if (phone.startsWith(prefix)) {
        return phone.slice(prefix.length);
      }

      // Remove leading `+`.
      return phone.slice(1);
    }

    return phone;
  }

  readonly APN;

  constructor(APN: APNStatic) {
    this.APN = APN;
  }

  createAPN(phone: string, country?: CountryISO): APNType {
    const asYouType = this.APN.getAsYouType(toCountryISO(country));

    asYouType.reset(PhoneService.normalize(phone));

    return asYouType.getPhoneNumber();
  }

  getJSON(phone: string, country?: CountryISO): PhoneNumberJSON {
    return this.createAPN(phone, country).toJSON() as PhoneNumberJSON;
  }

  protected getAPNPossibility(apn: APNType): PhoneNumberPossibility {
    const { valid, possible, possibility } = apn.toJSON() as PhoneNumberJSON;

    // Avoid false positive short phone numbers.
    if (!valid && possible) {
      return 'too-short';
    }

    return possibility;
  }

  checkPossibility(phone: string): PhoneNumberPossibility {
    const apn = this.createAPN(phone);

    return this.getAPNPossibility(apn);
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
  ) {
    const phone = PhoneService.normalize(input);

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
      number: { input, national },
    } = this.getJSON(phone);

    const country = toCountryISO(regionCode);

    if (!national) {
      national = PhoneService.normalizeNational(country, input);
    }

    return {
      country,
      nationalNumber: national,
    };
  }

  format(
    input: unknown,
    { country, format = 'e164', fallback = '' }: PhoneFormatOptions = {},
  ) {
    const phone = PhoneService.normalize(input);

    if (!phone) {
      return fallback;
    }

    const apn = this.createAPN(phone, country);
    let formatted = apn.getNumber(format);

    if (!formatted) {
      country = toCountryISO(apn.getRegionCode());

      const nationalNumber = PhoneService.normalizeNational(country, phone);

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

      formatted = prefix + PhoneService.getPrefix(country);

      if (nationalNumber) {
        formatted += separator + nationalNumber;
      }
    }

    return formatted;
  }
}

export function usePhoneService() {
  const APN = getAPN();

  return useMemo(() => new PhoneService(APN), [APN]);
}
