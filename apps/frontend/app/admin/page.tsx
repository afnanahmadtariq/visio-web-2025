
import Link from 'next/link';
import { Package, ShoppingCart, Users, FileText, Plus, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { getProducts } from '../api/mock-data';

// Stats cards data - in production these would come from the API
const stats = [
    { name: 'Total Products', value: '1,234', icon: Package, change: '+12%', changeType: 'positive' },
    { name: 'Total Orders', value: '567', icon: ShoppingCart, change: '+8%', changeType: 'positive' },
    { name: 'Total Revenue', value: '$45,678', icon: DollarSign, change: '+15%', changeType: 'positive' },
    { name: 'Active Users', value: '2,345', icon: Users, change: '+5%', changeType: 'positive' },
];

export default async function AdminDashboard() {
    const products = await getProducts();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                                            <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                                                <TrendingUp className="h-4 w-4 mr-0.5" />
                                                {stat.change}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                <Link href="/admin/add" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-5 flex items-center gap-4 transition-colors">
                    <Plus className="h-8 w-8" />
                    <div>
                        <h3 className="font-semibold">Add Product</h3>
                        <p className="text-indigo-200 text-sm">Create a new product listing</p>
                    </div>
                </Link>
                <Link href="/admin/logs" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-5 flex items-center gap-4 transition-colors">
                    <FileText className="h-8 w-8 text-gray-400" />
                    <div>
                        <h3 className="font-semibold text-gray-900">View Logs</h3>
                        <p className="text-gray-500 text-sm">Monitor system activity</p>
                    </div>
                </Link>
                <Link href="/products" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-5 flex items-center gap-4 transition-colors">
                    <Activity className="h-8 w-8 text-gray-400" />
                    <div>
                        <h3 className="font-semibold text-gray-900">View Store</h3>
                        <p className="text-gray-500 text-sm">See your public storefront</p>
                    </div>
                </Link>
            </div>

            {/* Products Table */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h2 className="text-xl font-semibold text-gray-900">Products</h2>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the products in your store including their name, price, and category.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                        href="/admin/add"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add product
                    </Link>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Category
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Price
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {product.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${product.price}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link href={`/admin/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    Edit
                                                </Link>
                                                <button className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
