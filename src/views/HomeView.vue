<template>
  <div class="home">
    <Dialog/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    Dialog: () => import('./Dialog.vue')
  }
}
</script>
