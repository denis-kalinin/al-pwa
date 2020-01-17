<template>
  <login-form-centered></login-form-centered>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import LoginFormCentered from '@/components/LoginFormCentered.vue';

@Component({
  name: 'App',
  components: {
    LoginFormCentered,
  },
})
export default class App extends Vue {}
</script>
