import { Table } from '@tanstack/react-table'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useState } from 'react'
import { useOrderBy } from '@/hooks/useOrderBy'
import { Button } from '../ui/button'

interface IDataGridFilter {
  setGlobalFilter: (value: string) => void
  table: Table<any>
}

const DataGridFilter = ({ setGlobalFilter, table }: IDataGridFilter) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    id: '',
    instrument: '',
    side: '',
    status: '',
    createDate: '',
  })

  const handleFilterChange = (column: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [column]: value,
    }))
    table.getColumn(column)?.setFilterValue(value)
  }

  const { executeFilterByStatus, executeFilterBySide } = useOrderBy()

  const filterByStatus = (value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      status: value,
    }))
    executeFilterByStatus(value)
  }

  const clearStatusFilter = () => {
    setFilterValues((prev) => ({
      ...prev,
      status: '',
    }))
    executeFilterByStatus('')
  }

  const filterBySide = (value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      side: value,
    }))
    executeFilterBySide(value)
  }

  const clearSideFilter = () => {
    setFilterValues((prev) => ({
      ...prev,
      side: '',
    }))
    executeFilterBySide('')
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Global Filter */}
      <Input
        placeholder="Digite para filtrar globalmente..."
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* ID Filter */}
        <Input
          placeholder="Filtrar por ID"
          value={filterValues.id}
          onChange={(e) => handleFilterChange('id', e.target.value)}
          className="max-w-sm"
        />

        {/* Instrument Filter */}
        <Input
          placeholder="Filtrar por Instrumento"
          value={filterValues.instrument}
          onChange={(e) => handleFilterChange('instrument', e.target.value)}
          className="max-w-sm"
        />

        {/* Side Filter */}
        <div className="flex items-center gap-2">
          <Select
            onValueChange={(value) => filterBySide(value)}
            value={filterValues.side}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione Lado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Compra</SelectItem>
              <SelectItem value="2">Venda</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={clearSideFilter} variant={'ghost'}>
            Limpar
          </Button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Select
            onValueChange={(value) => filterByStatus(value)}
            value={filterValues.status}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Aberta</SelectItem>
              <SelectItem value="executed">Executada</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={clearStatusFilter} variant={'ghost'}>
            Limpar
          </Button>
        </div>

        {/* Date Filter */}
        <Input
          type="date"
          value={filterValues.createDate}
          onChange={(e) => handleFilterChange('createDate', e.target.value)}
          className="max-w-sm"
        />
      </div>
    </div>
  )
}

export default DataGridFilter
