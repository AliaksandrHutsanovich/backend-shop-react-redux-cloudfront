import lambdaTester from "lambda-tester";
import { products } from '../config/__mocks__/products';
import { stocks } from '../config/__mocks__/stocks';
import { NO_PRODUCT_FOUND_MESSAGE } from '../constants';

import { getProductsById } from '../getProductsById';

describe('getProductById', () => {
    let mockData = null;
    it('is invoked with code 200', (done) => {
      mockData = { pathParameters: { productId: products[0].id } };
      lambdaTester(getProductsById)
        .event(mockData)
        .expectResult((result) => {
  
          expect(result.statusCode).toEqual(200);
  
          expect(result.body).toEqual(
            JSON.stringify({
              ...products[0],
              count: stocks.find(({ product_id }) => product_id === products[0].id).count,
            }),
          );
  
          done();
        }).catch(done);
    });

    it('is invoked with code 404', (done) => {
      mockData = { pathParameters: { productId: 1 } };

      lambdaTester(getProductsById)
        .event(mockData)
        .expectResult((result) => {
  
          expect(result.statusCode).toEqual(404);
  
          expect(result.body).toEqual(JSON.stringify({ message: NO_PRODUCT_FOUND_MESSAGE }));
  
          done();
        }).catch(done);
    });
  });