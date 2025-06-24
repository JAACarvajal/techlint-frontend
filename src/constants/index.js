export const AUDIT_LOG_TABLE_HEADERS = [
  { label: 'Actor User ID', key: 'actor_user_id' },
  { label: 'Action', key: 'action' },
  { label: 'Target Type', key: 'target_type' },
  { label: 'Target ID', key: 'target_id' },
  { label: 'Changes', key: 'changes' },
  { label: 'Created At', key: 'created_at' },
]

export const AUDIT_LOG_SEARCH_OPTIONS = [
  { label: 'Target ID', value: 'targetId' },
  { label: 'Target Type', value: 'targetType' },
  { label: 'Actor User ID', value: 'actorUserId' },
  { label: 'Action', value: 'action' },
]

export const IP_MANAGEMENT_TABLE_HEADERS = [
  { label: 'ID', key: 'id' },
  { label: 'IP address', key: 'address' },
  { label: 'User ID', key: 'user_id' },
  { label: 'Label', key: 'label' },
  { label: 'Comments', key: 'comment' },
  { label: 'Created At', key: 'created_at' },
  { label: 'Updated At', key: 'updated_at' },
]

export const IP_MANAGEMENT_SEARCH_OPTIONS = [
  { label: 'ID', value: 'id' },
  { label: 'Address', value: 'address' },
  { label: 'Label', value: 'label' },
  { label: 'Comment', value: 'comment' },
  { label: 'User ID', value: 'userId' },
]

export const DATE_SEARCH_OPTIONS = [
  { label: 'Created At', value: 'createdAt' },
  { label: 'Updated At', value: 'updatedAt' },
]

export const LEFT_ALIGNED_COLUMNS = ['comment', 'label', 'changes']

export const ITEMS_PER_PAGE = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
]

export const IP_MANAGEMENT_FORM_MAPPER = {
  add: {
    success_message: 'Successfully created an IP address',
    button_text: 'Add',
    form_title: 'Add IP address',
  },
  update: {
    success_message: 'Successfully updated an IP address',
    button_text: 'Update',
    form_title: 'Update IP address',
  },
  delete: {
    success_message: 'Successfully deleted an IP address',
    button_text: 'Confirm Delete',
    form_title: 'Delete IP address',
  },
}

export const USER_AUDIT_LOG_MAPPER = {
  login: {
    description: 'User has logged in',
  },
  logout: {
    description: 'User has logged out',
  },
}

export const IP_ADDRESS_AUDIT_LOG_MAPPER = {
  create: {
    description: 'User has <strong class="text-green-500">created</strong> an IP address',
  },
  update: {
    description: 'User has <strong class="text-blue-500">updated</strong> an IP address',
  },
  delete: {
    description: 'User has <strong class="text-red-500">deleted</strong> an IP address',
  },
}
