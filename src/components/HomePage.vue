<template>
  <login-form-centered></login-form-centered>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LoginFormCentered from '@/components/auth/LoginFormCentered.vue';

@Component({
  name: 'App',
  components: {
    LoginFormCentered,
  },
})
export default class App extends Vue {}
</script>
