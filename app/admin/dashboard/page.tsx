// app/admin/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag, Package, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [totalOrders, setTotalOrders]     = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue]   = useState(0);
  const [lowStock, setLowStock]           = useState(0);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch('/api/admin/orders'),
          fetch('/api/products'),
        ]);

        const ordersData   = await ordersRes.json();
        const productsData = await productsRes.json();

        const orders   = ordersData.orders   || [];
        const products = productsData.products || [];

        setTotalOrders(orders.length);
        setTotalProducts(products.length);
        setTotalRevenue(
          orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0)
        );
        setLowStock(
          products.filter((p: any) => p.stock < 10).length
        );
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <ShoppingBag size={22} className="text-blue-600" />
          </div>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-2" />
          ) : (
            <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">Total Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
            <Package size={22} className="text-green-600" />
          </div>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-2" />
          ) : (
            <p className="text-3xl font-bold text-green-600">{totalProducts}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">Total Products</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp size={22} className="text-purple-600" />
          </div>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-2" />
          ) : (
            <p className="text-3xl font-bold text-purple-600">
              ${totalRevenue.toFixed(2)}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
            <AlertCircle size={22} className="text-red-500" />
          </div>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-2" />
          ) : (
            <p className="text-3xl font-bold text-red-500">{lowStock}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">Low Stock Items</p>
        </div>

      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/products"
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900">Manage Products</h3>
              <p className="text-gray-500 text-sm mt-1">Add, edit or delete products</p>
            </div>
            <Package
              size={32}
              className="text-gray-300 group-hover:text-blue-500 transition-colors"
            />
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900">Manage Orders</h3>
              <p className="text-gray-500 text-sm mt-1">View and update order statuses</p>
            </div>
            <ShoppingBag
              size={32}
              className="text-gray-300 group-hover:text-blue-500 transition-colors"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}