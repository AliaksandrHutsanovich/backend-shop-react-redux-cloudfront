import lambdaTester from "lambda-tester";

import { importProductsFile } from '../importProductsFile';

describe('importProductsFile', () => {
  let mockData = null;
  it('is invoked with status code 200 and correct body', (done) => {
    mockData = { queryStringParameters: { name: 'products.csv' } };
    lambdaTester(importProductsFile)
      .event(mockData)
      .expectResult((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual('/some-url');
        done();
      }).catch(done);
  });
});
