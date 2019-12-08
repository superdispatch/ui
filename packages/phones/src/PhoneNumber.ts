import AwesomePhoneNumber from 'awesome-phonenumber';

import { RegionCode } from './PhoneMetadata';

const NON_DIGITS_REGEXP = /\D+/g;

function extractDigits(value: string): string {
  return value.replace(NON_DIGITS_REGEXP, '');
}

export class PhoneNumber {
  static fromInternational(
    phone: null | string | undefined,
  ): undefined | PhoneNumber {
    const digits = phone && extractDigits(phone);

    if (!digits) {
      return undefined;
    }
    try {
      const phoneNumber = new AwesomePhoneNumber(digits);

      return new PhoneNumber(
        phoneNumber.getRegionCode() as RegionCode,
        phoneNumber.getNumber('national'),
      );
    } catch (e) {
      return undefined;
    }
  }

  static formatNational(region: RegionCode, phoneNumber: string): string {
    const asYouType = AwesomePhoneNumber.getAsYouType(region);

    asYouType.reset(phoneNumber);

    return (
      asYouType.getPhoneNumber().getNumber('national') || asYouType.number()
    );
  }

  static getExample(region: RegionCode): PhoneNumber {
    let phoneNumber: AwesomePhoneNumber;

    try {
      phoneNumber = AwesomePhoneNumber.getExample(region);
    } catch (e) {
      phoneNumber = AwesomePhoneNumber.getExample('US');
    }

    return new PhoneNumber(
      phoneNumber.getRegionCode() as RegionCode,
      phoneNumber.getNumber('national'),
    );
  }

  static getCountryCodeForRegionCode(region: RegionCode): number {
    try {
      return AwesomePhoneNumber.getCountryCodeForRegionCode(region);
    } catch (e) {
      return 1;
    }
  }

  static getRegionCodeForCountryCode(countryCode: number): RegionCode {
    try {
      return AwesomePhoneNumber.getRegionCodeForCountryCode(
        countryCode,
      ) as RegionCode;
    } catch (e) {
      return 'US';
    }
  }

  constructor(region?: RegionCode, nationalNumber?: string) {
    this.region = region;
    this.nationalNumber = nationalNumber;
  }

  region?: RegionCode;
  nationalNumber?: string;
}
