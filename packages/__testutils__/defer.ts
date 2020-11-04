import { noop } from 'lodash';

export class Deferred<T> {
  protected currentPromise: Promise<T> = new Promise<T>(noop);
  protected resolvePromise: (value: T) => void = noop;
  protected rejectPromise: (error: Error) => void = noop;

  constructor() {
    this.reset();
  }

  reset(): this {
    this.currentPromise = new Promise<T>((resolve, reject) => {
      this.resolvePromise = resolve;
      this.rejectPromise = reject;
    });

    return this;
  }

  get promise(): Promise<T> {
    return this.currentPromise;
  }

  resolve(value: T): Promise<T> {
    this.resolvePromise(value);

    return this.promise;
  }

  reject(error: Error): Promise<T> {
    this.rejectPromise(error);

    return this.promise;
  }
}
