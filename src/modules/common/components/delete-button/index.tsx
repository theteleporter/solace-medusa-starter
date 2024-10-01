import { useState } from 'react'

import { deleteLineItem } from '@lib/data/cart'
import { Spinner, Trash } from '@medusajs/icons'
import { clx } from '@medusajs/ui'

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={clx(
        'text-small-regular flex items-center justify-between',
        className
      )}
    >
      <button
        className="flex cursor-pointer gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        {children && <span>{children}</span>}
      </button>
    </div>
  )
}

export default DeleteButton
