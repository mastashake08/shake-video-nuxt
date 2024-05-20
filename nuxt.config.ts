// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    server: {
        proxy: {
            '/api': {
                target: 'https://shaketv.jcompsolu.com/api/',
                changeOrigin: true
            }
        }
    }
},
  app: {
    baseURL: process.env.BASEURL, // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },
  devtools: { enabled: true },
  modules: ['@invictus.codes/nuxt-vuetify', '@vite-pwa/nuxt', "@unlok-co/nuxt-stripe"],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Shake Video Player',
      short_name: 'SVP',
      theme_color: '#000000',
      "background_color": "black",

      "display": "standalone",
      "categories": ["entertainment", "movies"],
      "display_override": ["fullscreen", "window-controls-overlay"],
      "launch_handler": {
        "client_mode": "focus-existing"
    },
    "description": "A PWA created with Nuxt 3 and Vue 3 that serves as compentent video player.",

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
                "video/*": [".avi", ".mov", ".webm", ".mp4"],
                "application/x-mpegURL": ['.m3u','.m3u8']
            }
        }
    ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
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
  },
  stripe: {
    // Server
    server: {
      key: process.env.STRIPE_KEY,
      
    // CLIENT
    },
    client: {
      key: process.env.STRIPE_SECRET,
      // your api options override for stripe client side
      options: {

      }
    }
  }
})