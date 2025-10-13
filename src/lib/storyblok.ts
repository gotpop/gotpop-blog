import { apiPlugin, storyblokInit } from "@storyblok/react";

const components = {
  // We'll add component mappings here
};

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: "eu",
  },
});
