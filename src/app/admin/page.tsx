"use client";

import { motion } from "framer-motion";
import { Package, Users, ShoppingCart, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function AdminPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Total Products",
      value: "456",
      change: "+3.1%",
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "Total Customers",
      value: "892",
      change: "+15.3%",
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: "$189.00", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", amount: "$249.00", status: "Processing" },
    { id: "ORD-003", customer: "Bob Johnson", amount: "$159.00", status: "Shipped" },
    { id: "ORD-004", customer: "Alice Brown", amount: "$499.00", status: "Pending" },
    { id: "ORD-005", customer: "Charlie Wilson", amount: "$179.00", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, Admin</p>
            </div>
            <Link href="/shop">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                View Store
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card padding="lg" className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/products">
            <Card padding="lg" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Package size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Products</h3>
                  <p className="text-sm text-gray-600">Add, edit, or remove products</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/orders">
            <Card padding="lg" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">View Orders</h3>
                  <p className="text-sm text-gray-600">Manage and track orders</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card padding="lg" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Users</h3>
                  <p className="text-sm text-gray-600">View and manage customers</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Orders */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-gray-600 hover:text-gray-900">
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Shipped"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
