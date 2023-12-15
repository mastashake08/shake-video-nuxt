// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/shake-video-nuxt/', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },
  devtools: { enabled: true },
  modules: ['@invictus.codes/nuxt-vuetify', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Shake Video Player',
      short_name: 'SVP',
      theme_color: '#000000',
      icons: [
        {
          src: 'video2.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
      "shortcuts": [
        {
          "name": "Open Remote Video",
          "short_name": "Remote Video",
          "description": "Open the player with a remote video",
          "url": "/?action=remote",
          "icons": [{ "src": "/pwa-192x192.png", "sizes": "192x192" }]
        }
      ],
      "file_handlers": [
        {
            "action": "/",
            "accept": {
                "video/*": [".avi", ".mov", ".webm", ".mp4"]
            }
        }
    ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: false,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  }
})