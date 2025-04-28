import { PropsWithChildren } from 'react'
import DOMPurify from 'dompurify'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Dialog } from '@radix-ui/react-dialog'

interface IDialog extends PropsWithChildren {
  title?: string
  subtitle?: string
  open: boolean
  onClose: () => void
}

const DialogModal = ({ title, subtitle, open, onClose, children }: IDialog) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-h-48">
        <DialogHeader>
          {title && (
            <DialogTitle
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
            />
          )}
        </DialogHeader>
        <DialogDescription>
          {subtitle && (
            <span
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subtitle) }}
            />
          )}
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}
export default DialogModal
