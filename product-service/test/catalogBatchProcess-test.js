import lambdaTester from "lambda-tester";
import { products } from '../config/__mocks__/products';
import { stocks } from '../config/__mocks__/stocks';
import { INVALID_PRODUCT_DATA } from '../constants';

import { catalogBatchProcess } from '../catalogBatchProcess';

describe('catalogBatchProcess', () => {
  let mockData = null;
  it('is invoked with code 200', (done) => {
    const product = {
      title: products[0].title,
      description: products[0].description,
      price: products[0].price,
      count: stocks[0].count,
    };
    mockData = {
      Records: [
        {
          body: JSON.stringify(product),
        },
      ],
    };

    lambdaTester(catalogBatchProcess)
      .event(mockData)
      .expectResult((result) => {
        expect(result.statusCode).toEqual(200);

        done();
      }).catch(done);
  });

  it('is invoked with code 200 if some data incorrect', (done) => {
    const product = {
      title: products[0].title,
      description: products[0].description,
      price: 'ttt',
      count: stocks[0].count,
    };

    mockData = {
      Records: [
        {
          body: JSON.stringify(product),
        },
      ],
    };

    lambdaTester(catalogBatchProcess)
      .event(mockData)
      .expectResult((result) => {
        expect(result.statusCode).toEqual(400);

        done();
      }).catch(done);
  });
});
