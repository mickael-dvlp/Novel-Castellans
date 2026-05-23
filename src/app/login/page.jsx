'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SITE_CONFIG } from '@/config'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-[calc(100dvh-112px)] flex items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(130,38,8,0.18) 0%, transparent 70%)',
      }}
    >
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <h1
            className="font-serif text-3xl font-bold text-orange-50 mb-2"
            style={{ textShadow: '0 0 35px rgba(255,100,20,0.45), 0 0 70px rgba(255,55,8,0.2)' }}
          >
            {SITE_CONFIG.title}
          </h1>
          <p className="text-orange-900/55 text-[0.68rem] tracking-[0.22em] uppercase font-sans">
            Accès privé
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            placeholder="Mot de passe"
            autoFocus
            className="w-full px-4 py-3 rounded-xl
              bg-stone-950/80 backdrop-blur-sm
              border border-orange-950/40
              focus:border-orange-700/55 focus:outline-none
              text-stone-200 placeholder-stone-600
              font-sans text-sm transition-colors"
          />

          {error && (
            <p className="text-red-400/75 text-xs text-center font-sans">
              Mot de passe incorrect
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl
              bg-orange-950/70 border border-orange-700/40
              hover:bg-orange-900/70 hover:border-orange-600/50
              disabled:opacity-40 disabled:cursor-not-allowed
              text-orange-100 font-sans text-sm font-medium
              transition-all duration-200"
          >
            {loading ? 'Vérification…' : 'Entrer'}
          </button>
        </form>

      </div>
    </div>
  )
}
