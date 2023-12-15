<template>
  <NuxtPwaManifest />
    <NuxtLoadingIndicator />
  <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="black"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Shake Video Player</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-on:click="navigateTo('https://github.com/mastashake08/shake-video-nuxt', {  
        open: {
          target: '_blank'
        }
        })" variant="text" icon="mdi-github"></v-btn>

<v-btn v-on:click="navigateTo('https://x.com/jyroneparker', {  
        open: {
          target: '_blank'
        }
        })" variant="text" icon="mdi-twitter"></v-btn>

<v-btn v-on:click="navigateTo('https://youtube.com/c/jyroneparker', {  
        open: {
          target: '_blank'
        }
        })" variant="text" icon="mdi-youtube"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="top"
        temporary
      >
        <v-list>
        <v-list-item
        v-for="n in items"
        :key="n"
        :title="n.title"
        v-on:click="selectAction(n)"
      ></v-list-item>
      </v-list>
      </v-navigation-drawer>

      <v-main>
          <v-container fluid>
            <video controls class="video" :src="video" v-if="fileReady" />
            <p>
              Welcome to Shake Video Player the internet's best internet player.
            </p>
            
          </v-container>
      </v-main>
    </v-layout>
  </v-card>
  <v-dialog width="500" v-model="showAbout">
  
  <template v-slot:default="{ showAbout }">
    <v-card title="About SVP">
      <v-card-text>
        Shake Video Player is a Javascript PWA video player that offers functionality that most video players don't.
        Created with the following technologies:
        <v-list>
          <v-list-item>
            Nuxt 3
          </v-list-item>
          <v-list-item>
            Vue 3
          </v-list-item>
          <v-list-item>
            Vuetify
          </v-list-item>
        </v-list>
        Developed by <a href="https://jyroneparker.com" target="_blank">Jyrone Parker (Mastashake)</a>. View the source code on <a href="https://github.com/mastashake08/shake-video-nuxt" target="_blank">Github</a>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close Dialog"
          v-on:click="showAbout = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>
<script>

  export default {
    mounted() {
      if(process.client) {
        if ('launchQueue' in window) {
          console.log('File Handling API is supported!');

          launchQueue.setConsumer(launchParams => {
              this.handleFiles(launchParams.files);
          });
      } else {
          console.error('File Handling API is not supported!');
      }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const action = urlParams.get('action');
        if( action !== null) {
          switch(action){
            case 'remote':
              this.openRemote();
              break;
          }
        }
      }
    },
    data: () => ({
      defer: {},
      drawer: false,
      group: null,
      showAbout: false,
      items: [
        {
          title: 'Open File',
          value: 'open-local',
        },
        {
          title: 'Open Network',
          value: 'open-network',
        },
        {
          title: 'Capture Stream',
          value: 'capture-stream'
        },
        {
          title: 'About',
          value: 'open-about',
        },
      ],
      video: '',
      file: null,
      fileReady: false
    }),
    methods: {
      async  handleFiles(files) {
          for (const file of files) {
              this.file = await file.getFile();

              this.video = URL.createObjectURL(this.file)
          }
      },
      async openLocal() {
        const options = {
          types: [
            {
              description: "Videos",
              accept: {
                "video/*": [".avi", ".mov", ".webm", ".mp4"],
              },
            },
          ],
          excludeAcceptAllOption: true,
          multiple: false,
        };

        let [fileHandle] = await showOpenFilePicker(options);
        this.file = await fileHandle.getFile();
        this.fileReady = true
        this.video = URL.createObjectURL(this.file);
      },
      openRemote() {
        this.video = prompt('Enter URL');
        this.fileReady = true
      },
      selectAction(e) {
        console.log(e)
        switch(e.value) {
          case 'open-local':
            this.openLocal()
            break;
          case 'open-network':
            this.openRemote()
            break;
          case 'open-about':
            this.showAbout = true
        }
        this.drawer = false
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
<style>
.video {
  border-radius: 2%;
  width: 100%;
}
</style>