import { defineStore } from 'pinia'

export const useAuditLogStore = defineStore('auditLog', {
  state: () => ({
    list: {
      data: [],
      links: {},
      meta: {},
    },
    query: {
      page: 1,
      filter: {
        action: null,
        actorUserId: null,
        targetType: null,
        targetId: null,
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
    setQuerySort(value) {
      this.query.sort = value
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
