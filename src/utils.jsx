import { formatDistanceToNow } from 'date-fns'

export const formatTimeDifference = (created) => {
  const distance = formatDistanceToNow(new Date(created), { addSuffix: true })
  return `created ${distance}`
}
