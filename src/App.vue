<template>
  <div>
      <RouterView />
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$router.push('/login')
    }
  }
</script>
