export type RegionCode =
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

export const phoneFieldCountries = new Map<RegionCode, string>([
  ['US', 'United States'],
  ['CA', 'Canada'],
  ['AU', 'Australia'],
  ['NZ', 'New Zealand'],

  ['AC', 'Ascension Island'],
  ['AD', 'Andorra'],
  ['AE', 'United Arab Emirates'],
  ['AF', 'Afghanistan'],
  ['AG', 'Antigua and Barbuda'],
  ['AI', 'Anguilla'],
  ['AL', 'Albania'],
  ['AM', 'Armenia'],
  ['AO', 'Angola'],
  ['AR', 'Argentina'],
  ['AS', 'American Samoa'],
  ['AT', 'Austria'],
  ['AW', 'Aruba'],
  ['AX', 'Åland Islands'],
  ['AZ', 'Azerbaijan'],
  ['BA', 'Bosnia and Herzegovina'],
  ['BB', 'Barbados'],
  ['BD', 'Bangladesh'],
  ['BE', 'Belgium'],
  ['BF', 'Burkina Faso'],
  ['BG', 'Bulgaria'],
  ['BH', 'Bahrain'],
  ['BI', 'Burundi'],
  ['BJ', 'Benin'],
  ['BL', 'Saint Barthélemy'],
  ['BM', 'Bermuda'],
  ['BN', 'Brunei'],
  ['BO', 'Bolivia'],
  ['BQ', 'Caribbean Netherlands'],
  ['BR', 'Brazil'],
  ['BS', 'Bahamas'],
  ['BT', 'Bhutan'],
  ['BW', 'Botswana'],
  ['BY', 'Belarus'],
  ['BZ', 'Belize'],
  ['CC', 'Cocos'],
  ['CD', 'Congo'],
  ['CF', 'Central African Republic'],
  ['CG', 'Congo'],
  ['CH', 'Switzerland'],
  ['CI', 'Côte d’Ivoire'],
  ['CK', 'Cook Islands'],
  ['CL', 'Chile'],
  ['CM', 'Cameroon'],
  ['CN', 'China'],
  ['CO', 'Colombia'],
  ['CR', 'Costa Rica'],
  ['CU', 'Cuba'],
  ['CV', 'Cape Verde'],
  ['CW', 'Curaçao'],
  ['CX', 'Christmas Island'],
  ['CY', 'Cyprus'],
  ['CZ', 'Czech Republic'],
  ['DE', 'Germany'],
  ['DJ', 'Djibouti'],
  ['DK', 'Denmark'],
  ['DM', 'Dominica'],
  ['DO', 'Dominican Republic'],
  ['DZ', 'Algeria'],
  ['EC', 'Ecuador'],
  ['EE', 'Estonia'],
  ['EG', 'Egypt'],
  ['EH', 'Western Sahara'],
  ['ER', 'Eritrea'],
  ['ES', 'Spain'],
  ['ET', 'Ethiopia'],
  ['FI', 'Finland'],
  ['FJ', 'Fiji'],
  ['FK', 'Falkland Islands'],
  ['FM', 'Micronesia'],
  ['FO', 'Faroe Islands'],
  ['FR', 'France'],
  ['GA', 'Gabon'],
  ['GB', 'United Kingdom'],
  ['GD', 'Grenada'],
  ['GE', 'Georgia'],
  ['GF', 'French Guiana'],
  ['GG', 'Guernsey'],
  ['GH', 'Ghana'],
  ['GI', 'Gibraltar'],
  ['GL', 'Greenland'],
  ['GM', 'Gambia'],
  ['GN', 'Guinea'],
  ['GP', 'Guadeloupe'],
  ['GQ', 'Equatorial Guinea'],
  ['GR', 'Greece'],
  ['GT', 'Guatemala'],
  ['GU', 'Guam'],
  ['GW', 'Guinea-Bissau'],
  ['GY', 'Guyana'],
  ['HK', 'Hong Kong'],
  ['HN', 'Honduras'],
  ['HR', 'Croatia'],
  ['HT', 'Haiti'],
  ['HU', 'Hungary'],
  ['ID', 'Indonesia'],
  ['IE', 'Ireland'],
  ['IL', 'Israel'],
  ['IM', 'Isle of Man'],
  ['IN', 'India'],
  ['IO', 'British Indian Ocean Territory'],
  ['IQ', 'Iraq'],
  ['IR', 'Iran'],
  ['IS', 'Iceland'],
  ['IT', 'Italy'],
  ['JE', 'Jersey'],
  ['JM', 'Jamaica'],
  ['JO', 'Jordan'],
  ['JP', 'Japan'],
  ['KE', 'Kenya'],
  ['KG', 'Kyrgyzstan'],
  ['KH', 'Cambodia'],
  ['KI', 'Kiribati'],
  ['KM', 'Comoros'],
  ['KN', 'Saint Kitts and Nevis'],
  ['KP', 'North Korea'],
  ['KR', 'South Korea'],
  ['KW', 'Kuwait'],
  ['KY', 'Cayman Islands'],
  ['KZ', 'Kazakhstan'],
  ['LA', 'Laos'],
  ['LB', 'Lebanon'],
  ['LC', 'Saint Lucia'],
  ['LI', 'Liechtenstein'],
  ['LK', 'Sri Lanka'],
  ['LR', 'Liberia'],
  ['LS', 'Lesotho'],
  ['LT', 'Lithuania'],
  ['LU', 'Luxembourg'],
  ['LV', 'Latvia'],
  ['LY', 'Libya'],
  ['MA', 'Morocco'],
  ['MC', 'Monaco'],
  ['MD', 'Moldova'],
  ['ME', 'Montenegro'],
  ['MF', 'Saint Martin'],
  ['MG', 'Madagascar'],
  ['MH', 'Marshall Islands'],
  ['MK', 'Macedonia'],
  ['ML', 'Mali'],
  ['MM', 'Myanmar'],
  ['MN', 'Mongolia'],
  ['MO', 'Macau'],
  ['MP', 'Northern Mariana Islands'],
  ['MQ', 'Martinique'],
  ['MR', 'Mauritania'],
  ['MS', 'Montserrat'],
  ['MT', 'Malta'],
  ['MU', 'Mauritius'],
  ['MV', 'Maldives'],
  ['MW', 'Malawi'],
  ['MX', 'Mexico'],
  ['MY', 'Malaysia'],
  ['MZ', 'Mozambique'],
  ['NA', 'Namibia'],
  ['NC', 'New Caledonia'],
  ['NE', 'Niger'],
  ['NF', 'Norfolk Island'],
  ['NG', 'Nigeria'],
  ['NI', 'Nicaragua'],
  ['NL', 'Netherlands'],
  ['NO', 'Norway'],
  ['NP', 'Nepal'],
  ['NR', 'Nauru'],
  ['NU', 'Niue'],
  ['OM', 'Oman'],
  ['PA', 'Panama'],
  ['PE', 'Peru'],
  ['PF', 'French Polynesia'],
  ['PG', 'Papua New Guinea'],
  ['PH', 'Philippines'],
  ['PK', 'Pakistan'],
  ['PL', 'Poland'],
  ['PM', 'Saint Pierre and Miquelon'],
  ['PR', 'Puerto Rico'],
  ['PS', 'Palestine'],
  ['PT', 'Portugal'],
  ['PW', 'Palau'],
  ['PY', 'Paraguay'],
  ['QA', 'Qatar'],
  ['RE', 'Réunion'],
  ['RO', 'Romania'],
  ['RS', 'Serbia'],
  ['RU', 'Russia'],
  ['RW', 'Rwanda'],
  ['SA', 'Saudi Arabia'],
  ['SB', 'Solomon Islands'],
  ['SC', 'Seychelles'],
  ['SD', 'Sudan'],
  ['SE', 'Sweden'],
  ['SG', 'Singapore'],
  ['SH', 'Saint Helena'],
  ['SI', 'Slovenia'],
  ['SJ', 'Svalbard and Jan Mayen'],
  ['SK', 'Slovakia'],
  ['SL', 'Sierra Leone'],
  ['SM', 'San Marino'],
  ['SN', 'Senegal'],
  ['SO', 'Somalia'],
  ['SR', 'Suriname'],
  ['SS', 'South Sudan'],
  ['ST', 'São Tomé and Príncipe'],
  ['SV', 'El Salvador'],
  ['SX', 'Sint Maarten'],
  ['SY', 'Syria'],
  ['SZ', 'Swaziland'],
  ['TA', 'Tristan da Cunha'],
  ['TC', 'Turks and Caicos Islands'],
  ['TD', 'Chad'],
  ['TG', 'Togo'],
  ['TH', 'Thailand'],
  ['TJ', 'Tajikistan'],
  ['TK', 'Tokelau'],
  ['TL', 'Timor-Leste'],
  ['TM', 'Turkmenistan'],
  ['TN', 'Tunisia'],
  ['TO', 'Tonga'],
  ['TR', 'Turkey'],
  ['TT', 'Trinidad and Tobago'],
  ['TV', 'Tuvalu'],
  ['TW', 'Taiwan'],
  ['TZ', 'Tanzania'],
  ['UA', 'Ukraine'],
  ['UG', 'Uganda'],
  ['UY', 'Uruguay'],
  ['UZ', 'Uzbekistan'],
  ['VA', 'Vatican City'],
  ['VC', 'Saint Vincent and the Grenadines'],
  ['VE', 'Venezuela'],
  ['VG', 'British Virgin Islands'],
  ['VI', 'U.S. Virgin Islands'],
  ['VN', 'Vietnam'],
  ['VU', 'Vanuatu'],
  ['WF', 'Wallis and Futuna'],
  ['WS', 'Samoa'],
  ['XK', 'Kosovo'],
  ['YE', 'Yemen'],
  ['YT', 'Mayotte'],
  ['ZA', 'South Africa'],
  ['ZM', 'Zambia'],
  ['ZW', 'Zimbabwe'],
]);
