import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Table } from '@mui/material'
import { DashboardTableState, EmptyTableBody } from './DashboardTableState'

describe('DashboardTableState', () => {
  it('should render nothing when there is no loading or error state', () => {
    const { container } = render(
      <Table>
        <DashboardTableState colSpan={2} />
      </Table>,
    )

    expect(container.querySelector('tbody')).not.toBeInTheDocument()
  })

  it('should render loading message', () => {
    render(
      <Table>
        <DashboardTableState colSpan={2} isLoading />
      </Table>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render error message', () => {
    render(
      <Table>
        <DashboardTableState colSpan={2} isError />
      </Table>,
    )

    expect(screen.getByText('Failed to load data.')).toBeInTheDocument()
  })
})

describe('EmptyTableBody', () => {
  it('should render default empty message', () => {
    render(
      <Table>
        <EmptyTableBody colSpan={2} />
      </Table>,
    )

    expect(screen.getByText('No data found.')).toBeInTheDocument()
  })

  it('should render custom empty message', () => {
    render(
      <Table>
        <EmptyTableBody colSpan={2} message="Nothing here." />
      </Table>,
    )

    expect(screen.getByText('Nothing here.')).toBeInTheDocument()
  })
})
