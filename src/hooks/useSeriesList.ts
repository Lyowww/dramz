'use client'

import { useEffect, useState } from 'react'
import { getSeriesList } from '@/lib/api/series'
import type { ApiSeries } from '@/types/api'

export function useSeriesList() {
  const [data, setData] = useState<ApiSeries[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const list = await getSeriesList()
        if (active) {
          setData(list)
        }
      } catch (e) {
        if (active) {
          setError(e instanceof Error ? e.message : 'Failed to load series')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  return {
    data,
    loading,
    error
  }
}


