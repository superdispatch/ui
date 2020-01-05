### `@superdispatch/ui`

[![npm](https://img.shields.io/npm/v/@superdispatch/ui)](https://www.npmjs.com/package/@superdispatch/ui)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/@superdispatch/ui.svg)](https://bundlephobia.com/result?p=@superdispatch/ui)

#### Installation

```bash
yarn add @superdispatch/ui @material-ui/core @material-ui/icons @material-ui/styles
```

#### Usage

```tsx
import { Button, ThemeProvider } from '@superdispatch/ui';
import { Typography } from '@material-ui/core';

export function App() {
  return (
    <ThemeProvider>
      <Typography variant="h3" gutterBottom={true}>
        Hello 👋
      </Typography>

      <Button color="blue">Yay 🎉</Button>
      <Button color="red">Nay 👎</Button>
    </ThemeProvider>
  );
}
```
