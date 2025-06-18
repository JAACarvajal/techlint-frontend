import { toCamelCase } from '@/utils'

export function useSort(store, getList) {
  return (key) => {
    const formattedKey = toCamelCase(key)
    const currentSort = store.query.sort.split(',')
    const isDescending = currentSort.includes('-' + formattedKey)
    const updatedSort = currentSort.filter(
      (item) => item !== formattedKey && item !== '-' + formattedKey,
    )
    const newSortKey = isDescending ? formattedKey : '-' + formattedKey
    updatedSort.unshift(newSortKey)
    store.setQuerySort(updatedSort.join(','))
    getList()
  }
}
