export function useFilter(store, getList) {
  return async (filters, rowItems) => {
    store.$reset()
    store.setQueryRows(rowItems)

    if (filters === null || filters === undefined) {
      await getList()
      return
    }

    for (const key in filters) {
      store.setQueryFilter(key, filters[key])
    }

    await getList()
  }
}
