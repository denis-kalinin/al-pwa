<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list dense>
      <template v-for="item in items">
        <v-row
          v-if="item.heading"
          :key="item.heading"
          align="center"
        >
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col
            cols="6"
            class="text-center"
          >
            <a
              href="#!"
              class="body-2 black--text"
            >EDIT</a>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <!-- customized -->
      <v-list-item :to="{ name: 'Firestore'}">
        <v-list-item-action><v-icon>mdi-fire</v-icon></v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Firestore</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="{ name: 'Bitcoin'}">
        <v-list-item-action><v-icon>mdi-bitcoin</v-icon></v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Bitcoin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- table-list-view -->
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import BitcoinRate from '@/components/bitcoin/BitcoinRate.vue';
// import TableListView from '@/views/TableListView.vue';
/**
 * `<al-app-drawer />` &ndash; left panel
 * @version 1.0.1
 */
@Component({
  name: 'AlAppDrawer',
  components: {
    // TableListView,
  },
})
export default class AlAppDrawer extends Vue {
  /**
   * initial state of the drawer (left panel)
   */
  @Prop(Boolean)
  isVisible!: boolean;

  drawer: boolean = this.isVisible;

  items: any[] = [];

  created() {
    console.log('Adding Firestore route');
    const routesToAdd = [
      {
        path: '/Firestore',
        name: 'Firestore',
        component: () => import(/* webpackChunkName: "firestore" */ '@/firestore/components/FirestorePane.vue'),
      },
      {
        path: '/Bitcoin',
        name: 'Bitcoin',
        component: BitcoinRate,
      },
    ];
    this.$router.addRoutes(routesToAdd);
  }

  mounted() {
    this.$root.$on('drawer', () => {
      this.drawer = !this.drawer;
    });
  }
}
</script>
