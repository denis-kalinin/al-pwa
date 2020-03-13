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
    <v-btn icon large :to="{ name: 'about' }" >
      <v-avatar size="32px" item>
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        /></v-avatar>
    </v-btn>
    <!-- firestore -->
    <v-tooltip bottom v-if="isFirestoreAuthenticated">
      <template v-slot:activator="{ on }">
        <v-btn v-if="isFirestoreAuthenticated" icon v-on="on" @click="logout()">
          <v-icon>mdi-fire</v-icon>
        </v-btn>
      </template>
      <span>Username: {{ firestoreUsername }}</span>
    </v-tooltip>
    <v-tooltip bottom v-if="isFirestoreAuthenticated">
      <template v-slot:activator="{ on }">
        <v-btn v-if="isFirestoreAuthenticated" icon v-on="on" @click="setStaleToken()">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>
      <span>Set stale token</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
// import AuthenticationStateModule from '@/store/modules/auth';
import firestoreUserService from '@/firestore';
import FirestoreAuthState from '@/firestore/FirestoreAuthState';
import FirestoreApi from '../../firestore/api/FirestoreApi';
@Component({
  name: 'AlAppHeader',
})
export default class AppHeader extends Vue {
  // private authState!: AuthenticationStateModule;

  private userService = firestoreUserService;


  private firestoreState: FirestoreAuthState = getModule(FirestoreAuthState, this.$store);

  private staleToken: string = [
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNiOGUwZDk3Mjg2MWIwNGJlN2RjNzVhMWIzYmUzYjIyOWIyNWYyMDUiLCJ0eXAiO',
    'iJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWwtcHdhLWZpcmViYXNlIiwiYXVkIjo',
    'iYWwtcHdhLWZpcmViYXNlIiwiYXV0aF90aW1lIjoxNTgyNTQ1MjY4LCJ1c2VyX2lkIjoidDEyc2g0WmxITE5pNjc0R1hj',
    'MUwzeUswTDBBMiIsInN1YiI6InQxMnNoNFpsSExOaTY3NEdYYzFMM3lLMEwwQTIiLCJpYXQiOjE1ODI1NDUyNjgsImV4c',
    'CI6MTU4MjU0ODg2OCwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYm',
    'FzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZXhhbXBsZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJ',
    'wYXNzd29yZCJ9fQ.fcYbwKkf3eYqBxdyn72f8nyMSZP7k7x9mS4eQFG7y7BW3Qt7u6kv5QlGcN_wVlCIcLQk2eWLr1x2J',
    '1YhYSzGmstdyhU_BHXUrEgJkOp3iH-wZGVcftPaXfu0s3fccyFrLQBgHomPBoITOw_G3ywS43nUi25XeX1gdvoefhQS1Q',
    '6-k1ehJo3ZdV2RZjJX5i44zNOoYeAa1dzw2IOWYrfeFKWx1T0mm0B2RGGgSazLhI-U94YhzJUifoVayF8MBriKtoxRWSQ',
    'HWemj4ALz0G-XJzWLl8h-uEJtzgTH028Rw79mqIou5wGcq5HASQNfN24nVVDbdfb9LAuW_mfvY3_xgg',
  ].join('');


  // created() {
  // this.authState = getModule(AuthenticationStateModule, this.$store);
  // }

  get isFirestoreAuthenticated(): boolean {
    return this.firestoreState.userData.signedIn;
  }

  get firestoreUsername() : string | undefined {
    return this.firestoreState.userData.userDetails?.displayName;
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

  setStaleToken() {
    FirestoreApi.removeAuthentication();
    FirestoreApi.addAuthentication(this.staleToken);
  }
}
</script>
