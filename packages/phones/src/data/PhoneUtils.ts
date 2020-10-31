import AwesomePhonenumber from 'awesome-phonenumber';

import {
  CountryISO,
  getCountryCode,
  toCountryISO,
} from './CountryCodeMetadata';

const DEFAULT_REGION_CODE: CountryISO = 'US';

function extractDigits(value: string): string {
  return value.replace(/\D+/g, '');
}

function createAPN(phone: string, country?: CountryISO): AwesomePhonenumber {
  const isInternational = phone.includes('+');

  phone = extractDigits(phone);

  if (isInternational) {
    phone = `+${phone}`;
  }

  if (country == null) {
    const apn = isInternational
      ? new AwesomePhonenumber(phone)
      : new AwesomePhonenumber(phone, DEFAULT_REGION_CODE);

    if (apn.getNumber('national')) {
      return apn;
    }
  }

  const ayt = AwesomePhonenumber.getAsYouType(toCountryISO(country));

  ayt.reset(phone);

  return ayt.getPhoneNumber();
}

export type PhoneNumberPair = [country: CountryISO, natinalNumber: string];

function parseNationalNumberSimple(
  country: CountryISO,
  nationalNumber: string,
) {
  const isInternational = nationalNumber.includes('+');

  nationalNumber = extractDigits(nationalNumber);

  if (isInternational) {
    const countryCode = String(getCountryCode(country));

    if (nationalNumber.startsWith(countryCode)) {
      nationalNumber = nationalNumber.slice(countryCode.length);
    }
  }

  return nationalNumber;
}

export function parsePhoneNumber(value: string): PhoneNumberPair {
  const apn = createAPN(value);
  const country = apn.getRegionCode() as CountryISO;
  let nationalNumber = apn.getNumber('national');

  if (!nationalNumber) {
    nationalNumber = parseNationalNumberSimple(country, value);
  }

  return [country, nationalNumber];
}

export function getExamplePhoneNumber(country: CountryISO): string {
  return AwesomePhonenumber.getExample(toCountryISO(country)).getNumber('e164');
}

function formatPhoneNumberSimple(
  nationalNumber: string,
  country: undefined | CountryISO,
  format: PhoneNumberFormat,
): string {
  country = toCountryISO(country);
  nationalNumber = parseNationalNumberSimple(country, nationalNumber);

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

  let formatted = prefix + String(getCountryCode(country));

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
  const [country, nationalNumber] =
    typeof input === 'string' ? [undefined, input] : input;
  const apn = createAPN(nationalNumber, country);
  const formatted = apn.getNumber(format);

  if (formatted) {
    return formatted;
  }

  return formatPhoneNumberSimple(nationalNumber, country, format);
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
