<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
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
import Authentication from './Authentication';
import loginPasswordAuthProvider from './LoginPasswordProvider';

@Component({
  name: 'LoginFormCentered',
})
export default class LoginFormCentered extends Vue {
  email: string = 'test@example.com';

  password: string = 'qwerty';

  sendAuthentication() {
    Authentication.authenticate(this.email, this.password, loginPasswordAuthProvider)
      .then((response) => {
        console.log('Token', response.data.idToken);
      });
  }
}
</script>
