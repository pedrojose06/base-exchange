// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client'
import LoadingPage from './components/Loading/Loading'
import { Button } from './components/ui/button'
import { Datagrid } from './components/Datagrid/Datagrid'
import { columns, Payment } from './components/Datagrid/Columns'

interface IOrders {
  instrument: string
}

const GET_ORDERS = gql`
  query GetOrders {
    orders {
      instrument
    }
  }
`

function getData(): Payment[] {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
  ]
}

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_ORDERS)

  if (loading) return <LoadingPage />
  if (error) return <p>Error : {error.message}</p>

  return data.orders.map(({ instrument }: IOrders) => (
    <div key={instrument}>
      <Button className="bg-red-400">{instrument}</Button>
    </div>
  ))
}

export default function App() {
  const data = getData()

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayLocations />
      <Datagrid columns={columns} data={data} />
    </div>
  )
}
