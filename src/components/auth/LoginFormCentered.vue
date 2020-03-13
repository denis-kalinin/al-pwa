<template>
  <v-container class="fill-height" fluid>
    <p v-if="isAuthenticated" v-text="idToken"></p>
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
import { getModule } from 'vuex-module-decorators';
// import { namespace } from 'vuex-class';
import AuthenticationStateModule from '../../store/modules/auth';
import Authentication from './Authentication';
import loginPasswordAuthProvider from './LoginPasswordProvider';

// const auth = namespace('authentication');

@Component({
  name: 'LoginFormCentered',
})
export default class LoginFormCentered extends Vue {
  readonly email: string = 'test@example.com';

  readonly password: string = 'qwerty';

  private authState!: AuthenticationStateModule;

  created() {
    this.authState = getModule(AuthenticationStateModule, this.$store);
  }

  // private authState = AuthenticationStateModule;

  // @auth.State
  // public idToken?: string;
  get idToken() {
    return this.authState.idToken;
  }

  public sendAuthentication() {
    Authentication.authenticate(this.email, this.password, loginPasswordAuthProvider);
  }

  // @auth.Action
  // public updateIdToken!: (idToken : string) => void;

  get isAuthenticated() {
    return this.authState.authenticated;
  }
}
</script>
