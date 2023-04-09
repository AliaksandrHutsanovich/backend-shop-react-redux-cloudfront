import { products } from './products';
import { NO_PRODUCT_FOUND_MESSAGE } from './constants';

export const getByProductId = async (productId) => {
  const productsById = await Promise.resolve(
    products.filter(({ id }) => id === productId),
  );
  
  if (productsById.length === 0) {
    throw Error(NO_PRODUCT_FOUND_MESSAGE);
  }
  
  return productsById;
};
