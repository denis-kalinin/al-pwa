<template>
  <div>HOME PAGE</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import LoginFormCentered from '@/components/auth/LoginFormCentered.vue';

@Component({
  name: 'HomePage',
  components: {
    // LoginFormCentered,
  },
})
export default class HomePage extends Vue {}
</script>
