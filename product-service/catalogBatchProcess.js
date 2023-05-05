import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  INVALID_PRODUCT_DATA,
  SERVER_ERROR,
} from './constants';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const catalogBatchProcess = async (event, context, cb) => {
  const sns = new AWS.SNS({ region: 'eu-west-1' });

  for (const record of event.Records) {
    const { body: product } = record;
    const { title, description, price, count } = JSON.parse(product);
    const productId = uuidv4();

    console.log(`createProduct: create product item with id=${productId}, title=${title}, description=${description}, price=${price}`);
    console.log(`createProduct: create stock item with product_id=${productId}, count=${count}`);

    try {
      if (typeof title !== 'string') {
        throw Error(`${INVALID_PRODUCT_DATA}: title is invalid`);
      }

      if (typeof description !== 'string') {
        throw Error(`${INVALID_PRODUCT_DATA}: description is invalid`);
      }

      if (isNaN(+price)) {
        throw Error(`${INVALID_PRODUCT_DATA}: price is invalid`);
      }

      if (isNaN(+count)) {
        throw Error(`${INVALID_PRODUCT_DATA}: count is invalid`);
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

      sns.publish({
        Subject: 'You are invited',
        Message: product,
        TopicArn: process.env.SNS_ARN,
      }, (error, data) => {
        if (error) {
          console.log('Error is occured: ', error);
        } else {
          console.log('Send email for: ', data);
        }
      });

    } catch (e) {
      if (e.message.includes(INVALID_PRODUCT_DATA)) {
        console.log(`Error is occured: status 400: ${e.message}`);

        cb(null, {
          statusCode: 400,
          body: JSON.stringify({ message: e.message }),
        });
      } else {
        console.log(`Error is occured: status 500: ${e.message}`);
    
        cb(null, {
          statusCode: 500,
          body: JSON.stringify({ message: SERVER_ERROR }),
        });
      }
    }
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  };

  cb(null, response);
};
