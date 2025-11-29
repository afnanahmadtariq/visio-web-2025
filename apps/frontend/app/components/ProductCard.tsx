
import Link from 'next/link';
import { Product } from '../api/mock-data';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-64 w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                    />
                </div>
                <div className="p-4">
                    <h3 className="mt-1 text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    <p className="mt-2 text-xl font-semibold text-gray-900">${product.price}</p>
                </div>
            </div>
        </Link>
    );
}
