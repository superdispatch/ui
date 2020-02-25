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

export type PhoneNumberLike = string | PhoneNumber;
export type NullablePhoneNumber = null | undefined | PhoneNumber;
export type NullablePhoneNumberLike = null | undefined | PhoneNumberLike;

export type PhonePossibility =
  | 'is-possible'
  | 'invalid-country-code'
  | 'too-long'
  | 'too-short'
  | 'unknown';

const DEFAULT_COUNTRY_CODE = 1;
const DEFAULT_REGION_CODE: PhoneRegionCode = 'US';

function getAYT(regionCode: null | undefined | PhoneRegionCode) {
  try {
    return APN.getAsYouType(regionCode || 'US');
  } catch {
    return APN.getAsYouType('US');
  }
}

function extractPhone(value: null | string | undefined): string {
  if (value == null) {
    return '';
  }

  let digits = value.replace(/\D+/g, '');

  if (value.includes('+')) {
    digits = `+${digits}`;
  }

  return digits;
}

export class PhoneNumber {
  static isPhoneNumberLike(value: unknown): value is PhoneNumberLike {
    return (
      typeof value === 'string' ||
      (typeof value === 'object' &&
        value != null &&
        'region' in value &&
        typeof (value as PhoneNumber).region === 'string')
    );
  }

  private static toAYT(value: NullablePhoneNumber) {
    if (value) {
      try {
        const ayt = getAYT(value.region);

        ayt.reset(value.nationalNumber);

        return ayt;
      } catch {}
    }

    return undefined;
  }

  private static isValidAPN(apn?: APN): apn is APN {
    return !!apn?.getRegionCode();
  }

  private static toAPN(value: unknown): undefined | APN {
    if (!PhoneNumber.isPhoneNumberLike(value)) {
      return undefined;
    }

    // If we get plain string, we use APN constructor directly.
    if (typeof value !== 'string') {
      return PhoneNumber.toAYT(value)?.getPhoneNumber();
    }

    const digits = extractPhone(value);

    if (!digits) {
      return undefined;
    }

    // Try parse as international.
    const international = digits.startsWith('+')
      ? new APN(digits)
      : new APN(digits, DEFAULT_REGION_CODE);

    if (PhoneNumber.isValidAPN(international)) {
      return international;
    }

    // Fallback to US number
    return PhoneNumber.toAPN({
      region: DEFAULT_REGION_CODE,
      nationalNumber: digits,
    });
  }

  private static fromAPN(apn: undefined | APN): undefined | PhoneNumber {
    if (!apn) {
      return undefined;
    }

    const regionCode = apn.getRegionCode() as PhoneRegionCode;
    const nationalNumber = apn.getNumber('national');

    return !regionCode || !nationalNumber
      ? undefined
      : new PhoneNumber(regionCode, nationalNumber);
  }

  static getCountryCode(regionCode: PhoneRegionCode): number {
    let countryCode = DEFAULT_COUNTRY_CODE;

    try {
      countryCode = APN.getCountryCodeForRegionCode(regionCode);
    } catch {}

    return countryCode !== 0 ? countryCode : DEFAULT_COUNTRY_CODE;
  }

  static getRegionCode(countryCode: number): PhoneRegionCode {
    let regionCode: string = DEFAULT_REGION_CODE;

    try {
      regionCode = APN.getRegionCodeForCountryCode(countryCode);
    } catch {}

    return regionCode === 'ZZ'
      ? DEFAULT_REGION_CODE
      : (regionCode as PhoneRegionCode);
  }

  static fromInternational(
    phone: null | string | undefined,
  ): undefined | PhoneNumber {
    return PhoneNumber.fromAPN(PhoneNumber.toAPN(phone));
  }

  static getExample(
    region: PhoneRegionCode = DEFAULT_REGION_CODE,
  ): PhoneNumber {
    let apn: APN;

    try {
      apn = APN.getExample(region);
    } catch {
      apn = APN.getExample(DEFAULT_REGION_CODE);
    }

    return PhoneNumber.fromAPN(apn) as PhoneNumber;
  }

  static isValid(value: unknown): boolean {
    return !!PhoneNumber.toAPN(value)?.isValid();
  }

  static validate(value: unknown): PhonePossibility {
    if (!PhoneNumber.isPhoneNumberLike(value)) {
      return 'unknown';
    }

    if (PhoneNumber.isValid(value)) {
      return 'is-possible';
    }

    const possibility: PhonePossibility = PhoneNumber.toAPN(value)?.toJSON()
      .possibility;

    switch (possibility) {
      case undefined:
        return 'unknown';
      case 'is-possible':
        return 'too-short'; // Avoid possible short phones.
      default:
        return possibility;
    }
  }

  static toNational(value: NullablePhoneNumberLike): undefined | string {
    if (typeof value === 'string') {
      return PhoneNumber.toAPN(value)?.getNumber('national');
    }

    const ayt = PhoneNumber.toAYT(value);

    return !ayt
      ? undefined
      : ayt.getPhoneNumber().getNumber('national') || ayt.number();
  }

  static toInternational(value: NullablePhoneNumberLike): undefined | string {
    return PhoneNumber.toAPN(value)?.getNumber('international');
  }

  static toE164(value: NullablePhoneNumberLike): undefined | string {
    return PhoneNumber.toAPN(value)?.getNumber('e164');
  }

  static toRFC3966(value: NullablePhoneNumberLike): undefined | string {
    return PhoneNumber.toAPN(value)?.getNumber('rfc3966');
  }

  constructor(region: PhoneRegionCode, nationalNumber?: string) {
    this.region = region;
    this.nationalNumber = nationalNumber;
  }

  region: PhoneRegionCode;
  nationalNumber?: string;
}
