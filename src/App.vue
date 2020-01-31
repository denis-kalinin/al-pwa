<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title><router-link to="/" class="invertlink">
        AL PWA
      </router-link></v-toolbar-title>
      <v-btn to="/about">About</v-btn>
      <v-btn to="/fetchExample">Fetch Example</v-btn>
      <v-btn to="/tableList">TableList</v-btn>
      <v-spacer></v-spacer>
      <offline-message></offline-message>
    </v-app-bar>
    <v-content>
      <router-view />
      <!--
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
      -->
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import OfflineMessage from '@/components/OfflineMessage.vue';


@Component({
  name: 'App',
  components: {
    OfflineMessage,
  },
})
export default class App extends Vue {}
</script>

<style scoped>
  .invertlink {
    color: #fff;
  }
</style>
