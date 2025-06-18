export function useFilter(store, getList) {
  return (filters) => {
    if (filters === null || filters === undefined) {
      store.$reset()
      getList()
      return
    }

    for (const key in filters) {
      store.setQueryFilter(key, filters[key])
    }

    getList()
  }
}
