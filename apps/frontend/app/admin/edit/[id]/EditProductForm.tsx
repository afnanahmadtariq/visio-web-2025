
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../../api/mock-data';

export default function EditProductForm({ product }: { product: Product }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/admin');
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Edit Product</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        defaultValue={product.name}
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        defaultValue={product.description}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        defaultValue={product.price}
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="category"
                                        name="category"
                                        defaultValue={product.category}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    >
                                        <option>Electronics</option>
                                        <option>Accessories</option>
                                        <option>Home</option>
                                        <option>Clothing</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Image URL
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="image"
                                        id="image"
                                        defaultValue={product.image}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
