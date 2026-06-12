import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import type { StudioWinner } from '../types/dashboard'
import { dashboardCardStyles } from './DashboardCard.styles'

type Props = {
  data: StudioWinner[]
}

export function TopStudiosCard({ data }: Props) {
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

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.winCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
