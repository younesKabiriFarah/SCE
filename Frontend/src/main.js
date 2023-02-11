import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

require("@/store/subscriber"); //Para detectar token

//Toast alerts
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
};

createApp(App).use(store).use(router).use(Toast, options).mount("#app");
