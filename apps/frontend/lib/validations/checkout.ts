import { z } from "zod"

// Shipping Address Schema
export const ShippingAddressSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-+()]+$/, "Please enter a valid phone number"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(200, "Address must be less than 200 characters"),
  addressLine2: z
    .string()
    .max(200, "Address line 2 must be less than 200 characters")
    .optional(),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State must be less than 100 characters"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
})

export type ShippingAddressFormData = z.infer<typeof ShippingAddressSchema>

// Payment Schema (for validation only - never send raw card data to your own server)
export const PaymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[\d\s]+$/, "Please enter a valid card number")
    .transform((val) => val.replace(/\s/g, ""))
    .refine((val) => val.length >= 13 && val.length <= 19, {
      message: "Card number must be between 13 and 19 digits",
    }),
  expiryMonth: z
    .string()
    .min(1, "Expiry month is required")
    .regex(/^(0[1-9]|1[0-2])$/, "Please enter a valid month (01-12)"),
  expiryYear: z
    .string()
    .min(1, "Expiry year is required")
    .regex(/^\d{2}$/, "Please enter a valid year (YY)"),
  cvc: z
    .string()
    .min(1, "CVC is required")
    .regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  nameOnCard: z
    .string()
    .min(1, "Name on card is required")
    .max(100, "Name must be less than 100 characters"),
})

export type PaymentFormData = z.infer<typeof PaymentSchema>

// Order Schema - Only send product IDs and quantities, NEVER prices
export const OrderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  // Note: NEVER include price, salePercent, or stock from client
})

export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1, "At least one item is required"),
  shippingAddress: ShippingAddressSchema,
  // Payment is handled by payment processor, not sent to our backend
})

export type CreateOrderFormData = z.infer<typeof CreateOrderSchema>
