import { Grid } from '@mui/material'
import { ProducerIntervalsCard } from '../features/dashboard/components/ProducerIntervalsCard'
import { TopStudiosCard } from '../features/dashboard/components/TopStudiosCard'
import { MultipleWinnersCard } from '../features/dashboard/components/MultipleWinnersCard'
import { MovieWinnersByYearCard } from '../features/dashboard/components/MovieWinnersByYearCard'

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MultipleWinnersCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopStudiosCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ProducerIntervalsCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MovieWinnersByYearCard />
        </Grid>
      </Grid>
    </>
  )
}
