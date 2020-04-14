import { setupTestUtils } from '../../setupTestUtils';

setupTestUtils();

it('serializes File', () => {
  expect(new File(['id,name'], 'report.csv', { type: 'text/csv' }))
    .toMatchInlineSnapshot(`
    File {
      "name": "report.csv",
      "size": 7,
      "type": "text/csv",
    }
  `);
});

it('serializes Blob', () => {
  expect(new Blob(['foo'], { type: 'image/png' })).toMatchInlineSnapshot(`
    Blob {
      "size": 3,
      "type": "image/png",
    }
  `);
});
