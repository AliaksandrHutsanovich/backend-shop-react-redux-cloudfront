import { expect } from "chai";
import lambdaTester from "lambda-tester";
import { products } from '../products';

import { getProductsList } from '../getProductsList';

describe('getProductsList', () => {
  const mockData = {};
  it('is invoked with code 200', (done) => {
    lambdaTester(getProductsList)
      .event(mockData) // Passing input data
      .expectResult((result) => {

        expect(result.statusCode).to.equal(200);

        expect(result.body).to.equal(JSON.stringify(products));

        done();
      }).catch(done);
  });
});
