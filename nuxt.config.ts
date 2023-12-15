// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@invictus.codes/nuxt-vuetify',
    '@vite-pwa/nuxt',
    '@nuxtjs/color-mode'
  ],
  runtimeConfig: {
    app:{
    config: {
      compilerOptions: {
        isCustomElement: 'shake-video-element'
      }
    }
  }}
})