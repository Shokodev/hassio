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
            <v-btn @click="loadCollection(entity)">
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
        max-width="90%"
      >
        <v-card v-if="historyData">
          <v-card-title
            >History last 24h of {{ historyData.name }}
            <v-spacer></v-spacer>
            <v-btn class="warning" @click="closeHistoryView()">close</v-btn>
          </v-card-title>
          <div class="ma-2 justify-center">
            <ApexDateTimeChart v-if="historyData" width="80%" :unit="historyData.unit" :chartdata="historyData.data"></ApexDateTimeChart>  
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { callService } from "home-assistant-js-websocket";
import ApexDateTimeChart from '@/components/ApexDateTimeChart.vue';

export default {
  name: "Home",
  components: {
    ApexDateTimeChart,
   },
  data() {
    return {
      historyView: false,
      historyData: {
        data: [],
        name: "",
        unit: "",
      },
    };
  },
  methods: {
    toggle(entId) {
      callService(this.$store.state.connection, "homeassistant", "toggle", {
        entity_id: entId,
      });
    },
    entSplit(entId) {
      return ["switch", "light", "input_boolean"].includes(
        entId.split(".", 1)[0]
      );
    },
    async loadCollection(entity) {
      this.historyData = null
      let today = new Date();
      let from = new Date(new Date().setHours(new Date().getHours() - 12));
      await this.$store.state.historyDataManager.getHistoryData(
        from.toISOString(),
        today.toISOString(),
        entity.entity_id,
        {
          chartLibrary:"apex",
        },(data)=>{
          this.historyData = data
        });
        this.historyView = true;
        console.log(this.historyData);
      
    },
    closeHistoryView() {
      this.historyData = null,
      this.historyView = false;
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
