require("dotenv").config({ path: ".env.local" });

module.exports = {
  // required
  oauthToken: process.env.STORYBLOK_ACCESS_TOKEN,

  // required: path where components will be downloaded
  // This is a temporary file that will be created
  componentsPath: "./components.json",

  // optional: defaults to `./` (current directory)
  path: "./src/types/storyblok-components.ts",

  // optional: defaults to false
  // If true, generated file will be formatted with prettier
  // Requires prettier to be installed
  // prettierConfig: '.prettierrc',

  // optional: defaults to 'types'
  // This is the name of the exported namespace
  // e.g., export namespace YourNamespace { ... }
  // namespace: 'StoryblokComponents',

  // optional: defaults to 'Storyblok'
  // This is the suffix added to each type
  // e.g., HeroStoryblok, CardStoryblok
  componentNameSuffix: "Storyblok",

  // optional: defaults to false
  // If true, will also generate types for internal Storyblok fields
  // like _uid, _editable, etc.
  internalLinksAsStrings: false,

  // optional: defaults to false
  // If true, will resolve relationships and generate proper types
  resolveRelations: false,
};
