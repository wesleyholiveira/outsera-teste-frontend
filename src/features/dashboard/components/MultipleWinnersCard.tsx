import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import { useYearsWithMultipleWinners } from '../hooks/useDashboardQueries'
import { dashboardCardStyles } from './DashboardCard.styles'
import { DashboardTableState, EmptyTableBody } from './DashboardTableState'
import { useMemo } from 'react'

export function MultipleWinnersCard() {
  const { data, isLoading, isFetching, isError } = useYearsWithMultipleWinners()
  const isPending = isLoading || isFetching

  const localYears = useMemo(
    () => [...(data?.years ?? [])].sort((a, b) => b.year - a.year),
    [data?.years],
  )

  return (
    <Paper sx={dashboardCardStyles.paper}>
      <Typography variant="h6" sx={dashboardCardStyles.title}>
        List years with multiple winners
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Win Count</TableCell>
          </TableRow>
        </TableHead>

        <DashboardTableState colSpan={2} isLoading={isPending} isError={isError} />

        {!isPending && !isError && localYears.length === 0 && <EmptyTableBody colSpan={2} />}

        {!isPending && !isError && localYears.length > 0 && (
          <TableBody>
            {localYears.map((item) => (
              <TableRow key={item.year}>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.winnerCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </Paper>
  )
}
