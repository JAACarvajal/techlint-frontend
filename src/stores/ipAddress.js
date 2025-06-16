import { defineStore } from 'pinia'

export const useIpManagementStore = defineStore('ipManagement', {
  state: () => ({
    list: {
      data: [],
      links: {},
      meta: {},
    },
  }),
  actions: {
    setList(value) {
      this.list = value
    },
  },
})
