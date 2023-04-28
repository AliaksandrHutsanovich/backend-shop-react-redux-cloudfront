import lambdaTester from "lambda-tester";
import { products } from '../config/__mocks__/products';
import { stocks } from '../config/__mocks__/stocks';

import { getProductsList } from '../getProductsList';

describe('getProductsList', () => {
  const mockData = {};

  it('is invoked with code 200', (done) => {
    lambdaTester(getProductsList)
      .event(mockData) // Passing input data
      .expectResult((result) => {

        expect(result.statusCode).toEqual(200);

        expect(result.body).toEqual(
          JSON.stringify(
            products.map((product) => ({
              ...product,
              count: stocks.find(
                ({ product_id }) => product_id === product.id
              )?.count || 0,
            }))
          )
        );
        done();
      }).catch(done);
  });
});
