import { expect } from "chai";
import lambdaTester from "lambda-tester";
import { products } from '../products';
import { NO_PRODUCT_FOUND_MESSAGE } from '../constants';

import { getProductsById } from '../getProductsById';

describe('getProductsById', () => {
    let mockData = null;
    it('is invoked with code 200', (done) => {
      mockData = { pathParameters: { productId: products[0].id } };
      lambdaTester(getProductsById)
        .event(mockData)
        .expectResult((result) => {
  
          expect(result.statusCode).to.equal(200);
  
          expect(result.body).to.equal(JSON.stringify({ data: [products[0]] }));
  
          done();
        }).catch(done);
    });

    it('is invoked with code 404', (done) => {
      mockData = { pathParameters: { productId: 1 } };

      lambdaTester(getProductsById)
        .event(mockData)
        .expectResult((result) => {
  
          expect(result.statusCode).to.equal(404);
  
          expect(result.body).to.equal(JSON.stringify({ message: NO_PRODUCT_FOUND_MESSAGE }));
  
          done();
        }).catch(done);
    });
  });