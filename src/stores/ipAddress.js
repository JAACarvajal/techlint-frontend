import { defineStore } from 'pinia'

export const useIpManagementStore = defineStore('ipManagement', {
  state: () => ({
    list: {
      data: [],
      links: {},
      meta: {},
    },
    query: {
      page: 1,
      filter: {
        userId: null,
        address: null,
        label: null,
        comment: null,
        createdAt: null,
        updatedAt: null,
      },
      sort: '-createdAt',
    },
  }),
  actions: {
    setList(value) {
      this.list = value
    },
    setQuery(value) {
      this.query = value
    },
    setQueryPage(value) {
      this.query.page = value
    },
    setQueryFilter(filter, value) {
      this.query.filter[filter] = value
    },
  },
})
