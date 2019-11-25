// const DIGITS_REGEXP = /\d+/g;

// export function ensurePhoneNumber(raw: null | string | number | undefined): string {
//   if (raw) {
//     const match = String(raw).match(DIGITS_REGEXP);
//
//     if (match) {
//       return `+${match.join('')}`;
//     }
//   }
//
//   return '';
// }

export interface PhoneData {
  raw: string;
}

// export function parsePhoneData(
//   phoneNumber: string,
//   // lib: undefined | typeof libphonenumber,
// ): PhoneData {
//   const data: PhoneData = { raw: phoneNumber };
//
//   // if (lib && phoneNumber) {
//   //   try {
//   //     // data
//   //     //   countryCode: phoneNumber.getCountryCode(),
//   //     //   nationalNumber: phoneNumber.getNationalNumber(),
//   //     //   isValid: phoneNumberUtil.isValidNumber(phoneNumber),
//   //     //   regionCode: phoneNumberUtil.getRegionCodeForNumber(phoneNumber),
//   //     //
//   //     //   internationalFormat: phoneNumberUtil.format(
//   //     //   phoneNumber,
//   //     //   PhoneNumberFormat.INTERNATIONAL
//   //     // ),
//   //     //   nationalFormat: phoneNumberUtil.format(
//   //     //   phoneNumber,
//   //     //   PhoneNumberFormat.NATIONAL
//   //     // )
//   //   } catch (e) {}
//   // }
//
//   return data;
// }

// export function usePhoneData(raw: null | string | number | undefined): PhoneData {
//   const lib = usePhonesContext();
//   const phoneNumber = useMemo(() => ensurePhoneNumber(raw), [raw]);
//
//   return useMemo<PhoneData>(() => parsePhoneData(phoneNumber, lib), [lib, phoneNumber]);
// }
