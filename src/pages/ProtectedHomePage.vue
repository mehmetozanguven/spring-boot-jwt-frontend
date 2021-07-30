<template>
  <q-page class="flex column flex-center">
    <p class="text-h4">
      {{ helloMsg }}
    </p>
    <q-btn
      @click="doSimplePostRquest"
      color="secondary"
      label="Do simple POST Request"
      :loading="isLoading"
      :disable="isLoading"
    />
    <p class="q-pt-lg">Post Request response: {{ postRequestResponse }}</p>
    <q-ajax-bar
      ref="ajaxBar"
      position="bottom"
      color="accent"
      size="10px"
      skip-hijack
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { ProtectedService } from "src/services/ProtectedService";
export default defineComponent({
  name: "ProtectedHomePage",
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();
    const ajaxBar = ref(null);

    const jwt = computed(() => {
      return $store.getters["loginModule/getJwt"];
    });
    const isLoading = computed(() => {
      return $store.getters["isLoadingModule/getIsLoadingStatus"];
    });

    const protectedService = new ProtectedService();

    const helloMsg = ref(null);
    const postRequestResponse = ref(null);

    const getUserInfo = async () => {
      try {
        $store.dispatch("isLoadingModule/setIsLoadingToTrue");
        const response = await protectedService.getUserInfo(jwt.value);
        helloMsg.value = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        $store.dispatch("isLoadingModule/setIsLoadingToFalse");
      }
    };

    const doSimplePostRquest = async () => {
      postRequestResponse.value = "";
      try {
        ajaxBar.value.start();
        $store.dispatch("isLoadingModule/setIsLoadingToTrue");
        console.log("jwt value: ", jwt.value);
        const response = await protectedService.doSimplePostRequest(jwt.value);
        postRequestResponse.value = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally run");
        ajaxBar.value.stop();
        $store.dispatch("isLoadingModule/setIsLoadingToFalse");
      }
    };

    getUserInfo();

    return {
      helloMsg,
      postRequestResponse,
      doSimplePostRquest,
      isLoading,
      ajaxBar,
    };
  },
});
</script>