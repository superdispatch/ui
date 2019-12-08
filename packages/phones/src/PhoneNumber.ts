import APN from 'awesome-phonenumber';

import { RegionCode } from './PhoneMetadata';

const NON_DIGITS_REGEXP = /\D+/g;

function extractDigits(value: null | string | undefined): string {
  return !value ? '' : value.replace(NON_DIGITS_REGEXP, '');
}

function toAPN(
  phoneNumber: null | string | undefined,
  countryCode?: string,
): undefined | APN {
  const digits = extractDigits(phoneNumber);

  try {
    return new APN(digits, countryCode);
  } catch (e) {
    return undefined;
  }
}

export class PhoneNumber {
  static fromInternational(
    phone: null | string | undefined,
  ): undefined | PhoneNumber {
    const phoneNumber = toAPN(phone);

    if (phoneNumber) {
      return new PhoneNumber(
        phoneNumber.getRegionCode() as RegionCode,
        phoneNumber.getNumber('national'),
      );
    }

    return undefined;
  }

  static getExample(region: RegionCode): PhoneNumber {
    let phoneNumber: APN;

    try {
      phoneNumber = APN.getExample(region);
    } catch (e) {
      phoneNumber = APN.getExample('US');
    }

    return new PhoneNumber(
      phoneNumber.getRegionCode() as RegionCode,
      phoneNumber.getNumber('national'),
    );
  }

  static getCountryCode(regionCode: RegionCode): number {
    try {
      return APN.getCountryCodeForRegionCode(regionCode);
    } catch (e) {
      return 1;
    }
  }

  static getRegionCode(countryCode: number): RegionCode {
    try {
      return APN.getRegionCodeForCountryCode(countryCode) as RegionCode;
    } catch (e) {
      return 'US';
    }
  }

  static isValid(phoneNumber: PhoneNumber): boolean {
    if (phoneNumber.nationalNumber) {
      const apn = toAPN(phoneNumber.nationalNumber, phoneNumber.region);

      if (apn) {
        return apn.isValid();
      }
    }

    return false;
  }

  static toNational({ region, nationalNumber }: PhoneNumber): string {
    const digits = nationalNumber && extractDigits(nationalNumber);

    if (!digits) {
      return '';
    }

    if (region) {
      try {
        const asYouType = APN.getAsYouType(region);

        asYouType.reset(digits);

        return (
          asYouType.getPhoneNumber().getNumber('national') || asYouType.number()
        );
      } catch (e) {}
    }

    return digits;
  }

  static toInternational({
    region,
    nationalNumber,
  }: PhoneNumber): undefined | string {
    return toAPN(nationalNumber, region)?.getNumber('international');
  }

  static toE164({ region, nationalNumber }: PhoneNumber): undefined | string {
    return toAPN(nationalNumber, region)?.getNumber('e164');
  }

  static toRFC3966({
    region,
    nationalNumber,
  }: PhoneNumber): undefined | string {
    return toAPN(nationalNumber, region)?.getNumber('rfc3966');
  }

  constructor(region?: RegionCode, nationalNumber?: string) {
    this.region = region;
    this.nationalNumber = nationalNumber;
  }

  region?: RegionCode;
  nationalNumber?: string;
}
