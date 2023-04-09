import { NO_PRODUCT_FOUND_MESSAGE } from './constants';
import { getByProductId } from './utils';

export const getProductsById = async (event, context, callback) => {
  const { productId } = event.pathParameters;

  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          data: await getByProductId(productId),
        },
      ),
    };
  
    callback(null, response);
  } catch(e) {
    if (e.message === NO_PRODUCT_FOUND_MESSAGE) {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ message: e.message }),
      });
    } else {
      callback(e);
    }
  }
};
