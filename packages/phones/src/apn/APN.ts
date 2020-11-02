import type AwesomePhoneNumber from 'awesome-phonenumber';

export type APNType = AwesomePhoneNumber;
export type APNStatic = typeof AwesomePhoneNumber;
export type AYTType = ReturnType<APNStatic['getAsYouType']>;

let loadedAPN: undefined | APNStatic;

export function loadAPN(): Promise<APNStatic> {
  return import('awesome-phonenumber').then((apn) => {
    loadedAPN = apn.default;

    return loadedAPN;
  });
}

export function getAPN(): APNStatic {
  if (!loadedAPN) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw loadAPN();
  }

  return loadedAPN;
}
