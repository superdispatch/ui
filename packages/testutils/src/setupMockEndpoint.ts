import { act } from '@testing-library/react';
import fetchMock from 'fetch-mock';

afterEach(async () => {
  await act(async () => {
    await fetchMock.flush();
  });

  fetchMock.reset();
});
