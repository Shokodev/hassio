<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        Hassio
        </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn icon
        @click="confirmLogout = true"
        >
             <v-icon>mdi-export</v-icon>
        </v-btn>
    </v-app-bar>
    <v-main>
    <router-view />
    </v-main>
    <Confirm
      v-if="confirmLogout"
      :showDialog="confirmLogout"
      @confirm="logout($event)"
    />
  </v-app>
</template>

<script>
import Confirm from '@/components/Confirm.vue';

export default {
  name: 'App',
  components: {
    Confirm,
  },
  data: () => ({
    confirmLogout: false,
  }),
  methods:{
    logout(confirm) {
      if (confirm) {
        this.$store.dispatch('signOut');
      }
      this.confirmLogout = false;
    },
  },
  async created(){
   this.$store.dispatch('signIn');
  }, 
};
</script>
