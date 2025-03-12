import { FC } from "react";

type ProductCardProps = {
  product: {
    title: string;
    category: string;
    image: string;
    price: number;
  };
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex gap-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-16 h-16 object-contain"
      />
      <div>
        <h2 className="text-lg font-bold">{product.title} </h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-green-600 font-semibold">
          {product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
