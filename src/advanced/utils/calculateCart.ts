import { Product } from '../types/product';
import {
  calculateProductDiscount,
  calculateCartDiscount,
  calculateTuesdayDiscount,
} from './calculateDiscount';

export interface CartTotalResult {
  totalPrice: number;
  discountRate: number;
  bonusPoints: number;
}

export const calculateCartTotal = (products: Product[]): CartTotalResult => {
  let totalPrice = 0;
  let totalProductCount = 0;
  let totalPriceBeforeDiscount = 0;

  products.forEach((product) => {
    totalProductCount += product.quantity;

    const productTotalPrice = product.price * product.quantity;

    totalPriceBeforeDiscount += productTotalPrice;
    totalPrice += calculateProductDiscount(product, product.quantity);
  });

  let totalCartDiscountRate = calculateCartDiscount(
    totalPrice,
    totalPriceBeforeDiscount,
    totalProductCount,
  );

  const tuesdayDiscount = calculateTuesdayDiscount(totalPrice, totalCartDiscountRate);

  totalPrice = tuesdayDiscount.price;
  totalCartDiscountRate = tuesdayDiscount.discountRate;

  const bonusPoints = Math.floor(totalPrice / 1000);

  return {
    totalPrice,
    discountRate: totalCartDiscountRate,
    bonusPoints,
  };
};
