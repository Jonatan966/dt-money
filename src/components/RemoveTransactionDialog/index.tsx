import { toast } from 'react-toastify'
import { FiX } from 'react-icons/fi'
import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'

import { useTransactions } from 'hooks/useTransactions'
import { Button } from 'components/Button'

import { Container } from './styles'

interface RemoveTransactionDialogProps {
  isOpen: boolean
}

export function RemoveTransactionDialog({
  isOpen,
}: RemoveTransactionDialogProps) {
  const {
    handleToggleRemoveTransactionDialog,
    removeTransaction,
    selectedTransaction,
  } = useTransactions()
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsRemoving(false)
    }
  }, [isOpen])

  async function handleRemoveTransaction(event: FormEvent) {
    event.preventDefault()

    setIsRemoving(true)
    const removalPromise = removeTransaction()

    try {
      await toast.promise(removalPromise, {
        pending: 'Removendo transação. . .',
        success: 'Transação removida com sucesso!',
        error: 'Não foi possível remover essa transação',
      })

      handleToggleRemoveTransactionDialog()
    } catch {
      setIsRemoving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => handleToggleRemoveTransactionDialog()}
      shouldCloseOnEsc={!isRemoving}
      shouldCloseOnOverlayClick={!isRemoving}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content ${
        !isOpen ? 'react-modal-closing' : 'react-modal-opening'
      }`}
      closeTimeoutMS={500}
    >
      <button
        type="button"
        onClick={() => handleToggleRemoveTransactionDialog()}
        className="react-modal-close"
        disabled={isRemoving}
      >
        <FiX size={24} />
      </button>

      <Container onSubmit={handleRemoveTransaction}>
        <h2>Remover transação</h2>
        <p>
          Deseja mesmo remover a transação "
          <strong>{selectedTransaction?.title}</strong>"?
        </p>

        <div className="actions">
          <Button
            type="button"
            onClick={() => handleToggleRemoveTransactionDialog()}
            backgroundColor="green"
            height="4rem"
            textColor="#fff"
            disabled={isRemoving}
          >
            Não
          </Button>
          <Button
            type="submit"
            backgroundColor="trashBg"
            height="4rem"
            textColor="#fff"
            isLoading={isRemoving}
          >
            Remover
          </Button>
        </div>
      </Container>
    </Modal>
  )
}
