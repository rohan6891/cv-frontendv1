// components/common/Portal.tsx
'use client'

import { useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
}

export default function Portal({ children }: PortalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return createPortal(children, document.body)
}