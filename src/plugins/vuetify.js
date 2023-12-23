import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

// Translation provided by Vuetify (javascript)
import ar from "vuetify/lib/locale/ar";

// Translation provided by Vuetify (typescript)

Vue.component("my-component", {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = "ar";
    },
  },
}),
  Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ar },
    current: "ar",
  },
});
