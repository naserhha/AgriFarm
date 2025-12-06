'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function NewFarmPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    user_id: 1, // در MVP فرضی است
    name: '',
    area: '',
    soil_type: 'loam',
    location: '',
    latitude: '',
    longitude: '',
    water_source: 'well',
    energy_source: 'electricity'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        area: parseFloat(formData.area),
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        location: formData.location || null,
        water_source: formData.water_source || null,
        energy_source: formData.energy_source || null
      }

      await axios.post(`${API_URL}/api/farms/`, data)
      router.push('/farms')
    } catch (error) {
      console.error('Error creating farm:', error)
      alert('خطا در ثبت مزرعه. لطفاً دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-700">🌾 AgriFarm</h1>
            <Link href="/farms" className="text-gray-700 hover:text-green-600">
              بازگشت به لیست مزارع
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ثبت مزرعه جدید</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                نام مزرعه *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="مثال: مزرعه گندم احمد"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                مساحت (هکتار) *
              </label>
              <input
                type="number"
                required
                step="0.1"
                min="0"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="مثال: 10.5"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                نوع خاک *
              </label>
              <select
                required
                value={formData.soil_type}
                onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="loam">لومی</option>
                <option value="clay">رسی</option>
                <option value="sandy">شنی</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                موقعیت جغرافیایی
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="مثال: اصفهان"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  عرض جغرافیایی
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 32.6546"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  طول جغرافیایی
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 51.6680"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                منبع آب
              </label>
              <select
                value={formData.water_source}
                onChange={(e) => setFormData({ ...formData, water_source: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="well">چاه</option>
                <option value="river">رودخانه</option>
                <option value="dam">سد</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                منبع انرژی
              </label>
              <select
                value={formData.energy_source}
                onChange={(e) => setFormData({ ...formData, energy_source: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="electricity">برق</option>
                <option value="solar">خورشیدی</option>
                <option value="diesel">دیزل</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'در حال ثبت...' : 'ثبت مزرعه'}
              </button>
              <Link
                href="/farms"
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-center"
              >
                انصراف
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

