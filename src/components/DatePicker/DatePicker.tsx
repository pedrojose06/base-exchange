'use client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

interface IDataPicker {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

const DatePicker = ({ date, setDate }: IDataPicker) => {
  const [isOpen, setIsOpen] = useState(false) // State to control Popover visibility

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setIsOpen(false) // Close the Popover after selecting a date
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'dd/MM/yyyy', { locale: ptBR })
          ) : (
            <span>Escolha uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect} // Use the handler to set the date and close the Popover
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
