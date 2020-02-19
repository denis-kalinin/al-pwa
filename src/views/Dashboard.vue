<template>
  <v-app id="inspire">
    <al-app-drawer :isVisible="false" />
    <al-app-header />
    <v-content>
      <router-view />
    </v-content>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                <v-avatar
                  size="40px"
                  class="mx-3"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                />
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-account-card-details-outline"
                placeholder="Company"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                placeholder="Job title"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="Email"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="(000) 000 - 0000"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-text"
                placeholder="Notes"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            text
            color="primary"
          >More</v-btn>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="dialog = false"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--
    <v-dialog
      v-model="authRequired"
      max-width="500px"
    >
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
    </v-dialog>
-->
    <login-form />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AlAppHeader from '@/components/layout/AlAppHeader.vue';
import AlAppDrawer from '@/components/layout/AlAppDrawer.vue';
import LoginForm from '@/components/auth/LoginForm.vue';


@Component({
  name: 'Dashboard',
  components: {
    AlAppHeader,
    AlAppDrawer,
    LoginForm,
  },
})
export default class Dashboard extends Vue {
  dialog: boolean = false;

  drawer: boolean = false;

  items: any[] = [
    { icon: 'mdi-contacts', text: 'Contacts' },
    { icon: 'mdi-history', text: 'Frequently contacted' },
    { icon: 'mdi-content-copy', text: 'Duplicates' },
    {
      icon: 'mdi-chevron-up',
      'icon-alt': 'mdi-chevron-down',
      text: 'Labels',
      model: true,
      children: [
        { icon: 'mdi-plus', text: 'Create label' },
      ],
    },
    {
      icon: 'mdi-chevron-up',
      'icon-alt': 'mdi-chevron-down',
      text: 'More',
      model: false,
      children: [
        { text: 'Import' },
        { text: 'Export' },
        { text: 'Print' },
        { text: 'Undo changes' },
        { text: 'Other contacts' },
      ],
    },
    { icon: 'mdi-settings', text: 'Settings' },
    { icon: 'mdi-message', text: 'Send feedback' },
    { icon: 'mdi-help-circle', text: 'Help' },
    { icon: 'mdi-cellphone-link', text: 'App downloads' },
    { icon: 'mdi-keyboard', text: 'Go to the old version' },
  ];
}
</script>
