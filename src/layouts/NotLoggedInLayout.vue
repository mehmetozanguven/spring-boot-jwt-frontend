<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> SpringBootJwtFrontend </q-toolbar-title>

        <div>mehmetozanguven</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item clickable v-ripple :to="{ name: 'loginPage' }">
          <q-item-section avatar>
            <q-icon color="primary" name="login" />
          </q-item-section>

          <q-item-section>Login</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'registerPage' }">
          <q-item-section avatar>
            <q-icon color="primary" name="app_registration" />
          </q-item-section>

          <q-item-section>Register</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
