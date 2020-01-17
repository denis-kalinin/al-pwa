<template>
    <v-layout justify-center v-if="!online">
      <v-alert type="error">Hey! Your are offline!</v-alert>
    </v-layout>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'OfflineMessage',
})
export default class OfflineMessage extends Vue {
  private onlineStatus : Boolean = true;

  get online(): Boolean {
    return this.onlineStatus;
  }

  created() {
    if (!this.$isServer) {
      this.onlineStatus = navigator.onLine;
      window.addEventListener('online', () => {
        this.onlineStatus = true;
      });
      window.addEventListener('offline', () => {
        this.onlineStatus = false;
      });
    }
  }
}
</script>
