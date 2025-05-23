import { Product } from '../types/product';

interface StockStatusProps {
  products: Product[];
}

const StockStatus = ({ products }: StockStatusProps) => {
  const outOfStockProducts = products.filter((p) => p.quantity <= 0);

  if (outOfStockProducts.length === 0) {
    return null;
  }

  return (
    <div className="text-sm text-gray-500 mt-2">
      {outOfStockProducts.map((p) => p.name).join(', ')}: 품절
    </div>
  );
};

export default StockStatus;
