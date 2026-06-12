import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import DashboardPage from './pages/DashboardPage'
import ListPage from './pages/ListPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="list" element={<ListPage />} />
      </Route>
    </Routes>
  )
}
