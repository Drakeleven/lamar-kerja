'use client'

import { ArrowLeft, Database, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SettingsPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'Belum diatur'
  
  async function clearData() {
    if (!confirm('Hapus semua data lamaran?')) return
    const { error } = await supabase.from('applications').delete().neq('company_name', '')
    if (error) alert('Gagal: ' + error.message)
    else alert('Data berhasil dikosongkan')
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition">
          <ArrowLeft size={20} /> Kembali
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            Pengaturan
          </h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Database size={14} /> Koneksi Supabase
              </h2>
              <div className="p-3 bg-slate-50 rounded-lg border text-xs font-mono break-all text-slate-600">
                {url}
              </div>
              <p className="text-xs text-slate-400 mt-2 italic">
                Ubah di file .env.local untuk mengganti database.
              </p>
            </section>

            <section className="pt-6 border-t">
              <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">
                Zona Bahaya
              </h2>
              <button 
                onClick={clearData}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
              >
                <Trash2 size={18} /> Bersihkan Semua Data
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
