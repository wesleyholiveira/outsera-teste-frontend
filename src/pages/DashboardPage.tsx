import { Grid } from '@mui/material'
import { ProducerIntervalsCard } from '../features/dashboard/components/ProducerIntervalsCard'
import { TopStudiosCard } from '../features/dashboard/components/TopStudiosCard'
import { MultipleWinnersCard } from '../features/dashboard/components/MultipleWinnersCard'
import { MovieWinnersByYearCard } from '../features/dashboard/components/MovieWinnersByYearCard'

const multipleWinners = [
  { year: 1986, winCount: 2 },
  { year: 1990, winCount: 2 },
  { year: 2015, winCount: 2 },
]

const topStudios = [
  { name: 'Columbia Pictures', winCount: 6 },
  { name: 'Paramount Pictures', winCount: 6 },
  { name: 'Warner Bros.', winCount: 5 },
]

const maximumIntervals = [
  {
    producer: 'Matthew Vaughn',
    interval: 13,
    previousWin: 2002,
    followingWin: 2015,
  },
]

const minimumIntervals = [
  {
    producer: 'Joel Silver',
    interval: 1,
    previousWin: 1990,
    followingWin: 1991,
  },
]

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MultipleWinnersCard data={multipleWinners} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopStudiosCard data={topStudios} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ProducerIntervalsCard maximum={maximumIntervals} minimum={minimumIntervals} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MovieWinnersByYearCard />
        </Grid>
      </Grid>
    </>
  )
}
