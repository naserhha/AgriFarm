'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Recommendation {
  crop_name: string
  reason: string
  expected_water: number
  expected_energy: number
  expected_profit: number
  confidence_score: number
}

export default function RecommendationsPage() {
  const params = useParams()
  const router = useRouter()
  const farmId = params.id as string
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [farm, setFarm] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (farmId) {
      fetchFarm()
      fetchRecommendations()
    }
  }, [farmId])

  const fetchFarm = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/farms/${farmId}`)
      setFarm(response.data)
    } catch (error) {
      console.error('Error fetching farm:', error)
    }
  }

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/recommendations/${farmId}`)
      setRecommendations(response.data.recommendations)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} میلیون ریال`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)} هزار ریال`
    }
    return `${amount.toFixed(0)} ریال`
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
            <Link href={`/farms/${farmId}`} className="text-gray-700 hover:text-green-600">
              بازگشت به مزرعه
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {farm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">توصیه محصول برای: {farm.name}</h2>
            <div className="text-gray-600">
              مساحت: {farm.area} هکتار | نوع خاک: {farm.soil_type}
            </div>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-800 mb-6">پیشنهادات محصول</h3>

        {recommendations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600">هیچ توصیه‌ای یافت نشد</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-green-700 mb-2">{rec.crop_name}</h4>
                    <p className="text-gray-600 text-sm">{rec.reason}</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold">
                    امتیاز: {(rec.confidence_score * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-gray-600 text-sm">مصرف آب پیش‌بینی شده</div>
                    <div className="text-lg font-bold text-cyan-600">
                      {rec.expected_water.toFixed(0)} متر مکعب
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">مصرف انرژی پیش‌بینی شده</div>
                    <div className="text-lg font-bold text-orange-600">
                      {rec.expected_energy.toFixed(0)} کیلووات ساعت
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">سود پیش‌بینی شده</div>
                    <div className={`text-lg font-bold ${rec.expected_profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(rec.expected_profit)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

