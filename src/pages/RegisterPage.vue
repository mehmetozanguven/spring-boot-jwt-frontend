<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <h1>Register Page</h1>
      <q-form
        @submit="submitNewRegister"
        @reset="resetForm"
        class="q-gutter-md"
      >
        <q-input
          outlined
          v-model="username"
          label="Your username *"
          hint="Username"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please write your username',
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
            label="Register"
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
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { RegisterService, RegisterRequest } from "src/services/RegisterService";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const $q = useQuasar();
    const $store = useStore();

    const registerService = new RegisterService();
    const username = ref(null);
    const password = ref(null);
    const ajaxBar = ref(null);

    const isLoading = computed(() => {
      return $store.getters["isLoadingModule/getIsLoadingStatus"];
    });

    const resetForm = () => {
      name.value = null;
      password.value = null;
    };

    const notifySuccessRegister = () => {
      $q.notify({
        message: "You successfully registered..",
        color: "positive",
      });
    };

    const notifyFailedRegister = () => {
      $q.notify({
        message: "There is an user for that username",
        color: "negative",
      });
    };

    const submitNewRegister = async () => {
      try {
        ajaxBar.value.start();
        $store.dispatch("isLoadingModule/setIsLoadingToTrue");
        const registerRequest = new RegisterRequest(
          username.value,
          password.value
        );
        await registerService.doRegister(registerRequest);
        notifySuccessRegister();
      } catch (error) {
        notifyFailedRegister();
        console.log(error);
      } finally {
        $store.dispatch("isLoadingModule/setIsLoadingToFalse");
        ajaxBar.value.stop();
      }
    };

    return {
      username,
      password,
      resetForm,
      submitNewRegister,
      ajaxBar,
      isLoading,
    };
  },
});
</script>
