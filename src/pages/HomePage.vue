<template>
  <div>
    <nav>
      <button type="submit" @click.prevent="submit">Logout</button>
    </nav>

    <div>
      <h1>IP management list</h1>
      <div>
        <form @submit.prevent="addIpAddress">
          <label for="address">Address:</label>
          <input type="text" placeholder="Address" v-model="addIpForm.address" /><br />
          <label for="label">Label:</label>
          <input type="text" placeholder="Label" v-model="addIpForm.label" /><br />
          <label for="comment">Comment:</label>
          <input type="text" placeholder="Comment" v-model="addIpForm.comment" /><br />
          <button type="submit">Add</button>
        </form>
      </div>

      <div v-if="onEdit">
        <form @submit.prevent="editIpAddress">
          <label for="address">Address:</label>
          <input type="text" placeholder="Address" v-model="updateIpForm.address" /><br />
          <label for="label">Label:</label>
          <input type="text" placeholder="Label" v-model="updateIpForm.label" /><br />
          <label for="comment">Comment:</label>
          <input type="text" placeholder="Comment" v-model="updateIpForm.comment" /><br />
          <button type="submit">Update</button>
        </form>
      </div>
      <table>
        <tr>
          <th>IP address</th>
          <th>Label</th>
          <th>Comments</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
        <tr v-for="ip in ipManagementStore.list.data" :key="ip.id">
          <td>{{ ip.attributes.address }}</td>
          <td>{{ ip.attributes.label }}</td>
          <td>{{ ip.attributes.comment }}</td>
          <td>{{ ip.attributes.created_at }}</td>
          <td>{{ ip.attributes.updated_at }}</td>
          <td>
            <div>
              <button type="button" @click.prevent="toggleOnEdit(ip.id)">Edit</button>
              <button
                v-if="authStore.user.attributes.is_admin"
                type="button"
                @click.prevent="deleteIpAddress(ip.id)"
              >
                Remove
              </button>
            </div>
          </td>
        </tr>
      </table>
      <div class="pagination">
        <a
          v-for="(page, index) in ipManagementStore.list.meta.links"
          :key="index"
          style="padding: 0 10px"
          href="#"
          @click.prevent="getIpManagementList(getPage(page.url))"
          v-html="page.label"
        >
        </a>
      </div>
    </div>

    <div v-if="authStore.user.attributes.is_admin">
      <h1>Audit Logs</h1>
      <table>
        <tr>
          <th></th>
          <th>Label</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { check, logout } from '@/services/authService'
import { createIp, deleteIp, listIp, updateIp } from '@/services/ipManagementService'
import { useAuthStore } from '@/stores/auth'
import { useIpManagementStore } from '@/stores/ipAddress'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const ipManagementStore = useIpManagementStore()
const router = useRouter()
const addIpForm = ref({
  address: '',
  label: '',
  comment: '',
})

const updateIpForm = ref({
  address: '',
  label: '',
  comment: '',
})

const onEdit = ref(false)
const onEditId = ref(null)

function resetAddForm() {
  addIpForm.value = {
    address: '',
    label: '',
    comment: '',
  }
}

function resetUpdateForm() {
  updateIpForm.value = {
    address: '',
    label: '',
    comment: '',
  }
}

function toggleOnEdit(id) {
  onEdit.value = !onEdit.value
  onEditId.value = id
}

function getPage(url) {
  return new URL(url).searchParams.get('page')
}

async function submit() {
  try {
    await logout()
    localStorage.removeItem('token')
    authStore.setAuthenticated(false)
    authStore.setUser(null)
    router.push('/login')
  } catch (err) {
    alert('Logout failed: ' + err)
  }
}

async function getIpManagementList(page = 1) {
  const queryParams = {
    page: page,
    filter: {},
    sort: '-createdAt',
  }

  if (authStore.user?.attributes?.is_admin === false) {
    queryParams.filter.userId = authStore.user.id
  }

  try {
    const response = await listIp(queryParams)
    resetAddForm()
    resetUpdateForm()
    ipManagementStore.setList(response)
  } catch (err) {
    alert('Failed to get IP list: ' + err)
  }
}

async function checkToken() {
  if (!localStorage.getItem('token')) {
    router.push('/login')
  }
}

async function getAuthUser() {
  try {
    const response = await check()
    authStore.setUser(response.data)
  } catch (err) {
    alert('Failed to get user: ' + err)
  }
}

async function addIpAddress() {
  const additionalData = {
    user_id: authStore.user.id,
  }

  try {
    await createIp({ ...addIpForm.value, ...additionalData })

    await getIpManagementList()
  } catch (err) {
    alert('Failed to get user: ' + err)
  }
}

async function editIpAddress() {
  try {
    await updateIp(onEditId.value, updateIpForm.value)

    await getIpManagementList()
  } catch (err) {
    alert('Failed to get user: ' + err)
  }
}

async function deleteIpAddress(id) {
  try {
    await deleteIp(id)

    await getIpManagementList()
  } catch (err) {
    alert('Failed to get user: ' + err)
  }
}

async function init() {
  checkToken()
  await getAuthUser()
  await getIpManagementList()
}

onMounted(() => {
  init()
})
</script>
