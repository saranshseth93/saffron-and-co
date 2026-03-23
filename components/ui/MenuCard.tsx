'use client'

import { motion } from 'framer-motion'
import { scaleUp } from '@/lib/animations'

interface MenuCardProps {
  name: string
  description: string
  price: string
  gradient: [string, string, string]
  size?: 'sm' | 'md' | 'lg'
  index?: number
}

const gradientHeights: Record<NonNullable<MenuCardProps['size']>, number> = {
  sm: 100,
  md: 130,
  lg: 160,
}

export function MenuCard({
  name,
  description,
  price,
  gradient,
  size = 'md',
  index = 0,
}: MenuCardProps) {
  const gradientHeight = gradientHeights[size]
  const nameTextSize = size === 'lg' ? 'text-xl' : 'text-lg'

  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-bg-warm rounded-xl overflow-hidden cursor-pointer"
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(232,168,56,0.3)`,
      }}
    >
      {/* Top gradient area */}
      <div
        style={{
          height: gradientHeight,
          background: `radial-gradient(ellipse at 50% 0%, ${gradient[0]} 0%, ${gradient[1]} 50%, ${gradient[2]} 100%)`,
        }}
      />

      {/* Content area */}
      <div className="p-5">
        {/* Dotted separator row: name ........ price */}
        <div className="flex items-baseline justify-between">
          <h3
            className={`font-playfair ${nameTextSize} text-text-cream shrink-0`}
          >
            {name}
          </h3>

          {/* Dotted leader line */}
          <span
            className="flex-1 mx-3 border-b border-dashed border-text-muted/40"
            style={{ marginBottom: '0.2em' }}
          />

          <span className="font-space-mono text-sm text-accent-turmeric shrink-0">
            {price}
          </span>
        </div>

        {/* Description */}
        <p className="font-dm-sans text-sm text-text-spice line-clamp-2 mt-2">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
