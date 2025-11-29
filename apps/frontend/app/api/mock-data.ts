
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Minimalist Watch',
        price: 120,
        description: 'A sleek and modern timepiece for the everyday professional.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60',
        category: 'Accessories',
    },
    {
        id: '2',
        name: 'Leather Backpack',
        price: 85,
        description: 'Durable and stylish leather backpack for all your adventures.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60',
        category: 'Accessories',
    },
    {
        id: '3',
        name: 'Wireless Headphones',
        price: 250,
        description: 'Noise-cancelling headphones with premium sound quality.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
        category: 'Electronics',
    },
    {
        id: '4',
        name: 'Smart Speaker',
        price: 99,
        description: 'Voice-controlled smart speaker with high-fidelity audio.',
        image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=500&q=60',
        category: 'Electronics',
    },
    {
        id: '5',
        name: 'Ceramic Vase',
        price: 45,
        description: 'Handcrafted ceramic vase to elevate your home decor.',
        image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=500&q=60',
        category: 'Home',
    },
    {
        id: '6',
        name: 'Cotton Throw Blanket',
        price: 60,
        description: 'Soft and cozy cotton throw blanket for chilly evenings.',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&w=500&q=60',
        category: 'Home',
    },
];

export const getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(PRODUCTS), 500);
    });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(PRODUCTS.find((p) => p.id === id)), 500);
    });
};
