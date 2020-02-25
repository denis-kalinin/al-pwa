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
      <span class="hidden-sm-and-down">My Dashboard</span>
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
    <v-btn icon :to="{ name: 'home' }">
      <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon large :to="{ name: 'about' }" >
      <v-avatar size="32px" item>
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        /></v-avatar>
    </v-btn>
    <!-- firestore -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-if="isFirestoreAuthenticated" icon v-on="on" @click="logout()">
          <v-icon>mdi-fire</v-icon>
        </v-btn>
        <v-btn v-else icon>
          <v-icon>mdi-location-enter</v-icon>
        </v-btn>
      </template>
      <span>Username: {{ firestoreUsername }}</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
// import AuthenticationStateModule from '@/store/modules/auth';
import firestoreUserService from '@/firestore';
import FirestoreAuthState from '@/firestore/FirestoreAuthState';
@Component({
  name: 'AlAppHeader',
})
export default class AppHeader extends Vue {
  // private authState!: AuthenticationStateModule;

  private userService = firestoreUserService;


  private firestoreState: FirestoreAuthState = getModule(FirestoreAuthState, this.$store);


  // created() {
  // this.authState = getModule(AuthenticationStateModule, this.$store);
  // }

  get isFirestoreAuthenticated(): boolean {
    return !!this.firestoreState.userDetails.email || !!this.firestoreState.userDetails.nickname;
  }

  get firestoreUsername() : string | undefined {
    return this.firestoreState.username;
  }
  /*
  get isAuthenticated(): boolean {
    return this.authState.authenticated;
  }
  */

  logout() {
    // this.authState.updateIdToken();
    // this.authState.updateRefreshToken();
    // this.$router.push({ name: 'home' });
    this.userService.logout(true);
    this.$router.push({ name: 'home' });
  }
}
</script>
