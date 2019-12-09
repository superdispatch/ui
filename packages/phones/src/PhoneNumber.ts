import APN from 'awesome-phonenumber';

import { RegionCode } from './PhoneMetadata';

const NON_DIGITS_REGEXP = /\D+/g;

function tryCreateAPN(
  phoneNumber: string,
  region?: RegionCode,
): undefined | APN {
  try {
    return new APN(phoneNumber, region);
  } catch (e) {
    return undefined;
  }
}

function extractPhone(value: null | string | undefined): string {
  return value?.replace(NON_DIGITS_REGEXP, '') ?? '';
}

export class PhoneNumber {
  private static toAPN(phoneNumber?: PhoneNumber): undefined | APN {
    if (!phoneNumber) {
      return undefined;
    }

    const digits = extractPhone(phoneNumber.nationalNumber);

    return tryCreateAPN(phoneNumber.region ? digits : `+${digits}`);
  }

  static fromInternational(
    phone: null | string | undefined,
  ): undefined | PhoneNumber {
    const phoneNumber = PhoneNumber.toAPN({ nationalNumber: phone || '' });

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

  static isValid(phoneNumber?: PhoneNumber): boolean {
    const apn = PhoneNumber.toAPN(phoneNumber);

    if (apn) {
      return apn.isValid();
    }

    return false;
  }

  static toNational({ region, nationalNumber }: PhoneNumber): string {
    const digits = nationalNumber && extractPhone(nationalNumber);

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

  static toInternational(phoneNumber?: PhoneNumber): undefined | string {
    return PhoneNumber.toAPN(phoneNumber)?.getNumber('international');
  }

  static toE164(phoneNumber?: PhoneNumber): undefined | string {
    return PhoneNumber.toAPN(phoneNumber)?.getNumber('e164');
  }

  static toRFC3966(phoneNumber?: PhoneNumber): undefined | string {
    return PhoneNumber.toAPN(phoneNumber)?.getNumber('rfc3966');
  }

  constructor(region?: RegionCode, nationalNumber?: string) {
    this.region = region;
    this.nationalNumber = nationalNumber;
  }

  region?: RegionCode;
  nationalNumber?: string;
}
