<template>
  <v-app class="d-print-none">
    <HeaderBar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    HeaderBar
}, 
  data: () => ({
    //
  }),
}
</script>
