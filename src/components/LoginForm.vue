<template>
    <v-card>
        <v-card-title>Login Form</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="[v => !!v || 'Email is required']"
                    required></v-text-field>
                <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    :rules="[v => !!v || 'Password is required']"
                    required></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'LoginForm',
})
export default class LoginForm extends Vue {
    email = null;

    password = null;
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
