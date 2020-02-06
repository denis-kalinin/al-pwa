<template>
  <v-list-group
    prepend-icon="mdi-table"
    value="true"
    v-model="isActive"
  >
    <template v-slot:activator>
      <v-list-item-title>Tables</v-list-item-title>
    </template>

    <v-list-item
      v-for="table in tables"
      :key="table.name"
      :to="{ name: 'table', params: {name: table.name}}"
    >
      <v-list-item-action></v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="table.name" />
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script lang="ts">
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
import { Vue, Component } from 'vue-property-decorator';
// import { RouteConfig } from 'vue-router';

@Component({
  name: 'TableListView',
})
export default class TableListView extends Vue {
  isActive: boolean = false;

  tables: any[] = [];

  created() {
    const tableRoutes = [
      { path: '/table/:name', name: 'table', component: TableListView },
    ];
    this.$router.addRoutes(tableRoutes);
  }
/*
  mounted() {
    const query: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase.firestore()
      .collection('tables')
      .limit(12);

    query.get()
      .then((docData) => {
        docData.forEach((doc) => {
          this.tables.push(doc.data());
        });
      });
  }
*/
}
</script>
