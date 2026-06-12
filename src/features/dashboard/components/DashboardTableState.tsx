import { TableBody, TableCell, TableRow } from '@mui/material'

type DashboardTableStateProps = {
  colSpan: number
  isLoading?: boolean
  isError?: boolean
}

export function DashboardTableState({ colSpan, isLoading, isError }: DashboardTableStateProps) {
  if (!isLoading && !isError) return null

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan} align="center">
          {isLoading && 'Loading...'}
          {isError && 'Failed to load data.'}
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export function EmptyTableBody({ colSpan, message = 'No data found.' }: { colSpan: number; message?: string }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan} align="center">
          {message}
        </TableCell>
      </TableRow>
    </TableBody>
  )
}
