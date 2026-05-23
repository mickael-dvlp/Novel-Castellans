'use client'

import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 130

export default function LavaBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const el = canvasRef.current
    const ctx = el.getContext('2d')

    let raf
    let t = 0
    const particles = []

    const resize = () => {
      el.width = window.innerWidth
      el.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function spawn(w, h) {
      const isEmber = Math.random() < 0.35
      return {
        x: Math.random() * w,
        y: isEmber ? h * (0.65 + Math.random() * 0.35) : -8,
        vx: (Math.random() - 0.5) * (isEmber ? 1.0 : 0.5),
        vy: isEmber ? -(0.4 + Math.random() * 1.1) : (0.25 + Math.random() * 0.75),
        size: isEmber ? 1 + Math.random() * 2.5 : 1.5 + Math.random() * 3,
        opacity: 0.4 + Math.random() * 0.5,
        life: 0,
        maxLife: isEmber ? 160 + Math.random() * 220 : 280 + Math.random() * 380,
        type: isEmber ? 'ember' : 'ash',
      }
    }

    function drawBase() {
      const w = el.width
      const h = el.height

      ctx.fillStyle = '#080604'
      ctx.fillRect(0, 0, w, h)

      const ambientGrad = ctx.createLinearGradient(0, h * 0.45, 0, h)
      ambientGrad.addColorStop(0, 'rgba(0,0,0,0)')
      ambientGrad.addColorStop(0.5, 'rgba(70,18,4,0.18)')
      ambientGrad.addColorStop(1, 'rgba(130,38,8,0.38)')
      ctx.fillStyle = ambientGrad
      ctx.fillRect(0, 0, w, h)

      const pools = [
        { fx: 0.12, fy: 0.92, r: 0.42, ph: 0.0 },
        { fx: 0.48, fy: 0.97, r: 0.52, ph: 1.3 },
        { fx: 0.82, fy: 0.90, r: 0.38, ph: 2.6 },
        { fx: 0.30, fy: 0.84, r: 0.30, ph: 3.9 },
        { fx: 0.68, fy: 0.78, r: 0.26, ph: 5.2 },
        { fx: 0.95, fy: 0.75, r: 0.20, ph: 0.7 },
      ]

      for (const p of pools) {
        const px = p.fx * w + Math.sin(t * 0.00075 + p.ph) * w * 0.022
        const py = p.fy * h + Math.cos(t * 0.00055 + p.ph) * h * 0.014
        const r  = p.r * Math.max(w, h) * (0.94 + 0.06 * Math.sin(t * 0.0014 + p.ph))
        const intensity = 0.10 + 0.05 * Math.sin(t * 0.0019 + p.ph)

        const g = ctx.createRadialGradient(px, py, 0, px, py, r)
        g.addColorStop(0,    `rgba(255,88,8,${intensity})`)
        g.addColorStop(0.35, `rgba(195,45,5,${intensity * 0.55})`)
        g.addColorStop(0.7,  `rgba(90,18,0,${intensity * 0.18})`)
        g.addColorStop(1,    'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
    }

    function drawCracks() {
      const w = el.width
      const h = el.height

      const cracks = [
        { pts: [[0.07,1],[0.11,0.88],[0.08,0.82],[0.13,0.76]], lw: 1.5 },
        { pts: [[0.20,1],[0.23,0.90],[0.19,0.84],[0.25,0.77],[0.21,0.71]], lw: 1.2 },
        { pts: [[0.38,1],[0.40,0.91],[0.36,0.86],[0.41,0.82]], lw: 1.8 },
        { pts: [[0.55,1],[0.57,0.92],[0.53,0.87],[0.58,0.83]], lw: 1.4 },
        { pts: [[0.72,0.98],[0.74,0.89],[0.70,0.83],[0.75,0.77]], lw: 1.2 },
        { pts: [[0.88,1],[0.85,0.91],[0.89,0.85],[0.86,0.79]], lw: 1.0 },
        { pts: [[0.46,0.93],[0.43,0.86],[0.48,0.80]], lw: 0.9 },
        { pts: [[0.63,0.90],[0.65,0.83],[0.61,0.77]], lw: 0.8 },
        { pts: [[0.29,0.96],[0.27,0.88],[0.31,0.82]], lw: 1.0 },
      ]

      for (let i = 0; i < cracks.length; i++) {
        const crack = cracks[i]
        const flicker =
          0.45 +
          0.55 *
            (0.5 +
              0.5 *
                Math.sin(
                  t * 0.0028 + i * 1.73 + Math.sin(t * 0.007 + i * 0.9),
                ))
        const alpha = 0.22 + 0.18 * flicker
        const gb = Math.floor(55 + flicker * 85)

        ctx.beginPath()
        ctx.moveTo(crack.pts[0][0] * w, crack.pts[0][1] * h)
        for (let j = 1; j < crack.pts.length; j++) {
          ctx.lineTo(crack.pts[j][0] * w, crack.pts[j][1] * h)
        }
        ctx.strokeStyle = `rgba(255,${gb},0,${alpha})`
        ctx.lineWidth = crack.lw
        ctx.shadowColor = `rgba(255,95,0,${flicker * 0.55})`
        ctx.shadowBlur = 9
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    function drawParticles() {
      const w = el.width
      const h = el.height

      while (particles.length < MAX_PARTICLES && Math.random() < 0.45) {
        particles.push(spawn(w, h))
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.x += p.vx + Math.sin(t * 0.0018 + i * 0.31) * 0.28
        p.y += p.vy
        p.life++

        const ratio = p.life / p.maxLife
        const fade =
          Math.min(ratio * 6, 1) * Math.max(1 - (ratio - 0.65) / 0.35, 0)
        const a = p.opacity * fade

        if (p.type === 'ash') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(155,135,115,${a * 0.5})`
          ctx.fill()
        } else {
          const fl = 0.7 + 0.3 * Math.sin(t * 0.016 + i * 2.1)
          const gb = Math.floor(75 + fl * 105)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * fl, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,${gb},0,${a})`
          ctx.shadowColor = `rgba(255,115,0,${a * 0.65})`
          ctx.shadowBlur = 7
          ctx.fill()
          ctx.shadowBlur = 0
        }

        if (p.life >= p.maxLife || p.y < -30 || p.y > h + 30) {
          particles.splice(i, 1)
        }
      }
    }

    function frame() {
      t++
      drawBase()
      drawCracks()
      drawParticles()
      raf = requestAnimationFrame(frame)
    }

    frame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
