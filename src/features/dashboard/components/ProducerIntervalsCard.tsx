import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import type { ProducerInterval } from '../types/dashboard'
import { dashboardCardStyles } from './DashboardCard.styles'

type Props = {
  maximum: ProducerInterval[]
  minimum: ProducerInterval[]
}

export function ProducerIntervalsCard({ maximum, minimum }: Props) {
  return (
    <Paper sx={dashboardCardStyles.paper}>
      <Typography variant="h6" sx={dashboardCardStyles.title}>
        Producers with longest and shortest interval between wins
      </Typography>

      <Typography variant="h5" sx={{ mb: 1 }}>
        Maximum
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Producer</TableCell>
            <TableCell>Interval</TableCell>
            <TableCell>Previous Year</TableCell>
            <TableCell>Following Year</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {maximum.map((item) => (
            <TableRow key={item.producer}>
              <TableCell>{item.producer}</TableCell>
              <TableCell>{item.interval}</TableCell>
              <TableCell>{item.previousWin}</TableCell>
              <TableCell>{item.followingWin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h5" sx={{ my: 2 }}>
        Minimum
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Producer</TableCell>
            <TableCell>Interval</TableCell>
            <TableCell>Previous Year</TableCell>
            <TableCell>Following Year</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {minimum.map((item) => (
            <TableRow key={item.producer}>
              <TableCell>{item.producer}</TableCell>
              <TableCell>{item.interval}</TableCell>
              <TableCell>{item.previousWin}</TableCell>
              <TableCell>{item.followingWin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
