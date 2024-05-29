import { useToast } from 'primevue/usetoast'

export const alertSuccess = (message) => {
  const toast = useToast()

  toast.add({ severity: 'success', summary: message, life: 3000 })
}

export const alertInfo = (message) => {
  const toast = useToast()

  toast.add({ severity: 'info', summary: message, life: 3000 })
}

export const alertWarn = (message) => {
  const toast = useToast()

  toast.add({ severity: 'warn', summary: message, life: 3000 })
}

export const alertError = (message) => {
  const toast = useToast()

  toast.add({ severity: 'error', summary: message, life: 3000 })
}
