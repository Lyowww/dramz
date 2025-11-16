'use client'

import { useEffect, useState } from 'react'
import { getSeriesEpisodes } from '@/lib/api/series'
import type { SeriesEpisodesResponse } from '@/types/api'

export function useSeriesEpisodes(seriesId: string | null) {
  const [data, setData] = useState<SeriesEpisodesResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!seriesId) return

    const id = seriesId
    let active = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await getSeriesEpisodes(id)
        if (active) {
          setData(result)
        }
      } catch (e) {
        if (active) {
          setError(e instanceof Error ? e.message : 'Failed to load episodes')
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
  }, [seriesId])

  return {
    data,
    loading,
    error
  }
}


