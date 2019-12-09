import APN from 'awesome-phonenumber';

import { RegionCode } from '../internal/PhoneMetadata';

const NON_DIGITS_REGEXP = /\D+/g;

function getAYT(regionCode: null | undefined | RegionCode) {
  try {
    return APN.getAsYouType(regionCode || 'US');
  } catch (e) {
    return APN.getAsYouType('US');
  }
}

function extractDigits(value: null | string | undefined): string {
  return value?.replace(NON_DIGITS_REGEXP, '') ?? '';
}

export type PhoneNumberLike = string | PhoneNumber;

export class PhoneNumber {
  private static toAPN(
    value: null | undefined | PhoneNumberLike,
  ): undefined | APN {
    if (!value) {
      return undefined;
    }

    // If we get plain string, we use APN constructor directly.
    if (typeof value === 'string') {
      const digits = extractDigits(value);

      if (!digits) {
        return undefined;
      }

      // Prepend `+` because we expect international number.
      return new APN(`+${digits}`);
    }

    const ayt = getAYT(value.region);

    ayt.reset(value.nationalNumber);

    return ayt.getPhoneNumber();
  }

  private static fromAPN(apn?: APN): undefined | PhoneNumber {
    return !apn
      ? undefined
      : new PhoneNumber(
          apn.getRegionCode() as RegionCode,
          apn.getNumber('national'),
        );
  }

  static fromInternational(
    phone: null | string | undefined,
  ): undefined | PhoneNumber {
    return PhoneNumber.fromAPN(PhoneNumber.toAPN(phone));
  }

  static getExample(region: RegionCode): PhoneNumber {
    let apn: APN;

    try {
      apn = APN.getExample(region);
    } catch (e) {
      apn = APN.getExample('US');
    }

    return PhoneNumber.fromAPN(apn) as PhoneNumber;
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

  static isValid(phoneNumber?: PhoneNumberLike): boolean {
    return !!PhoneNumber.toAPN(phoneNumber)?.isValid();
  }

  static toNational({ region, nationalNumber }: PhoneNumber): string {
    const digits = extractDigits(nationalNumber);

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

  static toInternational(phoneNumber?: PhoneNumberLike): undefined | string {
    return PhoneNumber.toAPN(phoneNumber)?.getNumber('international');
  }

  static toE164(phoneNumber?: PhoneNumberLike): undefined | string {
    return PhoneNumber.toAPN(phoneNumber)?.getNumber('e164');
  }

  static toRFC3966(phoneNumber?: PhoneNumberLike): undefined | string {
    const apn = PhoneNumber.toAPN(phoneNumber);

    return apn?.getNumber('rfc3966');
  }

  constructor(region: RegionCode, nationalNumber?: string) {
    this.region = region;
    this.nationalNumber = nationalNumber;
  }

  region: RegionCode;
  nationalNumber?: string;
}
