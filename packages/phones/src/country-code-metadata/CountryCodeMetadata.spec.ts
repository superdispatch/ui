import {
  formatCountry,
  getCountryCode,
  isCountryISO,
  listCountries,
  toCountryISO,
} from './CountryCodeMetadata';

test('metadata', () => {
  expect(
    listCountries().map((country) => ({
      country,
      code: getCountryCode(country),
      name: formatCountry(country),
    })),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "code": 1,
        "country": "US",
        "name": "United States",
      },
      Object {
        "code": 1,
        "country": "CA",
        "name": "Canada",
      },
      Object {
        "code": 61,
        "country": "AU",
        "name": "Australia",
      },
      Object {
        "code": 64,
        "country": "NZ",
        "name": "New Zealand",
      },
      Object {
        "code": 247,
        "country": "AC",
        "name": "Ascension Island",
      },
      Object {
        "code": 376,
        "country": "AD",
        "name": "Andorra",
      },
      Object {
        "code": 971,
        "country": "AE",
        "name": "United Arab Emirates",
      },
      Object {
        "code": 93,
        "country": "AF",
        "name": "Afghanistan",
      },
      Object {
        "code": 1,
        "country": "AG",
        "name": "Antigua and Barbuda",
      },
      Object {
        "code": 1,
        "country": "AI",
        "name": "Anguilla",
      },
      Object {
        "code": 355,
        "country": "AL",
        "name": "Albania",
      },
      Object {
        "code": 374,
        "country": "AM",
        "name": "Armenia",
      },
      Object {
        "code": 244,
        "country": "AO",
        "name": "Angola",
      },
      Object {
        "code": 54,
        "country": "AR",
        "name": "Argentina",
      },
      Object {
        "code": 1,
        "country": "AS",
        "name": "American Samoa",
      },
      Object {
        "code": 43,
        "country": "AT",
        "name": "Austria",
      },
      Object {
        "code": 297,
        "country": "AW",
        "name": "Aruba",
      },
      Object {
        "code": 358,
        "country": "AX",
        "name": "Åland Islands",
      },
      Object {
        "code": 994,
        "country": "AZ",
        "name": "Azerbaijan",
      },
      Object {
        "code": 387,
        "country": "BA",
        "name": "Bosnia and Herzegovina",
      },
      Object {
        "code": 1,
        "country": "BB",
        "name": "Barbados",
      },
      Object {
        "code": 880,
        "country": "BD",
        "name": "Bangladesh",
      },
      Object {
        "code": 32,
        "country": "BE",
        "name": "Belgium",
      },
      Object {
        "code": 226,
        "country": "BF",
        "name": "Burkina Faso",
      },
      Object {
        "code": 359,
        "country": "BG",
        "name": "Bulgaria",
      },
      Object {
        "code": 973,
        "country": "BH",
        "name": "Bahrain",
      },
      Object {
        "code": 257,
        "country": "BI",
        "name": "Burundi",
      },
      Object {
        "code": 229,
        "country": "BJ",
        "name": "Benin",
      },
      Object {
        "code": 590,
        "country": "BL",
        "name": "Saint Barthélemy",
      },
      Object {
        "code": 1,
        "country": "BM",
        "name": "Bermuda",
      },
      Object {
        "code": 673,
        "country": "BN",
        "name": "Brunei",
      },
      Object {
        "code": 591,
        "country": "BO",
        "name": "Bolivia",
      },
      Object {
        "code": 599,
        "country": "BQ",
        "name": "Caribbean Netherlands",
      },
      Object {
        "code": 55,
        "country": "BR",
        "name": "Brazil",
      },
      Object {
        "code": 1,
        "country": "BS",
        "name": "Bahamas",
      },
      Object {
        "code": 975,
        "country": "BT",
        "name": "Bhutan",
      },
      Object {
        "code": 267,
        "country": "BW",
        "name": "Botswana",
      },
      Object {
        "code": 375,
        "country": "BY",
        "name": "Belarus",
      },
      Object {
        "code": 501,
        "country": "BZ",
        "name": "Belize",
      },
      Object {
        "code": 61,
        "country": "CC",
        "name": "Cocos",
      },
      Object {
        "code": 243,
        "country": "CD",
        "name": "Congo",
      },
      Object {
        "code": 236,
        "country": "CF",
        "name": "Central African Republic",
      },
      Object {
        "code": 242,
        "country": "CG",
        "name": "Congo",
      },
      Object {
        "code": 41,
        "country": "CH",
        "name": "Switzerland",
      },
      Object {
        "code": 225,
        "country": "CI",
        "name": "Côte d’Ivoire",
      },
      Object {
        "code": 682,
        "country": "CK",
        "name": "Cook Islands",
      },
      Object {
        "code": 56,
        "country": "CL",
        "name": "Chile",
      },
      Object {
        "code": 237,
        "country": "CM",
        "name": "Cameroon",
      },
      Object {
        "code": 86,
        "country": "CN",
        "name": "China",
      },
      Object {
        "code": 57,
        "country": "CO",
        "name": "Colombia",
      },
      Object {
        "code": 506,
        "country": "CR",
        "name": "Costa Rica",
      },
      Object {
        "code": 53,
        "country": "CU",
        "name": "Cuba",
      },
      Object {
        "code": 238,
        "country": "CV",
        "name": "Cape Verde",
      },
      Object {
        "code": 599,
        "country": "CW",
        "name": "Curaçao",
      },
      Object {
        "code": 61,
        "country": "CX",
        "name": "Christmas Island",
      },
      Object {
        "code": 357,
        "country": "CY",
        "name": "Cyprus",
      },
      Object {
        "code": 420,
        "country": "CZ",
        "name": "Czech Republic",
      },
      Object {
        "code": 49,
        "country": "DE",
        "name": "Germany",
      },
      Object {
        "code": 253,
        "country": "DJ",
        "name": "Djibouti",
      },
      Object {
        "code": 45,
        "country": "DK",
        "name": "Denmark",
      },
      Object {
        "code": 1,
        "country": "DM",
        "name": "Dominica",
      },
      Object {
        "code": 1,
        "country": "DO",
        "name": "Dominican Republic",
      },
      Object {
        "code": 213,
        "country": "DZ",
        "name": "Algeria",
      },
      Object {
        "code": 593,
        "country": "EC",
        "name": "Ecuador",
      },
      Object {
        "code": 372,
        "country": "EE",
        "name": "Estonia",
      },
      Object {
        "code": 20,
        "country": "EG",
        "name": "Egypt",
      },
      Object {
        "code": 212,
        "country": "EH",
        "name": "Western Sahara",
      },
      Object {
        "code": 291,
        "country": "ER",
        "name": "Eritrea",
      },
      Object {
        "code": 34,
        "country": "ES",
        "name": "Spain",
      },
      Object {
        "code": 251,
        "country": "ET",
        "name": "Ethiopia",
      },
      Object {
        "code": 358,
        "country": "FI",
        "name": "Finland",
      },
      Object {
        "code": 679,
        "country": "FJ",
        "name": "Fiji",
      },
      Object {
        "code": 500,
        "country": "FK",
        "name": "Falkland Islands",
      },
      Object {
        "code": 691,
        "country": "FM",
        "name": "Micronesia",
      },
      Object {
        "code": 298,
        "country": "FO",
        "name": "Faroe Islands",
      },
      Object {
        "code": 33,
        "country": "FR",
        "name": "France",
      },
      Object {
        "code": 241,
        "country": "GA",
        "name": "Gabon",
      },
      Object {
        "code": 44,
        "country": "GB",
        "name": "United Kingdom",
      },
      Object {
        "code": 1,
        "country": "GD",
        "name": "Grenada",
      },
      Object {
        "code": 995,
        "country": "GE",
        "name": "Georgia",
      },
      Object {
        "code": 594,
        "country": "GF",
        "name": "French Guiana",
      },
      Object {
        "code": 44,
        "country": "GG",
        "name": "Guernsey",
      },
      Object {
        "code": 233,
        "country": "GH",
        "name": "Ghana",
      },
      Object {
        "code": 350,
        "country": "GI",
        "name": "Gibraltar",
      },
      Object {
        "code": 299,
        "country": "GL",
        "name": "Greenland",
      },
      Object {
        "code": 220,
        "country": "GM",
        "name": "Gambia",
      },
      Object {
        "code": 224,
        "country": "GN",
        "name": "Guinea",
      },
      Object {
        "code": 590,
        "country": "GP",
        "name": "Guadeloupe",
      },
      Object {
        "code": 240,
        "country": "GQ",
        "name": "Equatorial Guinea",
      },
      Object {
        "code": 30,
        "country": "GR",
        "name": "Greece",
      },
      Object {
        "code": 502,
        "country": "GT",
        "name": "Guatemala",
      },
      Object {
        "code": 1,
        "country": "GU",
        "name": "Guam",
      },
      Object {
        "code": 245,
        "country": "GW",
        "name": "Guinea-Bissau",
      },
      Object {
        "code": 592,
        "country": "GY",
        "name": "Guyana",
      },
      Object {
        "code": 852,
        "country": "HK",
        "name": "Hong Kong",
      },
      Object {
        "code": 504,
        "country": "HN",
        "name": "Honduras",
      },
      Object {
        "code": 385,
        "country": "HR",
        "name": "Croatia",
      },
      Object {
        "code": 509,
        "country": "HT",
        "name": "Haiti",
      },
      Object {
        "code": 36,
        "country": "HU",
        "name": "Hungary",
      },
      Object {
        "code": 62,
        "country": "ID",
        "name": "Indonesia",
      },
      Object {
        "code": 353,
        "country": "IE",
        "name": "Ireland",
      },
      Object {
        "code": 972,
        "country": "IL",
        "name": "Israel",
      },
      Object {
        "code": 44,
        "country": "IM",
        "name": "Isle of Man",
      },
      Object {
        "code": 91,
        "country": "IN",
        "name": "India",
      },
      Object {
        "code": 246,
        "country": "IO",
        "name": "British Indian Ocean Territory",
      },
      Object {
        "code": 964,
        "country": "IQ",
        "name": "Iraq",
      },
      Object {
        "code": 98,
        "country": "IR",
        "name": "Iran",
      },
      Object {
        "code": 354,
        "country": "IS",
        "name": "Iceland",
      },
      Object {
        "code": 39,
        "country": "IT",
        "name": "Italy",
      },
      Object {
        "code": 44,
        "country": "JE",
        "name": "Jersey",
      },
      Object {
        "code": 1,
        "country": "JM",
        "name": "Jamaica",
      },
      Object {
        "code": 962,
        "country": "JO",
        "name": "Jordan",
      },
      Object {
        "code": 81,
        "country": "JP",
        "name": "Japan",
      },
      Object {
        "code": 254,
        "country": "KE",
        "name": "Kenya",
      },
      Object {
        "code": 996,
        "country": "KG",
        "name": "Kyrgyzstan",
      },
      Object {
        "code": 855,
        "country": "KH",
        "name": "Cambodia",
      },
      Object {
        "code": 686,
        "country": "KI",
        "name": "Kiribati",
      },
      Object {
        "code": 269,
        "country": "KM",
        "name": "Comoros",
      },
      Object {
        "code": 1,
        "country": "KN",
        "name": "Saint Kitts and Nevis",
      },
      Object {
        "code": 850,
        "country": "KP",
        "name": "North Korea",
      },
      Object {
        "code": 82,
        "country": "KR",
        "name": "South Korea",
      },
      Object {
        "code": 965,
        "country": "KW",
        "name": "Kuwait",
      },
      Object {
        "code": 1,
        "country": "KY",
        "name": "Cayman Islands",
      },
      Object {
        "code": 7,
        "country": "KZ",
        "name": "Kazakhstan",
      },
      Object {
        "code": 856,
        "country": "LA",
        "name": "Laos",
      },
      Object {
        "code": 961,
        "country": "LB",
        "name": "Lebanon",
      },
      Object {
        "code": 1,
        "country": "LC",
        "name": "Saint Lucia",
      },
      Object {
        "code": 423,
        "country": "LI",
        "name": "Liechtenstein",
      },
      Object {
        "code": 94,
        "country": "LK",
        "name": "Sri Lanka",
      },
      Object {
        "code": 231,
        "country": "LR",
        "name": "Liberia",
      },
      Object {
        "code": 266,
        "country": "LS",
        "name": "Lesotho",
      },
      Object {
        "code": 370,
        "country": "LT",
        "name": "Lithuania",
      },
      Object {
        "code": 352,
        "country": "LU",
        "name": "Luxembourg",
      },
      Object {
        "code": 371,
        "country": "LV",
        "name": "Latvia",
      },
      Object {
        "code": 218,
        "country": "LY",
        "name": "Libya",
      },
      Object {
        "code": 212,
        "country": "MA",
        "name": "Morocco",
      },
      Object {
        "code": 377,
        "country": "MC",
        "name": "Monaco",
      },
      Object {
        "code": 373,
        "country": "MD",
        "name": "Moldova",
      },
      Object {
        "code": 382,
        "country": "ME",
        "name": "Montenegro",
      },
      Object {
        "code": 590,
        "country": "MF",
        "name": "Saint Martin",
      },
      Object {
        "code": 261,
        "country": "MG",
        "name": "Madagascar",
      },
      Object {
        "code": 692,
        "country": "MH",
        "name": "Marshall Islands",
      },
      Object {
        "code": 389,
        "country": "MK",
        "name": "Macedonia",
      },
      Object {
        "code": 223,
        "country": "ML",
        "name": "Mali",
      },
      Object {
        "code": 95,
        "country": "MM",
        "name": "Myanmar",
      },
      Object {
        "code": 976,
        "country": "MN",
        "name": "Mongolia",
      },
      Object {
        "code": 853,
        "country": "MO",
        "name": "Macau",
      },
      Object {
        "code": 1,
        "country": "MP",
        "name": "Northern Mariana Islands",
      },
      Object {
        "code": 596,
        "country": "MQ",
        "name": "Martinique",
      },
      Object {
        "code": 222,
        "country": "MR",
        "name": "Mauritania",
      },
      Object {
        "code": 1,
        "country": "MS",
        "name": "Montserrat",
      },
      Object {
        "code": 356,
        "country": "MT",
        "name": "Malta",
      },
      Object {
        "code": 230,
        "country": "MU",
        "name": "Mauritius",
      },
      Object {
        "code": 960,
        "country": "MV",
        "name": "Maldives",
      },
      Object {
        "code": 265,
        "country": "MW",
        "name": "Malawi",
      },
      Object {
        "code": 52,
        "country": "MX",
        "name": "Mexico",
      },
      Object {
        "code": 60,
        "country": "MY",
        "name": "Malaysia",
      },
      Object {
        "code": 258,
        "country": "MZ",
        "name": "Mozambique",
      },
      Object {
        "code": 264,
        "country": "NA",
        "name": "Namibia",
      },
      Object {
        "code": 687,
        "country": "NC",
        "name": "New Caledonia",
      },
      Object {
        "code": 227,
        "country": "NE",
        "name": "Niger",
      },
      Object {
        "code": 672,
        "country": "NF",
        "name": "Norfolk Island",
      },
      Object {
        "code": 234,
        "country": "NG",
        "name": "Nigeria",
      },
      Object {
        "code": 505,
        "country": "NI",
        "name": "Nicaragua",
      },
      Object {
        "code": 31,
        "country": "NL",
        "name": "Netherlands",
      },
      Object {
        "code": 47,
        "country": "NO",
        "name": "Norway",
      },
      Object {
        "code": 977,
        "country": "NP",
        "name": "Nepal",
      },
      Object {
        "code": 674,
        "country": "NR",
        "name": "Nauru",
      },
      Object {
        "code": 683,
        "country": "NU",
        "name": "Niue",
      },
      Object {
        "code": 968,
        "country": "OM",
        "name": "Oman",
      },
      Object {
        "code": 507,
        "country": "PA",
        "name": "Panama",
      },
      Object {
        "code": 51,
        "country": "PE",
        "name": "Peru",
      },
      Object {
        "code": 689,
        "country": "PF",
        "name": "French Polynesia",
      },
      Object {
        "code": 675,
        "country": "PG",
        "name": "Papua New Guinea",
      },
      Object {
        "code": 63,
        "country": "PH",
        "name": "Philippines",
      },
      Object {
        "code": 92,
        "country": "PK",
        "name": "Pakistan",
      },
      Object {
        "code": 48,
        "country": "PL",
        "name": "Poland",
      },
      Object {
        "code": 508,
        "country": "PM",
        "name": "Saint Pierre and Miquelon",
      },
      Object {
        "code": 1,
        "country": "PR",
        "name": "Puerto Rico",
      },
      Object {
        "code": 970,
        "country": "PS",
        "name": "Palestine",
      },
      Object {
        "code": 351,
        "country": "PT",
        "name": "Portugal",
      },
      Object {
        "code": 680,
        "country": "PW",
        "name": "Palau",
      },
      Object {
        "code": 595,
        "country": "PY",
        "name": "Paraguay",
      },
      Object {
        "code": 974,
        "country": "QA",
        "name": "Qatar",
      },
      Object {
        "code": 262,
        "country": "RE",
        "name": "Réunion",
      },
      Object {
        "code": 40,
        "country": "RO",
        "name": "Romania",
      },
      Object {
        "code": 381,
        "country": "RS",
        "name": "Serbia",
      },
      Object {
        "code": 7,
        "country": "RU",
        "name": "Russia",
      },
      Object {
        "code": 250,
        "country": "RW",
        "name": "Rwanda",
      },
      Object {
        "code": 966,
        "country": "SA",
        "name": "Saudi Arabia",
      },
      Object {
        "code": 677,
        "country": "SB",
        "name": "Solomon Islands",
      },
      Object {
        "code": 248,
        "country": "SC",
        "name": "Seychelles",
      },
      Object {
        "code": 249,
        "country": "SD",
        "name": "Sudan",
      },
      Object {
        "code": 46,
        "country": "SE",
        "name": "Sweden",
      },
      Object {
        "code": 65,
        "country": "SG",
        "name": "Singapore",
      },
      Object {
        "code": 290,
        "country": "SH",
        "name": "Saint Helena",
      },
      Object {
        "code": 386,
        "country": "SI",
        "name": "Slovenia",
      },
      Object {
        "code": 47,
        "country": "SJ",
        "name": "Svalbard and Jan Mayen",
      },
      Object {
        "code": 421,
        "country": "SK",
        "name": "Slovakia",
      },
      Object {
        "code": 232,
        "country": "SL",
        "name": "Sierra Leone",
      },
      Object {
        "code": 378,
        "country": "SM",
        "name": "San Marino",
      },
      Object {
        "code": 221,
        "country": "SN",
        "name": "Senegal",
      },
      Object {
        "code": 252,
        "country": "SO",
        "name": "Somalia",
      },
      Object {
        "code": 597,
        "country": "SR",
        "name": "Suriname",
      },
      Object {
        "code": 211,
        "country": "SS",
        "name": "South Sudan",
      },
      Object {
        "code": 239,
        "country": "ST",
        "name": "São Tomé and Príncipe",
      },
      Object {
        "code": 503,
        "country": "SV",
        "name": "El Salvador",
      },
      Object {
        "code": 1,
        "country": "SX",
        "name": "Sint Maarten",
      },
      Object {
        "code": 963,
        "country": "SY",
        "name": "Syria",
      },
      Object {
        "code": 268,
        "country": "SZ",
        "name": "Swaziland",
      },
      Object {
        "code": 290,
        "country": "TA",
        "name": "Tristan da Cunha",
      },
      Object {
        "code": 1,
        "country": "TC",
        "name": "Turks and Caicos Islands",
      },
      Object {
        "code": 235,
        "country": "TD",
        "name": "Chad",
      },
      Object {
        "code": 228,
        "country": "TG",
        "name": "Togo",
      },
      Object {
        "code": 66,
        "country": "TH",
        "name": "Thailand",
      },
      Object {
        "code": 992,
        "country": "TJ",
        "name": "Tajikistan",
      },
      Object {
        "code": 690,
        "country": "TK",
        "name": "Tokelau",
      },
      Object {
        "code": 670,
        "country": "TL",
        "name": "Timor-Leste",
      },
      Object {
        "code": 993,
        "country": "TM",
        "name": "Turkmenistan",
      },
      Object {
        "code": 216,
        "country": "TN",
        "name": "Tunisia",
      },
      Object {
        "code": 676,
        "country": "TO",
        "name": "Tonga",
      },
      Object {
        "code": 90,
        "country": "TR",
        "name": "Turkey",
      },
      Object {
        "code": 1,
        "country": "TT",
        "name": "Trinidad and Tobago",
      },
      Object {
        "code": 688,
        "country": "TV",
        "name": "Tuvalu",
      },
      Object {
        "code": 886,
        "country": "TW",
        "name": "Taiwan",
      },
      Object {
        "code": 255,
        "country": "TZ",
        "name": "Tanzania",
      },
      Object {
        "code": 380,
        "country": "UA",
        "name": "Ukraine",
      },
      Object {
        "code": 256,
        "country": "UG",
        "name": "Uganda",
      },
      Object {
        "code": 598,
        "country": "UY",
        "name": "Uruguay",
      },
      Object {
        "code": 998,
        "country": "UZ",
        "name": "Uzbekistan",
      },
      Object {
        "code": 39,
        "country": "VA",
        "name": "Vatican City",
      },
      Object {
        "code": 1,
        "country": "VC",
        "name": "Saint Vincent and the Grenadines",
      },
      Object {
        "code": 58,
        "country": "VE",
        "name": "Venezuela",
      },
      Object {
        "code": 1,
        "country": "VG",
        "name": "British Virgin Islands",
      },
      Object {
        "code": 1,
        "country": "VI",
        "name": "U.S. Virgin Islands",
      },
      Object {
        "code": 84,
        "country": "VN",
        "name": "Vietnam",
      },
      Object {
        "code": 678,
        "country": "VU",
        "name": "Vanuatu",
      },
      Object {
        "code": 681,
        "country": "WF",
        "name": "Wallis and Futuna",
      },
      Object {
        "code": 685,
        "country": "WS",
        "name": "Samoa",
      },
      Object {
        "code": 383,
        "country": "XK",
        "name": "Kosovo",
      },
      Object {
        "code": 967,
        "country": "YE",
        "name": "Yemen",
      },
      Object {
        "code": 262,
        "country": "YT",
        "name": "Mayotte",
      },
      Object {
        "code": 27,
        "country": "ZA",
        "name": "South Africa",
      },
      Object {
        "code": 260,
        "country": "ZM",
        "name": "Zambia",
      },
      Object {
        "code": 263,
        "country": "ZW",
        "name": "Zimbabwe",
      },
    ]
  `);
});

test.each([
  [null, 0],
  [undefined, 0],
  ['', 0],
  ['noop', 0],
  ['US', 1],
  ['NZ', 64],
])('getCountryCode(%p) -> %p', (input, expected) => {
  // @ts-expect-error we want to test invalid inputs
  expect(getCountryCode(input)).toBe(expected);
});

test.each([
  [null, 'Invalid Country ISO'],
  [undefined, 'Invalid Country ISO'],
  ['', 'Invalid Country ISO'],
  ['noop', 'Invalid Country ISO'],
  ['US', 'United States'],
  ['NZ', 'New Zealand'],
])('formatCountry(%p) -> %p', (input, expected) => {
  // @ts-expect-error we want to test invalid inputs
  expect(formatCountry(input)).toBe(expected);
});

test.each([
  [null, 'US'],
  [undefined, 'US'],
  ['', 'US'],
  ['noop', 'US'],
  ['US', 'US'],
  ['NZ', 'NZ'],
])('toCountryISO(%p) -> %p', (input, expected) => {
  expect(toCountryISO(input)).toBe(expected);
});

test.each([
  [null, false],
  [undefined, false],
  ['', false],
  ['noop', false],
  ['US', true],
  ['NZ', true],
])('toCountryISO(%p) -> %p', (input, expected) => {
  expect(isCountryISO(input)).toBe(expected);
});
