<template>
  <div>
    <h1>Firestore</h1>
    <v-treeview :items="items"></v-treeview>
    <v-alert type="error" v-if="state.failed">{{state.firestoreError}}</v-alert>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FirestoreApi from '@/firestore/api/FirestoreApi';

@Component({
  name: 'FirestorePane',
})
export default class FirestorePane extends Vue {
  // jsonResult: string = 'test...';
  items: [any] = [{ title: 'loading firestore...' }];

  state = {
    firestoreError: null,
    failed: false,
  };

  get isFailed(): boolean {
    return !!this.state.firestoreError;
  }

  mounted() {
    FirestoreApi.getFromFirestoreDB('tables')
      .then((resp) => {
        this.items = resp.data?.documents;
      })
      .catch((e) => {
        this.$set(this.state, 'firestoreError', e);
        this.$set(this.state, 'failed', true);
      });
  }
}
</script>
