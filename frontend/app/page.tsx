'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Home() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/dashboard/stats`)
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-700">🌾 AgriFarm</h1>
            <nav className="flex gap-4">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
                خانه
              </Link>
              <Link href="/farms" className="text-gray-700 hover:text-green-600 font-medium">
                مزارع
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600 font-medium">
                داشبورد
              </Link>
              <Link href="/recommendations" className="text-gray-700 hover:text-green-600 font-medium">
                توصیه‌ها
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            سامانه مدیریت کشاورزی هوشمند
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            بهینه‌سازی مصرف آب و انرژی، انتخاب محصول بهینه و مدیریت سودآوری
          </p>
          <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg mb-8 text-right max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-800 mb-3">🎯 هدف اصلی پروژه</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              هدف اصلی سامانه تصمیم‌یار هوشمند AgriFarm، <strong>بهینه‌سازی بهره‌وری منابع آب و انرژی در کشاورزی و حمایت از احیای اکوسیستم دریاچه ارومیه</strong> است.
            </p>
            <p className="text-gray-600 text-sm">
              این سامانه با استفاده از الگوریتم‌های هوش مصنوعی و تحلیل داده‌های چندمنظوره، امکان تصمیم‌گیری علمی و داده‌محور را برای کشاورزان و مدیران منابع فراهم می‌آورد.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              href="/farms/new"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              افزودن مزرعه جدید
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              مشاهده داشبورد
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-3xl font-bold text-green-600">{stats.total_farms}</div>
              <div className="text-gray-600 mt-2">تعداد مزارع</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-3xl font-bold text-blue-600">{stats.total_area.toFixed(1)}</div>
              <div className="text-gray-600 mt-2">مساحت کل (هکتار)</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-3xl font-bold text-cyan-600">{stats.total_water_consumed.toFixed(0)}</div>
              <div className="text-gray-600 mt-2">مصرف آب (متر مکعب)</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-3xl font-bold text-orange-600">{stats.total_energy_consumed.toFixed(0)}</div>
              <div className="text-gray-600 mt-2">مصرف انرژی (ک.و.س)</div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">💧</div>
            <h3 className="text-xl font-bold mb-2">پیش‌بینی مصرف آب</h3>
            <p className="text-gray-600">
              پیش‌بینی دقیق مصرف آب بر اساس نوع خاک، محصول و شرایط اقلیمی
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">مدیریت انرژی</h3>
            <p className="text-gray-600">
              بهینه‌سازی مصرف انرژی و پیشنهاد منابع انرژی مناسب
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-bold mb-2">توصیه محصول</h3>
            <p className="text-gray-600">
              پیشنهاد محصولات بهینه بر اساس شرایط مزرعه و سودآوری
            </p>
          </div>
        </div>

        {/* Impact on Lake Urmia */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🌊 تأثیر بر احیای دریاچه ارومیه
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5">
              <h4 className="font-bold text-lg text-cyan-700 mb-2">مدیریت مصرف آب</h4>
              <p className="text-gray-600 text-sm">
                پیش‌بینی دقیق نیاز آبی و شبیه‌سازی سناریوهای کم‌آب‌بر برای جلوگیری از برداشت غیرمجاز
              </p>
            </div>
            <div className="bg-white rounded-lg p-5">
              <h4 className="font-bold text-lg text-cyan-700 mb-2">بهینه‌سازی انرژی</h4>
              <p className="text-gray-600 text-sm">
                کاهش مصرف برق و انرژی آبیاری و افزایش بهره‌وری عملیاتی
              </p>
            </div>
            <div className="bg-white rounded-lg p-5">
              <h4 className="font-bold text-lg text-cyan-700 mb-2">انتخاب محصول بهینه</h4>
              <p className="text-gray-600 text-sm">
                توصیه محصولات کم‌آب‌بر و سودآور با حداکثر بازده اقتصادی
              </p>
            </div>
            <div className="bg-white rounded-lg p-5">
              <h4 className="font-bold text-lg text-cyan-700 mb-2">سناریوسازی</h4>
              <p className="text-gray-600 text-sm">
                شبیه‌سازی اثر تغییرات اقلیمی و بارش بر تولید و مصرف آب
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; ۲۰۲۵ میلادی / ۱۴۰۴ ه.ش - AgriFarm MVP</p>
          <p className="text-sm text-gray-400">
            توسعه‌دهنده: محمد ناصر حاجی هاشم‌آباد | 
            <a href="https://mohammadnasser.com" target="_blank" rel="noopener noreferrer" className="hover:text-white mr-1">
              Mohammadnasser.com
            </a>
            | 
            <a href="https://agrifarms.ir" target="_blank" rel="noopener noreferrer" className="hover:text-white mr-1">
              agrifarms.ir
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-2">کارشناسی ارشد مدیریت فناوری اطلاعات - دانشگاه علم و صنعت ایران</p>
        </div>
      </footer>
    </div>
  )
}

