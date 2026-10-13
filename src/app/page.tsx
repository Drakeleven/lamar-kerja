'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getStatusColor, getStatusLabel } from '@/lib/utils'
import { Plus, Settings, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [apps, setApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApps()
  }, [])

  async function fetchApps() {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('applied_at', { ascending: false })
    
    if (data) setApps(data)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="text-blue-600" /> Lamar Kerja
          </h1>
          <div className="flex gap-3">
            <Link href="/settings" className="p-2 bg-white border rounded-lg hover:bg-slate-100 transition">
              <Settings size={20} className="text-slate-600" />
            </Link>
            <Link href="/add" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Plus size={20} /> Tambah Lamaran
            </Link>
          </div>
        </header>

        <main>
          {loading ? (
            <div className="text-center py-10">Memuat data...</div>
          ) : apps.length === 0 ? (
            <div className="bg-white border-2 border-dashed rounded-xl p-12 text-center text-slate-400">
              Belum ada lamaran. Klik "Tambah Lamaran" untuk memulai.
            </div>
          ) : (
            <div className="grid gap-4">
              {apps.map((app) => (
                <div key={app.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">{app.company_name}</h3>
                    <p className="text-slate-500">{app.division}</p>
                    <p className="text-xs text-slate-400 mt-1">Dilamar pada: {app.applied_at}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600">
                      {getStatusLabel(app.applied_at)}
                    </span>
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(app.applied_at)} shadow-sm`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
