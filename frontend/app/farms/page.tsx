'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Farm {
  id: number
  name: string
  area: number
  soil_type: string
  location: string | null
  water_source: string | null
  energy_source: string | null
}

export default function FarmsPage() {
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFarms()
  }, [])

  const fetchFarms = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/farms/`)
      setFarms(response.data)
    } catch (error) {
      console.error('Error fetching farms:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSoilTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'clay': 'رسی',
      'sandy': 'شنی',
      'loam': 'لومی'
    }
    return labels[type] || type
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">در حال بارگذاری...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-700">🌾 AgriFarm</h1>
            <nav className="flex gap-4">
              <Link href="/" className="text-gray-700 hover:text-green-600">خانه</Link>
              <Link href="/farms" className="text-green-600 font-bold">مزارع</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600">داشبورد</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">لیست مزارع</h2>
          <Link
            href="/farms/new"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + افزودن مزرعه جدید
          </Link>
        </div>

        {farms.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">هنوز مزرعه‌ای ثبت نشده است</p>
            <Link
              href="/farms/new"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              اولین مزرعه را اضافه کنید
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms.map((farm) => (
              <div key={farm.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{farm.name}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>مساحت:</span>
                    <span className="font-semibold">{farm.area} هکتار</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نوع خاک:</span>
                    <span className="font-semibold">{getSoilTypeLabel(farm.soil_type)}</span>
                  </div>
                  {farm.location && (
                    <div className="flex justify-between">
                      <span>موقعیت:</span>
                      <span className="font-semibold">{farm.location}</span>
                    </div>
                  )}
                  {farm.water_source && (
                    <div className="flex justify-between">
                      <span>منبع آب:</span>
                      <span className="font-semibold">{farm.water_source}</span>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-2">
                  <Link
                    href={`/farms/${farm.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    مشاهده جزئیات
                  </Link>
                  <Link
                    href={`/farms/${farm.id}/recommendations`}
                    className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    توصیه‌ها
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

