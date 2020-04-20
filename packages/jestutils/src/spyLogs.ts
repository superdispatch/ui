export interface SpyLogsOptions {
  warn: false | 'mute' | 'forbid';
  error: false | 'mute' | 'forbid';
}

export function spyLogs(options: SpyLogsOptions) {
  const methods = ['warn', 'error'] as const;
  const spies = new Map<keyof SpyLogsOptions, jest.SpyInstance>();

  beforeEach(() => {
    for (const method of methods) {
      const option = options[method];

      if (option) {
        const spy = jest.spyOn(console, method);

        if (option === 'mute') {
          spy.mockImplementation();
        }

        spies.set(method, spy);
      }
    }
  });

  afterEach(() => {
    for (const [method, spy] of spies) {
      if (options[method] === 'forbid') {
        expect(spy).not.toHaveBeenCalled();
      }
    }
  });
}
