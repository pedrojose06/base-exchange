// Import everything needed to use the `useQuery` hook
import {} from '@apollo/client'
import { columns } from './components/DataGrid/Columns'
import { DataGrid } from './components/DataGrid/DataGrid'

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DataGrid columns={columns} />
    </div>
  )
}
