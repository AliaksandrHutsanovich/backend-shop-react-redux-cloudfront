import { NO_PRODUCT_FOUND_MESSAGE } from './constants';

import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const scanProducts = async () => {
  const scanResults = await dynamo.scan({
    TableName: process.env.PRODUCTS_TABLE,
  }).promise();

  return scanResults.Items;
};

export const scanStocks = async () => {
  const scanResults = await dynamo.scan({
    TableName: process.env.STOCKS_TABLE,
  }).promise();

  return scanResults.Items;
};

export const queryProducts = async (id) => {
  const queryResults = await dynamo.query({
    TableName: process.env.PRODUCTS_TABLE,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
  }).promise();
  return queryResults.Items;
};

export const queryStocks = async (id) => {
  const queryResults = await dynamo.query({
    TableName: process.env.STOCKS_TABLE,
    KeyConditionExpression: 'product_id = :id',
    ExpressionAttributeValues: { ':id': id },
  }).promise();
  return queryResults.Items;
};

export const getByProductId = async (productId) => {
  const productsById = await queryProducts(productId);
  
  if (productsById.length === 0) {
    throw Error(NO_PRODUCT_FOUND_MESSAGE);
  }
  const stocksById = await queryStocks(productId);

  const products = productsById.map((product) => ({
    ...product,
    count: stocksById.find(({ product_id }) => product_id === product.id)?.count || 0,
  }));
  
  return products;
};
