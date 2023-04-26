const AWS = jest.requireActual('aws-sdk');
const { products } = require('./products');
const { stocks } = require('./stocks');

const DynamoDB = {
  DocumentClient: () => ({
    scan: jest.fn(({ TableName }) => {
      if (TableName === 'products') {
        return {
          promise: () => ({
            Items: products,
          }),
        };
      }
      if (TableName === 'stocks') {
        return {
          promise: () => ({
            Items: stocks,
          }),
        };
      }
    }),
    query: jest.fn(({
      TableName,
      ExpressionAttributeValues: { ':id': id },
    }) => {
      if (TableName === 'products') {
        return {
          promise: () => ({
            Items: products.filter(({ id: pId }) => id === pId),
          }),
        };
      }
      if (TableName === 'stocks') {
        return {
          promise: () => ({
            Items: stocks.filter(({ product_id }) => id === product_id),
          }),
        };
      }
    }),
    transactWrite: jest.fn(() => ({
      promise: () => {},
    })),
  }),
};

const SNS = jest.fn(() => ({
  publish: () => {},
}));

module.exports = {
  ...AWS,
  DynamoDB,
  SNS,
};
