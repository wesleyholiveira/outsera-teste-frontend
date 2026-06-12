import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import { useStudiosWithWinCount } from '../hooks/useDashboardQueries'
import { dashboardCardStyles } from './DashboardCard.styles'
import { DashboardTableState, EmptyTableBody } from './DashboardTableState'

const TOP_STUDIOS_LIMIT = 3

export function TopStudiosCard() {
  const { data, isLoading, isFetching, isError } = useStudiosWithWinCount()
  const studios = (data?.studios ?? []).slice(0, TOP_STUDIOS_LIMIT)
  const isPending = isLoading || isFetching

  return (
    <Paper sx={dashboardCardStyles.paper}>
      <Typography variant="h6" sx={dashboardCardStyles.title}>
        Top 3 studios with winners
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Win Count</TableCell>
          </TableRow>
        </TableHead>

        <DashboardTableState colSpan={2} isLoading={isPending} isError={isError} />

        {!isPending && !isError && studios.length === 0 && <EmptyTableBody colSpan={2} />}

        {!isPending && !isError && studios.length > 0 && (
          <TableBody>
            {studios.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.winCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </Paper>
  )
}
