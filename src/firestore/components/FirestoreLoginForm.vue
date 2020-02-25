<template>
  <v-dialog v-model="authRequired" persistent max-width="500px">
    <v-card>
      <v-card-title>Firebase Login Form</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[v => !!v || 'Email is required']"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            :rules="[v => !!v || 'Password is required']"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="sendAuthentication();">Login</v-btn>
        <v-btn color="blue darken-1" text @click="sendAuthentication(false);">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import EventBus from '@/services/eventbus';
import '@/firestore';

@Component({
  name: 'FirestoreLoginForm',
})
export default class LoginForm extends Vue {
  email?:string = 'test@example.com';

  password?:string = 'qwerty';

  private authReq : boolean = false;

  get authRequired(): boolean {
    return this.authReq;
  }

  sendAuthentication(doAuthentication:boolean = true) {
    this.authReq = false;
    const payload = doAuthentication
      ? { username: this.email, password: this.password } : undefined;
    EventBus.$emit('firestore-auth-credentials', payload);
    // FIXME this.password = undefined;
  }

  mounted() {
    console.log('FirestoreLoginForm mounted');
    EventBus.$on('firestore-auth-request', () => {
      console.debug('FirestoreLoginForm firestore-auth-request');
      this.authReq = true;
    });
  }
}
/*
export default Vue.extend({
  name: 'LoginForm',
  data: () => ({
    email: null,
    password: null,
  }),
});
*/
</script>
