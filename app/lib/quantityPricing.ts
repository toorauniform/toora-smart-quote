export type QuantityPriceRow = {
  quantity: number;
  discountPercent: number;
  unitPrice: number;
  totalPrice: number;
};

export const quantityDiscounts = [
  { quantity: 10, discountPercent: 0 },
  { quantity: 20, discountPercent: 3 },
  { quantity: 50, discountPercent: 6 },
  { quantity: 100, discountPercent: 10 },
  { quantity: 300, discountPercent: 15 },
  { quantity: 500, discountPercent: 20 },
];

export function buildQuantityPricing(basePrice: number): QuantityPriceRow[] {
  return quantityDiscounts.map((item) => {
    const unitPrice = Math.round(
      basePrice * (1 - item.discountPercent / 100)
    );

    return {
      quantity: item.quantity,
      discountPercent: item.discountPercent,
      unitPrice,
      totalPrice: unitPrice * item.quantity,
    };
  });
}