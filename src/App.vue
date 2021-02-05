<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      Hassio
    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from '@/views/Home.vue';
export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
  async created(){
   this.$store.dispatch('signIn');
  }
};
</script>
