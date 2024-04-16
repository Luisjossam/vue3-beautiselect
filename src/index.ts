import { App } from "vue";
import { BeautiSelect } from "./components/main";

export default {
  install(app: App) {
    app.component("b-select", BeautiSelect);
  },
};
