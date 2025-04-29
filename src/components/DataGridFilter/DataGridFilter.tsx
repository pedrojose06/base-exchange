import { Input } from '../ui/input'

interface IDataGridFilter {
  setGlobalFilter: (value: string) => void
}

const DataGridFilter = ({ setGlobalFilter }: IDataGridFilter) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Digite para filtrar"
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
    </div>
  )
}
export default DataGridFilter
