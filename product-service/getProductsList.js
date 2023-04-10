import { scanProducts, scanStocks } from './utils';
import { SERVER_ERROR } from './constants';

export const getProductsList = async (event, context, cb) => {
  console.log('getOroductlist: get all products');

  try {
    const productItems = await scanProducts();
    const stockItems = await scanStocks();

    const products = productItems.map((product) => ({
      ...product,
      count: stockItems.find(({ product_id }) => product_id === product.id)?.count || 0,
    }));

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify(products),
    };

    cb(null, response);
  } catch(e) {
    cb(null, {
      statusCode: 500,
      body: JSON.stringify({ message: SERVER_ERROR }),
    });
  }
};
