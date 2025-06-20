export const AUDIT_LOG_TABLE_HEADERS = [
  { label: 'Actor User ID', key: 'actor_user_id' },
  { label: 'Action', key: 'action' },
  { label: 'Target Type', key: 'target_type' },
  { label: 'Target ID', key: 'target_id' },
  { label: 'Created At', key: 'created_at' },
  { label: 'Updated At', key: 'updated_at' },
]

export const AUDIT_LOG_SEARCH_OPTIONS = [
  { label: 'Target ID', value: 'targetId' },
  { label: 'Actor User ID', value: 'actorUserId' },
]

export const IP_MANAGEMENT_TABLE_HEADERS = [
  { label: 'IP address', key: 'address' },
  { label: 'User ID', key: 'user_id' },
  { label: 'Label', key: 'label' },
  { label: 'Comments', key: 'comment' },
  { label: 'Created At', key: 'created_at' },
  { label: 'Updated At', key: 'updated_at' },
]

export const IP_MANAGEMENT_SEARCH_OPTIONS = [
  { label: 'Filter By Column', value: '', disabled: true },
  { label: 'Address', value: 'address' },
  { label: 'Label', value: 'label' },
  { label: 'Comment', value: 'comment' },
  { label: 'User ID', value: 'userId' },
]

export const DATE_SEARCH_OPTIONS = [
  { label: 'Filter By Date', value: '', disabled: true },
  { label: 'Created At', value: 'createdAt' },
  { label: 'Updated At', value: 'updatedAt' },
]
