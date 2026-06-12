import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DashboardPage from './DashboardPage'

vi.mock('@mui/material', () => ({
  Grid: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('../features/dashboard/components/MultipleWinnersCard', () => ({
  MultipleWinnersCard: () => <div>Multiple winners card</div>,
}))

vi.mock('../features/dashboard/components/TopStudiosCard', () => ({
  TopStudiosCard: () => <div>Top studios card</div>,
}))

vi.mock('../features/dashboard/components/ProducerIntervalsCard', () => ({
  ProducerIntervalsCard: () => <div>Producer intervals card</div>,
}))

vi.mock('../features/dashboard/components/MovieWinnersByYearCard', () => ({
  MovieWinnersByYearCard: () => <div>Movie winners by year card</div>,
}))

describe('DashboardPage', () => {
  it('should render dashboard title and all dashboard cards', () => {
    render(<DashboardPage />)

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByText('Multiple winners card')).toBeInTheDocument()
    expect(screen.getByText('Top studios card')).toBeInTheDocument()
    expect(screen.getByText('Producer intervals card')).toBeInTheDocument()
    expect(screen.getByText('Movie winners by year card')).toBeInTheDocument()
  })
})
