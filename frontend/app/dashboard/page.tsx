'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/dashboard/stats`)
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">در حال بارگذاری...</div>
  }

  if (!stats) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-600">خطا در بارگذاری داده‌ها</div>
  }

  const chartData = stats.monthly_consumption.map((item: any) => ({
    month: item.month,
    آب: item.water,
    انرژی: item.energy
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-700">🌾 AgriFarm</h1>
            <nav className="flex gap-4">
              <Link href="/" className="text-gray-700 hover:text-green-600">خانه</Link>
              <Link href="/farms" className="text-gray-700 hover:text-green-600">مزارع</Link>
              <Link href="/dashboard" className="text-green-600 font-bold">داشبورد</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">داشبورد مدیریتی</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.total_farms}</div>
            <div className="text-gray-600">تعداد مزارع</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total_area.toFixed(1)}</div>
            <div className="text-gray-600">مساحت کل (هکتار)</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl font-bold text-cyan-600 mb-2">{stats.total_water_consumed.toFixed(0)}</div>
            <div className="text-gray-600">مصرف آب (متر مکعب)</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.total_energy_consumed.toFixed(0)}</div>
            <div className="text-gray-600">مصرف انرژی (ک.و.س)</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">مصرف ماهانه آب و انرژی</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="آب" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="انرژی" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">مقایسه مصرف ماهانه</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="آب" fill="#06b6d4" />
                <Bar dataKey="انرژی" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">اطلاعات تکمیلی</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600">محصولات فعال:</span>
              <span className="font-bold text-green-600 mr-2">{stats.active_crops}</span>
            </div>
            <div>
              <span className="text-gray-600">میانگین مصرف آب به ازای هر هکتار:</span>
              <span className="font-bold text-blue-600 mr-2">
                {stats.total_area > 0 ? (stats.total_water_consumed / stats.total_area).toFixed(0) : 0} متر مکعب
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

