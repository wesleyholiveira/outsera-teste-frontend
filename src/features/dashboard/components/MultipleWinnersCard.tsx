import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import type { MultipleWinnerYear } from '../types/dashboard'
import { dashboardCardStyles } from './DashboardCard.styles'

type Props = {
  data: MultipleWinnerYear[]
}

export function MultipleWinnersCard({ data }: Props) {
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

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.year}>
              <TableCell>{item.year}</TableCell>
              <TableCell>{item.winCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
