import { products } from './products';

export const getProductsList = async (event, context, cb) => {
  try {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify(await Promise.resolve(products)),
    };

    cb(null, response);
  } catch(e) {
    cb(e);
  }
};
