import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  INVALID_PRODUCT_DATA,
  SERVER_ERROR,
} from './constants';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const createProduct = async (event, context, cb) => {
  const { title, description, price, count } = JSON.parse(event.body);
  const productId = uuidv4();

  console.log(`createProduct: create product item with id=${productId}, title=${title}, description=${description}, price=${price}`);
  console.log(`createProduct: create stock item with product_id=${productId}, count=${count}`);
  
  try {
    if (typeof title !== 'string' || typeof description !== 'string' || typeof price !== 'number' || typeof count !== 'number') {
      throw Error(INVALID_PRODUCT_DATA);
    }

    const params = {
      TransactItems: [
        {
          Put: {
            TableName: process.env.PRODUCTS_TABLE,
            Item: {
              id: productId,
              title,
              description,
              price,
            },
          },
        },
        {
          Put: {
            TableName: process.env.STOCKS_TABLE,
            Item: {
              product_id: productId,
              count,
            },
          },
        },
      ],
    };

    await dynamo.transactWrite(params).promise();
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    };
  
    cb(null, response);
  } catch(e) {
    if (e.message === INVALID_PRODUCT_DATA) {
      cb(null, {
        statusCode: 400,
        body: JSON.stringify({ message: e.message }),
      });
    } else {
      cb(null, {
        statusCode: 500,
        body: JSON.stringify({ message: SERVER_ERROR }),
      });
    }
  }
};
