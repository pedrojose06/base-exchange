import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home/Home'

const OrderDetailPage = () => <h1>Order Detail Page</h1>

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-detail" element={<OrderDetailPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
