<template>
  <div class="home">
    <v-container>
    <v-card class="ma-1" v-bind:key="entity.entity_id" v-for='entity in getEntities'>
      <v-row class="text-left ma-2">
      <v-col>
        {{entity.entity_id}}
      </v-col>
      <v-col>
        {{entity.state}}
      </v-col>
      </v-row>
    </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed:{
    getEntities(){
      return this.$store.getters.entities
    }
  }
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
* {
  margin: 0;
}
</style>