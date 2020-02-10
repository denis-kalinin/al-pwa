<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-app-bar-nav-icon @click.stop="$root.$emit('drawer')" />
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4"
    >
      <span class="hidden-sm-and-down">Google Contacts</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
    />
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn
      icon
      large
    >
      <v-avatar
        size="32px"
        item
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        /></v-avatar>
    </v-btn>
    <v-btn v-if="isAuthenticated" icon>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
    <v-btn v-else icon :to="{ name: 'login'}">
      <v-icon>mdi-location-enter</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import AuthenticationStateModule from '@/store/modules/auth';
@Component({
  name: 'AlAppHeader',
})
export default class AppHeader extends Vue {
  private authState!: AuthenticationStateModule

  created() {
    this.authState = getModule(AuthenticationStateModule, this.$store);
  }

  get isAuthenticated(): boolean {
    return this.authState.authenticated;
  }
}
</script>
