import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import type { ProducerInterval } from '../types/dashboard'
import { useMaxMinWinIntervalForProducers } from '../hooks/useDashboardQueries'
import { dashboardCardStyles } from './DashboardCard.styles'
import { DashboardTableState, EmptyTableBody } from './DashboardTableState'

type ProducerIntervalsTableProps = {
  data: ProducerInterval[]
  isPending: boolean
  isError: boolean
}

function ProducerIntervalsTable({ data, isPending, isError }: ProducerIntervalsTableProps) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Producer</TableCell>
          <TableCell>Interval</TableCell>
          <TableCell>Previous Year</TableCell>
          <TableCell>Following Year</TableCell>
        </TableRow>
      </TableHead>

      <DashboardTableState colSpan={4} isLoading={isPending} isError={isError} />

      {!isPending && !isError && data.length === 0 && <EmptyTableBody colSpan={4} />}

      {!isPending && !isError && data.length > 0 && (
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.producer}-${item.previousWin}-${item.followingWin}`}>
              <TableCell>{item.producer}</TableCell>
              <TableCell>{item.interval}</TableCell>
              <TableCell>{item.previousWin}</TableCell>
              <TableCell>{item.followingWin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  )
}

export function ProducerIntervalsCard() {
  const { data, isLoading, isFetching, isError } = useMaxMinWinIntervalForProducers()
  const isPending = isLoading || isFetching

  return (
    <Paper sx={dashboardCardStyles.paper}>
      <Typography variant="h6" sx={dashboardCardStyles.title}>
        Producers with longest and shortest interval between wins
      </Typography>

      <Typography variant="h5" sx={{ mb: 1 }}>
        Maximum
      </Typography>

      <ProducerIntervalsTable data={data?.max ?? []} isPending={isPending} isError={isError} />

      <Typography variant="h5" sx={{ my: 2 }}>
        Minimum
      </Typography>

      <ProducerIntervalsTable data={data?.min ?? []} isPending={isPending} isError={isError} />
    </Paper>
  )
}
