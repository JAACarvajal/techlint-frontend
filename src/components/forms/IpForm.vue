<template>
  <form v-if="isShow" @submit.prevent="onSubmit">
    <label for="address">Address:</label>
    <input
      type="text"
      placeholder="Address"
      :value="form.address"
      @input="updateField('address', $event.target.value)"
    /><br />

    <label for="label">Label:</label>
    <input
      type="text"
      placeholder="Label"
      :value="form.label"
      @input="updateField('label', $event.target.value)"
    /><br />

    <label for="comment">Comment:</label>
    <input
      type="text"
      placeholder="Comment"
      :value="form.comment"
      @input="updateField('comment', $event.target.value)"
    /><br />

    <button type="submit">{{ submitText }}</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  form: Object,
  onSubmit: Function,
  submitText: {
    type: String,
    default: 'Submit',
  },
  isShow: {
    type: Boolean,
    default: true,
  },
})

const form = ref({ ...props.form })

watch(
  () => props.form,
  (newForm) => {
    form.value = { ...newForm }
  },
  { deep: true },
)

const emit = defineEmits(['update:form'])

function updateField(field, value) {
  form.value[field] = value
  emit('update:form', { ...form.value })
}
</script>
