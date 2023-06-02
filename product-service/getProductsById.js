import { NO_PRODUCT_FOUND_MESSAGE, SERVER_ERROR } from './constants';
import { getByProductId } from './utils';

export const getProductsById = async (event, context, callback) => {
  const { productId } = event.pathParameters;
  console.log(`getProductsById: get product with id=${productId}`);

  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify((await getByProductId(productId))[0]),
    };
  
    callback(null, response);
  } catch(e) {
    if (e.message === NO_PRODUCT_FOUND_MESSAGE) {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ message: e.message }),
      });
    } else {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: SERVER_ERROR }),
      });
    }
  }
};
