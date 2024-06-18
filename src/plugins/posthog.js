import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      "phc_68lCfsz0OCFOBn53UpUnc2E9etNhooWMDYOdTGCkJ1w",
      {
        api_host: "https://eu.i.posthog.com",
        person_profiles: "identified_only",
      }
    );
  },
};
