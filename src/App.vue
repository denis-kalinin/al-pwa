<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>AL PWA</v-toolbar-title>
      <v-spacer></v-spacer>
      <offline-message></offline-message>
    </v-app-bar>
    <v-content>
      <login-form-centered></login-form-centered>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import LoginFormCentered from '@/components/LoginFormCentered.vue';
import OfflineMessage from '@/components/OfflineMessage.vue';


@Component({
  name: 'App',
  components: {
    LoginFormCentered,
    OfflineMessage,
  },
})
export default class App extends Vue {}
</script>
