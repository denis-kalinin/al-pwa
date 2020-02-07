<template>
  <v-container class="fill-height" fluid>
    <p v-if="authenticationState.idToken" v-text="authenticationState.idToken"></p>
    <v-row align="center" justify="center" v-else>
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12"><v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot>
                <v-icon>mdi-code-tags</v-icon>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/pMvGQO"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="E-mail"
                name="email"
                prepend-icon="person"
                type="text"
                v-model="email"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="sendAuthentication">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Authentication from './Authentication';
import loginPasswordAuthProvider from './LoginPasswordProvider';

@Component({
  name: 'LoginFormCentered',
  computed: {
    ...mapGetters({
      authenticationState: 'authenticationState',
    }),
  },
  watch: {
    authenticationState(newValue, oldValue) {
      console.log('new value', newValue, oldValue);
    },
  },
})
export default class LoginFormCentered extends Vue {
  readonly email: string = 'test@example.com';

  readonly password: string = 'qwerty';

  token: string | boolean = false;
  /*
  created() {
    this.$store.watch(
      (state) => {
        console.log('Watch');
        return state.jwt;
      },
      (newValue, oldValue) => {
        console.log(`Updating from ${oldValue} to ${newValue}`);
        this.token = newValue;
      },
    );
  }
  */

  sendAuthentication() {
    Authentication.authenticate(this.email, this.password, loginPasswordAuthProvider)
      .then((response) => {
        this.$store.dispatch('jwt', response.data?.idToken);
      });
  }
}
</script>
