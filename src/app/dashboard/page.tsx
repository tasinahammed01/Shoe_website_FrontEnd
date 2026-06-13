"use client";

import { motion } from "framer-motion";
import { Package, MapPin, CreditCard, User, ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function DashboardPage() {
  const orders = [
    { id: "ORD-001", date: "2024-01-15", status: "Delivered", total: "$189.00" },
    { id: "ORD-002", date: "2024-01-10", status: "Shipped", total: "$249.00" },
    { id: "ORD-003", date: "2024-01-05", status: "Processing", total: "$159.00" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, John</p>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/dashboard/orders">
            <Card padding="lg" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Orders</h3>
                  <p className="text-sm text-gray-600">View order history</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/addresses">
            <Card padding="lg" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MapPin size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Addresses</h3>
                  <p className="text-sm text-gray-600">Manage addresses</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/profile">
            <Card padding="lg" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <User size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Profile</h3>
                  <p className="text-sm text-gray-600">Edit account info</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/wishlist">
            <Card padding="lg" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <CreditCard size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Wishlist</h3>
                  <p className="text-sm text-gray-600">View saved items</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Orders */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-sm text-gray-600 hover:text-gray-900">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.total}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-8">
              <Package size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No orders yet</p>
              <Link href="/shop">
                <button className="mt-4 flex items-center gap-2 text-gray-900 font-medium mx-auto">
                  Start Shopping
                  <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
