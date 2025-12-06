'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function FarmDetailPage() {
  const params = useParams()
  const farmId = params.id as string
  const [farm, setFarm] = useState<any>(null)
  const [predictions, setPredictions] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (farmId) {
      fetchFarm()
      fetchPredictions()
    }
  }, [farmId])

  const fetchFarm = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/farms/${farmId}`)
      setFarm(response.data)
    } catch (error) {
      console.error('Error fetching farm:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPredictions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/predictions/combined/${farmId}?days=30`)
      setPredictions(response.data)
    } catch (error) {
      console.error('Error fetching predictions:', error)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">در حال بارگذاری...</div>
  }

  if (!farm) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-600">مزرعه یافت نشد</div>
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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{farm.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">اطلاعات مزرعه</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">مساحت:</span>
                  <span className="font-bold">{farm.area} هکتار</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">نوع خاک:</span>
                  <span className="font-bold">{farm.soil_type}</span>
                </div>
                {farm.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">موقعیت:</span>
                    <span className="font-bold">{farm.location}</span>
                  </div>
                )}
                {farm.water_source && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">منبع آب:</span>
                    <span className="font-bold">{farm.water_source}</span>
                  </div>
                )}
                {farm.energy_source && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">منبع انرژی:</span>
                    <span className="font-bold">{farm.energy_source}</span>
                  </div>
                )}
              </div>
            </div>

            {predictions && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">پیش‌بینی مصرف (30 روز آینده)</h3>
                <div className="space-y-4">
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">مصرف آب</div>
                    <div className="text-2xl font-bold text-cyan-600">
                      {predictions.water.predicted_water.toFixed(0)} متر مکعب
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      میانگین روزانه: {predictions.water.daily_average.toFixed(1)} متر مکعب
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">مصرف انرژی</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {predictions.energy.predicted_energy.toFixed(0)} کیلووات ساعت
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      میانگین روزانه: {predictions.energy.daily_average.toFixed(1)} ک.و.س
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/farms/${farmId}/recommendations`}
            className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            مشاهده توصیه‌های محصول
          </Link>
        </div>
      </main>
    </div>
  )
}

