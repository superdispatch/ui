import PhoneNumber from 'awesome-phonenumber';

import { RegionCode } from './PhoneMetadata';

export function formatNationalPhoneNumber(
  region: RegionCode,
  phoneNumber: string,
): string {
  const asYouType = PhoneNumber.getAsYouType(region);

  asYouType.reset(phoneNumber);

  return asYouType.getPhoneNumber().getNumber('national') || asYouType.number();
}

export function getExamplePhone(region: RegionCode): PhoneNumber {
  try {
    return PhoneNumber.getExample(region);
  } catch (e) {
    return PhoneNumber.getExample('US');
  }
}

export function getExampleNationalPhoneNumber(region: RegionCode): string {
  let phoneNumber: PhoneNumber;

  try {
    phoneNumber = PhoneNumber.getExample(region);
  } catch (e) {
    phoneNumber = PhoneNumber.getExample('US');
  }

  return phoneNumber.getNumber('national');
}

export function getCountryCodeForRegionCode(region: RegionCode): number {
  try {
    return PhoneNumber.getCountryCodeForRegionCode(region);
  } catch (e) {
    return 1;
  }
}

export function getRegionCodeForCountryCode(countryCode: number): RegionCode {
  try {
    return PhoneNumber.getRegionCodeForCountryCode(countryCode) as RegionCode;
  } catch (e) {
    return 'US';
  }
}
