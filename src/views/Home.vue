<template>
  <div class="home">
    <v-container>
      <v-card
        class="ma-1"
        v-bind:key="entity.entity_id"
        v-for="entity in getEntities"
      >
        <v-row class="text-left ma-2">
          <v-col>
            {{ entity.entity_id }}
          </v-col>
          <div v-if="entSplit(entity.entity_id)">
            <v-btn @click="toggle(entity.entity_id)">
              click me!
            </v-btn>
          </div>
          <v-col>
            {{ entity.state }}
          </v-col>
        </v-row>
      </v-card>
      <v-card> </v-card>
    </v-container>
  </div>
</template>

<script>
import { callService } from "home-assistant-js-websocket";
export default {
  name: "Home",

  methods: {
    toggle(entId) {
      callService(this.$store.state.connection, "homeassistant", "toggle", {
        entity_id: entId,
      });
    },
        entSplit (entId) {
      return ["switch", "light", "input_boolean"].includes(
        entId.split(".", 1)[0]
        
      );
    },
  },
  computed: {
    getEntities() {
      return this.$store.getters.entities;
    },
  },
};
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
