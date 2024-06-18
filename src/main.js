import { createApp } from "vue";
import App from "./App.vue";
import posthogPlugin from "./plugins/posthog"; //import the plugin.
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(posthogPlugin); //install the plugin
app.use(router);
app.mount("#app");
