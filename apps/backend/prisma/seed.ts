import { PrismaClient, UserRole, OrderStatus, PaymentStatus, CreditTxnType } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...\n');

    // ============================================
    // CLEAN EXISTING DATA (for dev/testing)
    // ============================================
    console.log('🧹 Cleaning existing data...');
    await prisma.backInStockSubscription.deleteMany();
    await prisma.creditTransaction.deleteMany();
    await prisma.wishlistItem.deleteMany();
    await prisma.review.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.productCategory.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.userAuthProvider.deleteMany();
    await prisma.user.deleteMany();

    // ============================================
    // USERS
    // ============================================
    console.log('👤 Creating users...');
    const hashedPassword = await bcrypt.hash('Password123!', 12);

    await prisma.user.create({
        data: {
            email: 'admin@visio.com',
            username: 'admin',
            passwordHash: hashedPassword,
            role: UserRole.ADMIN,
            creditBalance: 10000.00,
        },
    });

    await prisma.user.createMany({
        data: [
            {
                email: 'john.doe@example.com',
                username: 'johndoe',
                passwordHash: hashedPassword,
                role: UserRole.USER,
                creditBalance: 500.00,
            },
            {
                email: 'jane.smith@example.com',
                username: 'janesmith',
                passwordHash: hashedPassword,
                role: UserRole.USER,
                creditBalance: 750.00,
            },
            {
                email: 'mike.wilson@example.com',
                username: 'mikewilson',
                passwordHash: hashedPassword,
                role: UserRole.USER,
                creditBalance: 250.00,
            },
            {
                email: 'sarah.jones@example.com',
                username: 'sarahjones',
                passwordHash: hashedPassword,
                role: UserRole.USER,
                creditBalance: 1000.00,
            },
            {
                email: 'test@test.com',
                username: 'testuser',
                passwordHash: hashedPassword,
                role: UserRole.USER,
                creditBalance: 500.00,
            },
        ],
    });

    const allUsers = await prisma.user.findMany();
    const regularUsers = allUsers.filter(u => u.role === UserRole.USER);

    console.log(`   ✓ Created ${allUsers.length} users (1 admin, ${regularUsers.length} regular)`);

    // ============================================
    // USER ADDRESSES
    // ============================================
    console.log('🏠 Creating user addresses...');
    const addressesData = regularUsers.flatMap(user => [
        {
            userId: user.id,
            label: 'Home',
            fullName: user.username.charAt(0).toUpperCase() + user.username.slice(1),
            line1: '123 Main Street',
            line2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'USA',
            phone: '+1-555-0100',
            isDefault: true,
        },
        {
            userId: user.id,
            label: 'Work',
            fullName: user.username.charAt(0).toUpperCase() + user.username.slice(1),
            line1: '456 Business Ave',
            city: 'Los Angeles',
            state: 'CA',
            postalCode: '90001',
            country: 'USA',
            phone: '+1-555-0200',
            isDefault: false,
        },
    ]);

    await prisma.userAddress.createMany({ data: addressesData });
    console.log(`   ✓ Created ${addressesData.length} addresses`);

    // ============================================
    // CATEGORIES (Hierarchical)
    // ============================================
    console.log('📁 Creating categories...');

    // Root categories
    const electronics = await prisma.category.create({
        data: { name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets' },
    });
    const clothing = await prisma.category.create({
        data: { name: 'Clothing', slug: 'clothing', description: 'Fashion and apparel' },
    });
    const home = await prisma.category.create({
        data: { name: 'Home & Garden', slug: 'home-garden', description: 'Home decor and garden supplies' },
    });
    const sports = await prisma.category.create({
        data: { name: 'Sports & Outdoors', slug: 'sports-outdoors', description: 'Sports equipment and outdoor gear' },
    });
    const books = await prisma.category.create({
        data: { name: 'Books', slug: 'books', description: 'Books and literature' },
    });

    // Sub-categories
    const smartphones = await prisma.category.create({
        data: { name: 'Smartphones', slug: 'smartphones', description: 'Mobile phones', parentId: electronics.id },
    });
    const laptops = await prisma.category.create({
        data: { name: 'Laptops', slug: 'laptops', description: 'Portable computers', parentId: electronics.id },
    });
    const headphones = await prisma.category.create({
        data: { name: 'Headphones', slug: 'headphones', description: 'Audio accessories', parentId: electronics.id },
    });
    const mensClothing = await prisma.category.create({
        data: { name: "Men's Clothing", slug: 'mens-clothing', description: 'Clothing for men', parentId: clothing.id },
    });
    const womensClothing = await prisma.category.create({
        data: { name: "Women's Clothing", slug: 'womens-clothing', description: 'Clothing for women', parentId: clothing.id },
    });
    const furniture = await prisma.category.create({
        data: { name: 'Furniture', slug: 'furniture', description: 'Home furniture', parentId: home.id },
    });
    const fitness = await prisma.category.create({
        data: { name: 'Fitness', slug: 'fitness', description: 'Fitness equipment', parentId: sports.id },
    });

    console.log('   ✓ Created 12 categories (5 root, 7 sub-categories)');

    // ============================================
    // PRODUCTS
    // ============================================
    console.log('📦 Creating products...');

    const productsData = [
        // Electronics - Smartphones
        {
            name: 'iPhone 15 Pro Max',
            slug: 'iphone-15-pro-max',
            description: 'Latest iPhone with A17 Pro chip, titanium design, and 48MP camera system. Features USB-C and Action button.',
            price: 1199.00,
            stock: 50,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/iphone15.jpg',
            categories: [electronics.id, smartphones.id],
        },
        {
            name: 'Samsung Galaxy S24 Ultra',
            slug: 'samsung-galaxy-s24-ultra',
            description: 'Premium Android smartphone with S Pen, 200MP camera, and Galaxy AI features.',
            price: 1299.00,
            stock: 35,
            salePercent: 10,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/galaxys24.jpg',
            categories: [electronics.id, smartphones.id],
        },
        {
            name: 'Google Pixel 8 Pro',
            slug: 'google-pixel-8-pro',
            description: 'Google flagship with Tensor G3 chip and advanced AI photography features.',
            price: 999.00,
            stock: 25,
            salePercent: 15,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/pixel8.jpg',
            categories: [electronics.id, smartphones.id],
        },
        // Electronics - Laptops
        {
            name: 'MacBook Pro 16" M3 Max',
            slug: 'macbook-pro-16-m3-max',
            description: 'Professional laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display.',
            price: 3499.00,
            stock: 15,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/macbookpro.jpg',
            categories: [electronics.id, laptops.id],
        },
        {
            name: 'Dell XPS 15',
            slug: 'dell-xps-15',
            description: 'Premium Windows laptop with Intel Core i9, NVIDIA RTX 4070, and OLED display.',
            price: 2199.00,
            stock: 20,
            salePercent: 5,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/dellxps.jpg',
            categories: [electronics.id, laptops.id],
        },
        {
            name: 'ThinkPad X1 Carbon Gen 11',
            slug: 'thinkpad-x1-carbon-gen11',
            description: 'Business ultrabook with legendary ThinkPad reliability and all-day battery life.',
            price: 1849.00,
            stock: 30,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/thinkpad.jpg',
            categories: [electronics.id, laptops.id],
        },
        // Electronics - Headphones
        {
            name: 'Sony WH-1000XM5',
            slug: 'sony-wh-1000xm5',
            description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality.',
            price: 399.00,
            stock: 100,
            salePercent: 20,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/sonywh1000xm5.jpg',
            categories: [electronics.id, headphones.id],
        },
        {
            name: 'AirPods Pro 2',
            slug: 'airpods-pro-2',
            description: 'Apple wireless earbuds with active noise cancellation and spatial audio.',
            price: 249.00,
            stock: 200,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/airpodspro.jpg',
            categories: [electronics.id, headphones.id],
        },
        // Clothing - Men's
        {
            name: 'Classic Fit Oxford Shirt',
            slug: 'classic-oxford-shirt',
            description: 'Premium cotton oxford shirt perfect for business or casual wear.',
            price: 79.00,
            stock: 150,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/oxfordshirt.jpg',
            categories: [clothing.id, mensClothing.id],
        },
        {
            name: 'Slim Fit Chinos',
            slug: 'slim-fit-chinos',
            description: 'Comfortable stretch chinos with modern slim fit.',
            price: 89.00,
            stock: 120,
            salePercent: 25,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/chinos.jpg',
            categories: [clothing.id, mensClothing.id],
        },
        {
            name: 'Leather Jacket',
            slug: 'leather-jacket',
            description: 'Genuine leather jacket with timeless design.',
            price: 299.00,
            stock: 40,
            salePercent: 30,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/leatherjacket.jpg',
            categories: [clothing.id, mensClothing.id],
        },
        // Clothing - Women's
        {
            name: 'Silk Blouse',
            slug: 'silk-blouse',
            description: 'Elegant 100% silk blouse for professional and evening wear.',
            price: 129.00,
            stock: 80,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/silkblouse.jpg',
            categories: [clothing.id, womensClothing.id],
        },
        {
            name: 'High-Waisted Jeans',
            slug: 'high-waisted-jeans',
            description: 'Flattering high-waisted denim with stretch comfort.',
            price: 98.00,
            stock: 100,
            salePercent: 15,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/jeans.jpg',
            categories: [clothing.id, womensClothing.id],
        },
        // Home & Garden
        {
            name: 'Modern Sectional Sofa',
            slug: 'modern-sectional-sofa',
            description: 'L-shaped sectional with premium fabric and sturdy frame.',
            price: 1499.00,
            stock: 10,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/sofa.jpg',
            categories: [home.id, furniture.id],
        },
        {
            name: 'Ergonomic Office Chair',
            slug: 'ergonomic-office-chair',
            description: 'Fully adjustable office chair with lumbar support and breathable mesh.',
            price: 449.00,
            stock: 45,
            salePercent: 10,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/officechair.jpg',
            categories: [home.id, furniture.id],
        },
        {
            name: 'Standing Desk',
            slug: 'standing-desk',
            description: 'Electric height-adjustable desk with memory presets.',
            price: 599.00,
            stock: 25,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/standingdesk.jpg',
            categories: [home.id, furniture.id],
        },
        // Sports & Fitness
        {
            name: 'Pro Yoga Mat',
            slug: 'pro-yoga-mat',
            description: 'Extra thick eco-friendly yoga mat with alignment lines.',
            price: 69.00,
            stock: 200,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/yogamat.jpg',
            categories: [sports.id, fitness.id],
        },
        {
            name: 'Adjustable Dumbbell Set',
            slug: 'adjustable-dumbbell-set',
            description: 'Space-saving adjustable dumbbells from 5-50 lbs.',
            price: 349.00,
            stock: 30,
            salePercent: 20,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/dumbbells.jpg',
            categories: [sports.id, fitness.id],
        },
        {
            name: 'Running Shoes Pro',
            slug: 'running-shoes-pro',
            description: 'Lightweight running shoes with responsive cushioning.',
            price: 159.00,
            stock: 80,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/runningshoes.jpg',
            categories: [sports.id, fitness.id],
        },
        // Books
        {
            name: 'The Art of Programming',
            slug: 'art-of-programming',
            description: 'Comprehensive guide to software development best practices.',
            price: 49.00,
            stock: 500,
            salePercent: null,
            mainImageUrl: 'https://res.cloudinary.com/demo/image/upload/programmingbook.jpg',
            categories: [books.id],
        },
    ];

    // Create products with categories
    for (const productData of productsData) {
        const { categories: categoryIds, ...data } = productData;
        const product = await prisma.product.create({
            data: {
                ...data,
                categories: {
                    create: categoryIds.map(catId => ({ categoryId: catId })),
                },
            },
        });

        // Add product images
        await prisma.productImage.create({
            data: {
                productId: product.id,
                url: data.mainImageUrl || 'https://via.placeholder.com/400',
                publicId: `product_${product.slug}`,
                alt: product.name,
                sortOrder: 0,
            },
        });
    }

    const allProducts = await prisma.product.findMany();
    console.log(`   ✓ Created ${allProducts.length} products`);

    // ============================================
    // CARTS & CART ITEMS
    // ============================================
    console.log('🛒 Creating carts...');

    for (const user of regularUsers.slice(0, 3)) {
        const cart = await prisma.cart.create({
            data: { userId: user.id },
        });

        // Add random products to cart
        const randomProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
        for (const product of randomProducts) {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: product.id,
                    quantity: Math.floor(Math.random() * 3) + 1,
                    unitPrice: product.price,
                },
            });
        }
    }
    console.log('   ✓ Created 3 carts with items');

    // ============================================
    // ORDERS & ORDER ITEMS
    // ============================================
    console.log('📋 Creating orders...');

    const addresses = await prisma.userAddress.findMany();
    const orderStatuses = [OrderStatus.COMPLETED, OrderStatus.SHIPPED, OrderStatus.PAID, OrderStatus.PENDING];

    for (let i = 0; i < regularUsers.length; i++) {
        const user = regularUsers[i];
        const userAddresses = addresses.filter(a => a.userId === user.id);
        const shippingAddress = userAddresses[0];
        const status = orderStatuses[i % orderStatuses.length];

        // Create 1-2 orders per user
        const numOrders = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < numOrders; j++) {
            const orderProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1);
            const totalAmount = orderProducts.reduce((sum, p) => {
                const price = Number(p.price);
                const discount = p.salePercent ? price * (p.salePercent / 100) : 0;
                return sum + (price - discount);
            }, 0);

            const order = await prisma.order.create({
                data: {
                    userId: user.id,
                    status,
                    totalAmount,
                    shippingAddressId: shippingAddress?.id,
                    billingAddressId: shippingAddress?.id,
                    items: {
                        create: orderProducts.map(p => ({
                            productId: p.id,
                            quantity: Math.floor(Math.random() * 2) + 1,
                            unitPrice: p.price,
                            salePercent: p.salePercent,
                        })),
                    },
                },
            });

            // Create payment for non-pending orders
            if (status !== OrderStatus.PENDING) {
                await prisma.payment.create({
                    data: {
                        orderId: order.id,
                        status: PaymentStatus.SUCCESS,
                        provider: 'stripe',
                        transactionId: `txn_${order.id}_${Date.now()}`,
                        amount: totalAmount,
                    },
                });
            }
        }
    }

    const orderCount = await prisma.order.count();
    console.log(`   ✓ Created ${orderCount} orders with items and payments`);

    // ============================================
    // REVIEWS
    // ============================================
    console.log('⭐ Creating reviews...');

    const reviewsData = [
        { rating: 5, title: 'Excellent product!', comment: 'Exceeded my expectations. Highly recommend!' },
        { rating: 4, title: 'Great value', comment: 'Good quality for the price. Very satisfied.' },
        { rating: 5, title: 'Perfect!', comment: 'Exactly what I was looking for. Fast shipping too!' },
        { rating: 3, title: 'Decent', comment: 'Does the job but could be better. Average quality.' },
        { rating: 4, title: 'Good purchase', comment: 'Happy with my purchase. Would buy again.' },
        { rating: 5, title: 'Amazing!', comment: 'Best purchase I have made this year!' },
        { rating: 4, title: 'Solid choice', comment: 'Reliable product with good features.' },
        { rating: 5, title: 'Love it!', comment: 'Using it daily. Fantastic quality!' },
    ];

    let reviewCount = 0;
    for (const user of regularUsers) {
        const productsToReview = allProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
        for (const product of productsToReview) {
            const reviewData = reviewsData[reviewCount % reviewsData.length];
            try {
                await prisma.review.create({
                    data: {
                        userId: user.id,
                        productId: product.id,
                        ...reviewData,
                    },
                });
                reviewCount++;
            } catch {
                // Skip if duplicate (user already reviewed this product)
            }
        }
    }
    console.log(`   ✓ Created ${reviewCount} reviews`);

    // ============================================
    // WISHLIST ITEMS
    // ============================================
    console.log('❤️ Creating wishlists...');

    let wishlistCount = 0;
    for (const user of regularUsers) {
        const wishlistProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        for (const product of wishlistProducts) {
            try {
                await prisma.wishlistItem.create({
                    data: {
                        userId: user.id,
                        productId: product.id,
                    },
                });
                wishlistCount++;
            } catch {
                // Skip duplicates
            }
        }
    }
    console.log(`   ✓ Created ${wishlistCount} wishlist items`);

    // ============================================
    // CREDIT TRANSACTIONS
    // ============================================
    console.log('💳 Creating credit transactions...');

    for (const user of regularUsers) {
        // Initial bonus
        await prisma.creditTransaction.create({
            data: {
                userId: user.id,
                amount: 500.00,
                type: CreditTxnType.INITIAL_BONUS,
                note: 'Welcome bonus for new user',
            },
        });

        // Random purchase debit
        await prisma.creditTransaction.create({
            data: {
                userId: user.id,
                amount: -Math.floor(Math.random() * 200),
                type: CreditTxnType.PURCHASE_DEBIT,
                note: 'Order purchase',
            },
        });
    }
    console.log(`   ✓ Created ${regularUsers.length * 2} credit transactions`);

    // ============================================
    // BACK IN STOCK SUBSCRIPTIONS
    // ============================================
    console.log('🔔 Creating stock subscriptions...');

    const lowStockProducts = allProducts.filter(p => p.stock < 30).slice(0, 5);
    const subscriptionEmails = ['notify1@example.com', 'notify2@example.com', 'notify3@example.com'];

    for (const product of lowStockProducts) {
        for (const email of subscriptionEmails.slice(0, 2)) {
            await prisma.backInStockSubscription.create({
                data: {
                    productId: product.id,
                    email,
                },
            });
        }
    }
    console.log(`   ✓ Created ${lowStockProducts.length * 2} stock subscriptions`);

    // ============================================
    // SUMMARY
    // ============================================
    console.log('\n✅ Database seeding completed!\n');
    console.log('📊 Summary:');
    console.log(`   • Users: ${await prisma.user.count()}`);
    console.log(`   • Addresses: ${await prisma.userAddress.count()}`);
    console.log(`   • Categories: ${await prisma.category.count()}`);
    console.log(`   • Products: ${await prisma.product.count()}`);
    console.log(`   • Carts: ${await prisma.cart.count()}`);
    console.log(`   • Orders: ${await prisma.order.count()}`);
    console.log(`   • Reviews: ${await prisma.review.count()}`);
    console.log(`   • Wishlist Items: ${await prisma.wishlistItem.count()}`);
    console.log(`   • Credit Transactions: ${await prisma.creditTransaction.count()}`);
    console.log(`   • Stock Subscriptions: ${await prisma.backInStockSubscription.count()}`);

    console.log('\n🔐 Test Accounts:');
    console.log('   Admin: admin@visio.com / Password123!');
    console.log('   User:  test@test.com / Password123!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
