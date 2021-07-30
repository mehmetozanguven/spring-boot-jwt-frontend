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
        <q-item clickable v-ripple @click.prevent="logout">
          <q-item-section avatar>
            <q-icon color="primary" name="login" />
          </q-item-section>

          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed } from "vue";
export default defineComponent({
  name: "LoggedInMainLayout",

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();

    const leftDrawerOpen = ref(false);
    const logout = () => {
      $store.dispatch("loginModule/doLogout");
      $router.push({ name: "homePage" });
    };
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
    };
  },
});
</script>
