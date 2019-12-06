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

export function getCountryCodeForRegionCode(region: RegionCode): number {
  try {
    return PhoneNumber.getCountryCodeForRegionCode(region);
  } catch (e) {
    return 1;
  }
}
