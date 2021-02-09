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
          <v-col>
            <v-btn @click="collection(entity)">
              Show history
            </v-btn>
          </v-col>
          <v-col v-if="entSplit(entity.entity_id)">
            <v-btn @click="toggle(entity.entity_id)">
              click me!
            </v-btn>
          </v-col>
          <v-col>
            {{ entity.state }}
          </v-col>
        </v-row>
      </v-card>
      <v-dialog
        v-model="historyView"
        v-if="historyView"
        persistent
        max-width="80%"
      >
      <v-card>
        <v-card-title>History last 24h of {{historyData.name}}
          <v-spacer></v-spacer>
          <v-btn class="warning" @click="historyView = false">close</v-btn>
        </v-card-title>
        <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Value
              </th>
              <th class="text-left">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in historyData[0]"
              :key="item.entity_id"
            >
              <td>{{ item.state + " " + historyData.unit}}</td>
              <td>{{ new Date(item.last_changed).toUTCString() }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { 
  callService,
} from "home-assistant-js-websocket";
import History from "../history";
export default {
  name: "Home",
  data(){
    return {
      historyView: false,
      historyData:[]
    }
  },
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
    async collection(entity){
      this.historyView = true
      let today = new Date();
      let from = new Date(new Date().setDate(new Date().getDate() - 1));
      this.historyData = await History.getHistoryData(from.toISOString(),today.toISOString(),entity.entity_id);
      this.historyData.unit = entity.attributes.unit_of_measurement || "" 
      this.historyData.name = entity.attributes.friendly_name
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
