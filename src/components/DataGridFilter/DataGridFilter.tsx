import { Table } from '@tanstack/react-table'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useEffect, useState } from 'react'
import { useOrderBy } from '@/hooks/useOrderBy'
import { Button } from '../ui/button'
import DatePicker from '../DatePicker/DatePicker'
import { IOrderFilter } from '@/interfaces/order'
import { useOrders } from '@/hooks/useOrders'
import { FaBroom } from 'react-icons/fa'

interface IDataGridFilter {
  setGlobalFilter: (value: string) => void
  table: Table<any>
}

const DataGridFilter = ({ setGlobalFilter, table }: IDataGridFilter) => {
  const [filterValues, setFilterValues] = useState<IOrderFilter>({
    id: '',
    instrument: '',
    side: 0,
    status: '',
    createdAt: '',
  })

  const { executeFilters } = useOrderBy()
  const { refetch } = useOrders({ limit: 5, page: 1 })

  const [debouncedFilters, setDebouncedFilters] = useState(filterValues)

  useEffect(() => {
    const handler = setTimeout(() => {
      executeFilters(debouncedFilters)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [debouncedFilters])

  const handleFilterChange = (column: string, value: string) => {
    setFilterValues((prev) => {
      let newValue: string | number
      newValue = value
      if (column === 'side') {
        newValue = Number(value)
      }
      const updatedFilters = { ...prev, [column]: newValue }
      setDebouncedFilters(updatedFilters)
      return updatedFilters
    })
    table.getColumn(column)?.setFilterValue(value)
  }

  const clearFilter = (column: string) => {
    setFilterValues((prev) => {
      const updatedFilters = { ...prev, [column]: column === 'side' ? 0 : '' }
      setDebouncedFilters(updatedFilters)
      return updatedFilters
    })
    table.getColumn(column)?.setFilterValue('')
  }

  const clearAllFilters = () => {
    const cleanFilters = {
      id: '',
      instrument: '',
      side: 0,
      status: '',
      createdAt: '',
    }
    setFilterValues(() => {
      const updatedFilters = { ...cleanFilters }
      setDebouncedFilters(updatedFilters)
      return updatedFilters
    })
    refetch()
    table.resetColumnFilters()
  }

  const [date, setDate] = useState<Date>()

  useEffect(() => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]
      setFilterValues((prev) => {
        const updatedFilters = { ...prev, createdAt: formattedDate }
        setDebouncedFilters(updatedFilters)
        return updatedFilters
      })
    }
  }, [date])

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Global Filter */}
      <div className="flex justify-between gap-4">
        <Input
          placeholder="Digite para filtrar..."
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        <Button onClick={() => clearAllFilters()} variant={'secondary'}>
          Limpar todos filtros
        </Button>
      </div>

      <hr />

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
        <div className="flex items-center gap-1">
          <Select
            onValueChange={(value) => handleFilterChange('side', value)}
            value={filterValues.side?.toString() ?? ''}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Compra/Venda">
                {Number(filterValues.side) === 1
                  ? 'Compra'
                  : Number(filterValues.side) === 2
                    ? 'Venda'
                    : 'Compra/Venda'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Compra</SelectItem>
              <SelectItem value="2">Venda</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => clearFilter('side')} variant={'secondary'}>
            <FaBroom />
          </Button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1">
          <Select
            onValueChange={(value) => handleFilterChange('status', value)}
            value={filterValues.status}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Selecione Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Aberta</SelectItem>
              <SelectItem value="executed">Executada</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => clearFilter('status')} variant={'secondary'}>
            <FaBroom />
          </Button>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-1">
          <DatePicker date={date} setDate={setDate} />
          <Button
            onClick={() => {
              setDate(undefined)
              clearFilter('createdAt')
            }}
            variant={'secondary'}
          >
            <FaBroom />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataGridFilter
