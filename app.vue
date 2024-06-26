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

        <v-toolbar-title>SVP</v-toolbar-title>

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
            
            <div class="player">
              <Purchase />
              <VideoPlayer :options="setup" v-if="fileReady"/>
            </div>
            <div
              class="text-center mb-6 bg-surface-variant"
              v-if="!fileReady"
              id="drop_zone"
              @drop="dropHandler"
              @dragover="dragOverHandler"
              >
              <p class="text-center">Drag a video file in this <i>drop zone</i>.</p>
            </div>
            <p class="text-center" v-if="!fileReady">
                Welcome to Shake Video Player the internet's best internet player.
                Play local and remote video files with the ability to manipulate them.
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
          v-on:click="close"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script>
  export default {
    data: () => ({
      setup: {
        width: '80%',
        fluid: true,
        liveui: true,
        nativeControlsForTouch: true,
        playbackRates: [0.5, 1, 1.5, 2],
        responsive: true,
        controls: true,
        autoplay: true,
        name: 'Shake Video Player',
        thumbnail: '/logo.svg',
        enableSmoothSeeking: true,
        sources:[],
        controlBar: {
          skipButtons: {
            backward: 10,
            forward: 10
          }
        },
        techOrder: ['html5'], // You may have more Tech, such as Flash or HLS
          
      },
      media: {}, 
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
          title: 'About',
          value: 'open-about',
        },
      ],
      video: '',
      file: null,
      fileReady: false
    }),
    created() {
      this.handleLaunch();
    },
    mounted() {
      
    },
    methods: {
      handleLaunch() {
        if(process.client) {
          if ('launchQueue' in window) {
            launchQueue.setConsumer(launchParams => {
              
              if(launchParams.files.length > 0) {
                this.openLocalFile(launchParams.files[0]);
              } else if(launchParams.targetURL !== '') {
                
                const urlParams = new URLSearchParams(launchParams.targetURL);
                for(const [key,value] of urlParams.entries()) {
                  const action = value;
               
                  if( action !== null) {
                    switch(action){
                      case 'remote':
                        try {
                          this.openRemote();
                        } catch {
                          alert('There has been an error playing the resource.')
                        }
                        break;
                    }
                  }
                }
              }
            });
        } else {
            console.error('File Handling API is not supported!');
        }
          
        }
      },
      setListeners() {
        this.play.addEventListener("click", this.playPauseMedia);
        this.stop.addEventListener("click", this.stopMedia);
        this.media.addEventListener("ended", this.stopMedia);
        this.rwd.addEventListener("click", this.mediaBackward);
        this.fwd.addEventListener("click", this.mediaForward);
        this.media.addEventListener("timeupdate", this.setTime);
        this.pip.addEventListener("click", this.togglePip);
        this.fs.addEventListener("click", this.toggleFs);
      },
      setElements() {
        this.media = document.querySelector("video");
      },
      dragOverHandler(ev) {
        ev.preventDefault();
      },
      dropHandler(ev) {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        
          // Use DataTransfer interface to access the file(s)
          const files = ev.dataTransfer.files
      
          for(const file of files) {
            this.file = file;
           this.type = this.file.type
            this.video = URL.createObjectURL(this.file);
            const source = {
                src:this.video,
                type: this.type
              }
              this.setup.sources.push(source)
          }
        
         
         
        this.fileReady = true
      },
      close() {
        this.showAbout = false;
      },
      async openLocal() {
        const options = {
          types: [
            {
              description: "Videos",
              accept: {
                "video/*": [".avi", ".mov", ".webm", ".mp4",".m3u8",".m3u"],
              },
            },
          ],
          excludeAcceptAllOption: true,
          multiple: false,
        };

        let [fileHandle] = await showOpenFilePicker(options);
        this.file = await fileHandle.getFile();
        
        this.type = this.file.type
        this.video = URL.createObjectURL(this.file);
        const source = {
            src:this.video,
            type: this.type
          }
          this.setup.sources.push(source)
          this.setup.name = this.file.name
          this.fileReady = true
      },
      async openLocalFile(file) {
       
        this.file = await file.getFile();
        
        this.type = this.file.type
        this.video = URL.createObjectURL(this.file);
        const source = {
            src:this.video,
            type: this.type
          }
          this.setup.sources.push(source)
          this.setup.name = this.file.name
          this.fileReady = true
      },
      async openRemote() {
        this.video = await prompt('Enter URL');
        const res = await fetch(this.video)
        const type = await res.headers.get('content-type')
        const source = {
            src:this.video,
            type: type
          }
          this.setup.sources.push(source)
        this.fileReady = true
      },
      selectAction(e) {
     
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

#drop_zone {
  border: 5px solid blue;
  width: 100%;
  height: 100px;
  position:sticky;
}

body {
  background-color: #000;
}

.container {
  opacity: 0.3;
  background-color: aqua;
}

.player {
  background-color: transparent;
}

</style>