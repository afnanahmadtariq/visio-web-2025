"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, LogIn, CreditCard, RefreshCw, Shield, Clock, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuth } from "@/context/auth-context"

// Mock log data - in production this would come from the backend /api/admin/logs
const mockAdminActions = [
  { id: "1", action: "Product Created", user: "admin@visiomart.com", target: "Premium Leather Bag", timestamp: "2025-11-29T10:30:00Z", status: "success" },
  { id: "2", action: "Product Updated", user: "admin@visiomart.com", target: "Wireless Headphones", timestamp: "2025-11-29T09:15:00Z", status: "success" },
  { id: "3", action: "Product Deleted", user: "admin@visiomart.com", target: "Old Stock Item", timestamp: "2025-11-28T16:45:00Z", status: "success" },
  { id: "4", action: "Category Updated", user: "admin@visiomart.com", target: "Electronics", timestamp: "2025-11-28T14:20:00Z", status: "success" },
  { id: "5", action: "Bulk Import", user: "admin@visiomart.com", target: "50 products", timestamp: "2025-11-27T11:00:00Z", status: "success" },
  { id: "6", action: "Price Updated", user: "admin@visiomart.com", target: "Smart Watch", timestamp: "2025-11-27T10:30:00Z", status: "success" },
  { id: "7", action: "Stock Updated", user: "admin@visiomart.com", target: "Running Shoes", timestamp: "2025-11-26T15:00:00Z", status: "success" },
  { id: "8", action: "Sale Created", user: "admin@visiomart.com", target: "Black Friday Sale", timestamp: "2025-11-26T09:00:00Z", status: "success" },
]

const mockLoginAttempts = [
  { id: "1", email: "admin@visiomart.com", ip: "192.168.1.100", timestamp: "2025-11-29T10:00:00Z", status: "success", location: "New York, US" },
  { id: "2", email: "user@example.com", ip: "192.168.1.105", timestamp: "2025-11-29T09:45:00Z", status: "success", location: "Los Angeles, US" },
  { id: "3", email: "test@test.com", ip: "10.0.0.50", timestamp: "2025-11-29T08:30:00Z", status: "failed", location: "Unknown" },
  { id: "4", email: "admin@visiomart.com", ip: "192.168.1.100", timestamp: "2025-11-28T18:00:00Z", status: "success", location: "New York, US" },
  { id: "5", email: "hacker@evil.com", ip: "45.33.32.156", timestamp: "2025-11-28T03:15:00Z", status: "failed", location: "Beijing, CN" },
  { id: "6", email: "customer@gmail.com", ip: "172.16.0.10", timestamp: "2025-11-27T14:30:00Z", status: "success", location: "Chicago, US" },
  { id: "7", email: "admin", ip: "192.168.1.1", timestamp: "2025-11-27T12:00:00Z", status: "failed", location: "Unknown" },
  { id: "8", email: "user2@example.com", ip: "192.168.1.110", timestamp: "2025-11-27T10:45:00Z", status: "success", location: "Miami, US" },
]

const mockPaymentLogs = [
  { id: "1", orderId: "ORD-001", amount: 149.99, method: "Credit Card", timestamp: "2025-11-29T10:25:00Z", status: "success", customer: "John Doe" },
  { id: "2", orderId: "ORD-002", amount: 89.99, method: "PayPal", timestamp: "2025-11-29T09:10:00Z", status: "success", customer: "Jane Smith" },
  { id: "3", orderId: "ORD-003", amount: 299.99, method: "Credit Card", timestamp: "2025-11-29T08:00:00Z", status: "failed", customer: "Bob Wilson" },
  { id: "4", orderId: "ORD-004", amount: 59.99, method: "Apple Pay", timestamp: "2025-11-28T17:30:00Z", status: "success", customer: "Alice Brown" },
  { id: "5", orderId: "ORD-005", amount: 199.99, method: "Credit Card", timestamp: "2025-11-28T15:45:00Z", status: "refunded", customer: "Charlie Davis" },
  { id: "6", orderId: "ORD-006", amount: 79.99, method: "Credit Card", timestamp: "2025-11-28T14:00:00Z", status: "success", customer: "Diana Evans" },
  { id: "7", orderId: "ORD-007", amount: 449.99, method: "PayPal", timestamp: "2025-11-27T16:20:00Z", status: "pending", customer: "Edward Fox" },
  { id: "8", orderId: "ORD-008", amount: 129.99, method: "Credit Card", timestamp: "2025-11-27T11:30:00Z", status: "success", customer: "Fiona Gray" },
]

export default function AdminLogsPage() {
  const router = useRouter()
  const { isAdmin, isLoading } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/")
    }
  }, [isAdmin, isLoading, router])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // In production: await fetch("/api/admin/logs")
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Refunded</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin" className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Logs</h1>
            <p className="text-gray-600">Monitor system activity and audit trails</p>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="actions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="actions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Admin Actions
            </TabsTrigger>
            <TabsTrigger value="logins" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login Attempts
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="actions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Recent Admin Actions
                </CardTitle>
                <CardDescription>
                  Track all administrative changes made to the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAdminActions.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell className="text-gray-600">{log.user}</TableCell>
                        <TableCell>{log.target}</TableCell>
                        <TableCell className="text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(log.timestamp)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logins">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  Login Attempts
                </CardTitle>
                <CardDescription>
                  Monitor authentication attempts across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLoginAttempts.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            {log.email}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-gray-600">{log.ip}</TableCell>
                        <TableCell>{log.location}</TableCell>
                        <TableCell className="text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(log.timestamp)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Logs
                </CardTitle>
                <CardDescription>
                  Track all payment transactions and their statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPaymentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{log.orderId}</TableCell>
                        <TableCell>{log.customer}</TableCell>
                        <TableCell className="font-medium">${log.amount.toFixed(2)}</TableCell>
                        <TableCell>{log.method}</TableCell>
                        <TableCell className="text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(log.timestamp)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
