import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/Loading/Loading'

const Home = lazy(() => import('@/page/Home/Home'))
const Order = lazy(() => import('@/page/Order/Order'))

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/order-detail/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Order />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
