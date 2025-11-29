"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock product data for autocomplete - in production this would be fetched from API
const mockProducts = [
  { id: "1", name: "Minimalist Watch", category: "Accessories", price: 149.99 },
  { id: "2", name: "Leather Backpack", category: "Accessories", price: 89.99 },
  { id: "3", name: "Wireless Headphones", category: "Electronics", price: 199.99 },
  { id: "4", name: "Cotton T-Shirt", category: "Clothing", price: 29.99 },
  { id: "5", name: "Running Shoes", category: "Footwear", price: 119.99 },
  { id: "6", name: "Ceramic Mug", category: "Home", price: 19.99 },
  { id: "7", name: "Denim Jeans", category: "Clothing", price: 59.99 },
  { id: "8", name: "Sunglasses", category: "Accessories", price: 79.99 },
  { id: "9", name: "Smart Watch", category: "Electronics", price: 249.99 },
  { id: "10", name: "Desk Lamp", category: "Home", price: 39.99 },
  { id: "11", name: "Winter Jacket", category: "Clothing", price: 129.99 },
  { id: "12", name: "Premium Leather Bag", category: "Accessories", price: 129.99 },
]

interface SearchResult {
  id: string
  name: string
  category: string
  price: number
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

interface SearchBarProps {
  className?: string
  placeholder?: string
}

export default function SearchBar({ className = "", placeholder = "Search products..." }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Debounce search query by 300ms
  const debouncedQuery = useDebounce(query, 300)

  // Search function
  const searchProducts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 150))

    // In production: const response = await fetch(`/api/products?search=${searchQuery}`)
    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6) // Limit to 6 results

    setResults(filtered)
    setIsLoading(false)
  }, [])

  // Trigger search when debounced query changes
  useEffect(() => {
    searchProducts(debouncedQuery)
  }, [debouncedQuery, searchProducts])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectResult(results[selectedIndex])
        } else if (query.trim()) {
          handleSearch()
        }
        break
      case "Escape":
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelectResult = (result: SearchResult) => {
    setQuery("")
    setIsOpen(false)
    setSelectedIndex(-1)
    router.push(`/product/${result.id}`)
  }

  const handleSearch = () => {
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/products?search=${encodeURIComponent(query)}`)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setSelectedIndex(-1)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-9 pr-8"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (query.trim() || results.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 overflow-hidden"
        >
          {isLoading && results.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="max-h-64 overflow-y-auto">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    className={`w-full px-4 py-3 text-left hover:bg-muted flex items-center justify-between ${
                      index === selectedIndex ? "bg-muted" : ""
                    }`}
                  >
                    <div>
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-muted-foreground">{result.category}</div>
                    </div>
                    <div className="text-sm font-medium">${result.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
              <div className="border-t px-4 py-2">
                <button
                  onClick={handleSearch}
                  className="text-sm text-primary hover:underline w-full text-left"
                >
                  See all results for "{query}"
                </button>
              </div>
            </>
          ) : query.trim() ? (
            <div className="p-4 text-center text-muted-foreground">
              No products found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
