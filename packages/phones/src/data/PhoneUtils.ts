import AwesomePhonenumber from 'awesome-phonenumber';

import { PhoneRegionCode } from './PhoneRegionCode';

const DEFAULT_REGION_CODE: PhoneRegionCode = 'US';

export function getPhoneCountryCode(region: PhoneRegionCode): number {
  return AwesomePhonenumber.getCountryCodeForRegionCode(region);
}

function normalizeRegion(value: string): PhoneRegionCode {
  const countryCode = getPhoneCountryCode(value as PhoneRegionCode);

  if (!countryCode) {
    return DEFAULT_REGION_CODE;
  }

  return value as PhoneRegionCode;
}

function extractDigits(value: string): string {
  return value.replace(/\D+/g, '');
}

function createAPN(
  phone: string,
  regionCode?: PhoneRegionCode,
): AwesomePhonenumber {
  const isInternational = phone.includes('+');

  phone = extractDigits(phone);

  if (isInternational) {
    phone = `+${phone}`;
  }

  if (regionCode == null) {
    const apn = phone.startsWith('+')
      ? new AwesomePhonenumber(phone)
      : new AwesomePhonenumber(phone, DEFAULT_REGION_CODE);

    if (apn.getNumber('national')) {
      return apn;
    }

    regionCode = DEFAULT_REGION_CODE;
  }

  const ayt = AwesomePhonenumber.getAsYouType(normalizeRegion(regionCode));

  ayt.reset(phone);

  return ayt.getPhoneNumber();
}

export type PhoneNumberPair = [region: PhoneRegionCode, natinalNumber: string];

export function parsePhoneNumber(value: string): PhoneNumberPair {
  const apn = createAPN(value);
  let nationalNumber = apn.getNumber('national');

  if (!nationalNumber) {
    nationalNumber = extractDigits(value);
  }

  return [apn.getRegionCode() as PhoneRegionCode, nationalNumber];
}

export function getExamplePhoneNumber(region: PhoneRegionCode): string {
  region = normalizeRegion(region);

  return AwesomePhonenumber.getExample(region).getNumber('e164');
}

function formatPhoneNumberSimple(
  nationalNumber: string,
  region: PhoneRegionCode = DEFAULT_REGION_CODE,
  format: PhoneNumberFormat,
): string {
  region = normalizeRegion(region);
  nationalNumber = extractDigits(nationalNumber);

  if (format === 'national') {
    return nationalNumber;
  }

  let prefix = '+';
  let separator = '';

  if (format === 'rfc3966') {
    prefix = 'tel:+';
    separator = '-';
  }

  if (format === 'international') {
    separator = ' ';
  }

  let formatted = prefix + String(getPhoneCountryCode(region));

  if (nationalNumber) {
    formatted += separator + nationalNumber;
  }

  return formatted;
}

export type PhoneNumberFormat =
  | 'e164'
  | 'international'
  | 'national'
  | 'rfc3966';

export function formatPhoneNumber(
  input: string | PhoneNumberPair,
  format: PhoneNumberFormat = 'e164',
): string {
  const [region, nationalNumber] =
    typeof input === 'string' ? [undefined, input] : input;
  const apn = createAPN(nationalNumber, region);
  const formatted = apn.getNumber(format);

  if (formatted) {
    return formatted;
  }

  return formatPhoneNumberSimple(nationalNumber, region, format);
}

export type PhonePossibility =
  | 'is-possible'
  | 'invalid-country-code'
  | 'too-long'
  | 'too-short'
  | 'unknown';

export function validatePhoneNumber(value: string): PhonePossibility {
  const apn = createAPN(value);

  if (apn.isValid()) {
    return 'is-possible';
  }

  const { possibility } = apn.toJSON() as {
    possibility: PhonePossibility;
  };

  // Avoid possible short phone numbers.
  if (possibility === 'is-possible') {
    return 'too-short';
  }

  return possibility;
}
