"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
}

interface GraphingPlaneProps {
  points: Point[]
}

export function GraphingPlane({ points = [] }: GraphingPlaneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Draw vertical lines
    for (let x = 0; x <= width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2

    // X-axis
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.stroke()
  }

  const plotPoints = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const scale = 40 // 40 pixels per unit
    const originX = width / 2
    const originY = height / 2

    ctx.fillStyle = "#3b82f6"

    points.forEach((point, index) => {
      const x = originX + point.x * scale
      const y = originY - point.y * scale

      // Draw point
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.fill()

      // Label point
      ctx.fillStyle = "#000"
      ctx.font = "14px sans-serif"
      ctx.fillText(String.fromCharCode(65 + index), x + 10, y - 10)
      ctx.fillStyle = "#3b82f6"
    })

    // Draw line between points if there are at least 2 points
    if (points.length >= 2) {
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2
      ctx.beginPath()
      const startX = originX + points[0].x * scale
      const startY = originY - points[0].y * scale
      ctx.moveTo(startX, startY)

      for (let i = 1; i < points.length; i++) {
        const x = originX + points[i].x * scale
        const y = originY - points[i].y * scale
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 600

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid and points
    drawGrid(ctx, canvas.width, canvas.height)
    plotPoints(ctx, canvas.width, canvas.height)
  }, [points, drawGrid]) // Added drawGrid to dependencies

  return <canvas ref={canvasRef} className="w-full border border-gray-200 rounded-lg" style={{ aspectRatio: "1/1" }} />
}

