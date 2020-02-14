<template>
  <div v-text="jsonResult"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FirestoreApi from '../network-api/FirestoreApi';

@Component({
  name: 'FirestoreView',
})
export default class FirestoreView extends Vue {
  jsonResult: string = 'test...';

  created() {
    console.log('created FirestoreView');
    this.jsonResult = 'loading...';
  }

  mounted() {
    FirestoreApi.getFromFirebaseDB('tables')
      .then((resp) => { this.jsonResult = resp.data; });
  }
}
</script>
