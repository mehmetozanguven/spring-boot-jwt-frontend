<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <h1>Login Page</h1>
      <q-form @submit="submitLogin" @reset="resetForm" class="q-gutter-md">
        <q-input
          outlined
          v-model="username"
          label="Your username *"
          hint="Username"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please write your userusername',
          ]"
        />

        <q-input
          outlined
          type="password"
          v-model="password"
          label="Your password *"
          hint="Password"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please write your password',
          ]"
        />

        <div>
          <q-btn
            label="Login"
            type="submit"
            color="primary"
            :loading="isLoading"
            :disable="isLoading"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="negative"
            flat
            class="q-ml-sm"
            :loading="isLoading"
            :disable="isLoading"
          />
        </div>
      </q-form>
      <q-ajax-bar
        ref="ajaxBar"
        position="bottom"
        color="accent"
        size="10px"
        skip-hijack
      />
    </div>
  </q-page>
</template>


<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { LoginRequest } from "src/services/LoginService";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();

    const username = ref(null);
    const password = ref(null);
    const ajaxBar = ref(null);

    const isLoading = computed(() => {
      return $store.getters["isLoadingModule/getIsLoadingStatus"];
    });

    const checkLoginStatus = () => {
      const loginStatus = $store.getters["loginModule/getLoginStatus"];
      console.log("login status in store:", loginStatus);
      if (loginStatus.loggedIn) {
        $router.push({ name: "protectedPage" });
      }
    };

    checkLoginStatus();

    const notifyFailedLogin = () => {
      $q.notify({
        message: "Invalid username or password",
        color: "negative",
      });
    };

    const resetForm = () => {
      username.value = null;
      password.value = null;
    };

    const submitLogin = async () => {
      try {
        ajaxBar.value.start();
        $store.dispatch("isLoadingModule/setIsLoadingToTrue");
        const loginRequest = new LoginRequest(username.value, password.value);
        await $store.dispatch("loginModule/doLogin", loginRequest);
        $router.push({ name: "protectedPage" });
      } catch (error) {
        console.log(error);
        notifyFailedLogin();
      } finally {
        $store.dispatch("isLoadingModule/setIsLoadingToFalse");
        ajaxBar.value.stop();
      }
    };

    return {
      username,
      password,
      resetForm,
      submitLogin,
      ajaxBar,
      isLoading,
    };
  },
});
</script>

