import APN from 'awesome-phonenumber';

export type PhoneRegionCode =
  | 'US'
  | 'CA'
  | 'AU'
  | 'NZ'
  | 'AC'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TA'
  | 'TC'
  | 'TD'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';

function getAYT(regionCode: null | undefined | PhoneRegionCode) {
  try {
    return APN.getAsYouType(regionCode || 'US');
  } catch (e) {
    return APN.getAsYouType('US');
  }
}

function extractDigits(value: null | string | undefined): string {
  return value?.replace(/\D+/g, '') ?? '';
}

export type PhoneNumberLike = string | PhoneNumber;

export type PhonePossibility =
  | 'is-possible'
  | 'invalid-country-code'
  | 'too-long'
  | 'too-short'
  | 'unknown';

export class PhoneNumber {
  private static toAYT(value?: PhoneNumber) {
    if (value) {
      try {
        const ayt = getAYT(value.region);

        ayt.reset(value.nationalNumber);

        return ayt;
      } catch (e) {}
    }

    return undefined;
  }

  private static isValidAPN(apn?: APN): apn is APN {
    return !!apn?.getRegionCode();
  }

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

      // Try parse as international.
      const international = new APN(`+${digits}`);

      if (PhoneNumber.isValidAPN(international)) {
        return international;
      }

      // Fallback to US number
      return PhoneNumber.toAPN({ region: 'US', nationalNumber: digits });
    }

    return PhoneNumber.toAYT(value)?.getPhoneNumber();
  }

  private static fromAPN(apn?: APN): undefined | PhoneNumber {
    const regionCode = apn?.getRegionCode() as PhoneRegionCode;
    const nationalNumber = apn?.getNumber('national');

    return !regionCode || !nationalNumber
      ? undefined
      : new PhoneNumber(regionCode, nationalNumber);
  }

  static fromInternational(
    phone: null | string | undefined,
  ): undefined | PhoneNumber {
    return PhoneNumber.fromAPN(PhoneNumber.toAPN(phone));
  }

  static getExample(region: PhoneRegionCode): PhoneNumber {
    let apn: APN;

    try {
      apn = APN.getExample(region);
    } catch (e) {
      apn = APN.getExample('US');
    }

    return PhoneNumber.fromAPN(apn) as PhoneNumber;
  }

  static getCountryCode(regionCode: PhoneRegionCode): number {
    try {
      return APN.getCountryCodeForRegionCode(regionCode);
    } catch (e) {
      return 1;
    }
  }

  static getRegionCode(countryCode: number): PhoneRegionCode {
    try {
      return APN.getRegionCodeForCountryCode(countryCode) as PhoneRegionCode;
    } catch (e) {
      return 'US';
    }
  }

  static isValid(phoneNumber?: PhoneNumberLike): boolean {
    return !!PhoneNumber.toAPN(phoneNumber)?.isValid();
  }

  static validate(phoneNumber?: PhoneNumberLike): PhonePossibility {
    return PhoneNumber.toAPN(phoneNumber)?.toJSON().possibility ?? 'unknown';
  }

  static toNational(phoneNumber?: PhoneNumberLike): undefined | string {
    if (typeof phoneNumber === 'string') {
      return PhoneNumber.toAPN(phoneNumber)?.getNumber('national');
    }

    const ayt = PhoneNumber.toAYT(phoneNumber);

    return !ayt
      ? undefined
      : ayt.getPhoneNumber().getNumber('national') || ayt.number();
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

  constructor(region: PhoneRegionCode, nationalNumber?: string) {
    this.region = region;
    this.nationalNumber = nationalNumber;
  }

  region: PhoneRegionCode;
  nationalNumber?: string;
}
