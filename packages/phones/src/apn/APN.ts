import type AwesomePhoneNumber from 'awesome-phonenumber';

export type APNType = AwesomePhoneNumber;
export type APNStatic = typeof AwesomePhoneNumber;
export type AYTType = ReturnType<APNStatic['getAsYouType']>;

let loadError: undefined | Error;
let loadedAPN: undefined | APNStatic;

export function loadAPN(): Promise<APNStatic> {
  return import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "apn" */
    'awesome-phonenumber'
  ).then(
    (apn) => {
      loadedAPN = apn.default;

      return loadedAPN;
    },
    (error: Error) => {
      loadError = error;

      throw error;
    },
  );
}

export function getAPN(): APNStatic {
  if (loadError) {
    throw loadError;
  }

  if (!loadedAPN) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw loadAPN();
  }

  return loadedAPN;
}
