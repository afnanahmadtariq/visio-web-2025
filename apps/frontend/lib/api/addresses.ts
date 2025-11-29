import { get, post, put, del } from "./client"

export interface Address {
  id: string
  userId: string
  label?: string
  fullName: string
  line1: string
  line2?: string
  city: string
  state?: string
  postalCode?: string
  country: string
  phone?: string
  isDefault: boolean
  createdAt: string
}

export interface CreateAddressData {
  label?: string
  fullName: string
  line1: string
  line2?: string
  city: string
  state?: string
  postalCode?: string
  country: string
  phone?: string
  isDefault?: boolean
}

// Get all addresses
export async function getAddresses(): Promise<Address[]> {
  return get<Address[]>("/api/addresses")
}

// Get single address
export async function getAddress(addressId: string): Promise<Address> {
  return get<Address>(`/api/addresses/${addressId}`)
}

// Create new address
export async function createAddress(data: CreateAddressData): Promise<Address> {
  return post<Address>("/api/addresses", data)
}

// Update address
export async function updateAddress(
  addressId: string,
  data: Partial<CreateAddressData>
): Promise<Address> {
  return put<Address>(`/api/addresses/${addressId}`, data)
}

// Delete address
export async function deleteAddress(addressId: string): Promise<{ success: boolean }> {
  return del<{ success: boolean }>(`/api/addresses/${addressId}`)
}

// Set address as default
export async function setDefaultAddress(addressId: string): Promise<Address[]> {
  return put<Address[]>(`/api/addresses/${addressId}/default`)
}
