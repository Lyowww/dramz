import { apiFetch } from './client'
import type { ApiSeries, SeriesEpisodesResponse } from '@/types/api'

export async function getSeriesList() {
  return apiFetch<ApiSeries[]>('/series', {
    method: 'GET'
  })
}

export async function getSeriesById(id: string) {
  return apiFetch<ApiSeries>(`/series/${id}`, {
    method: 'GET'
  })
}

export async function getSeriesEpisodes(id: string, token?: string) {
  return apiFetch<SeriesEpisodesResponse>(`/series/${id}/episodes`, {
    method: 'GET'
  }, token ? { token } : {})
}


