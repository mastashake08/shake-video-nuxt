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
              <video class="video" :src="video" v-show="fileReady" />
            
              <div class="controls" v-show="fileReady">
                <button class="play" data-icon="P" aria-label="play pause toggle"></button>
                <button class="stop" data-icon="S" aria-label="stop"></button>
                <div class="timer">
                  <div></div>
                  <span aria-label="timer">00:00</span>
                </div>
                <button class="rwd" data-icon="B" aria-label="rewind"></button>
                <button class="fwd" data-icon="F" aria-label="fast forward"></button>
                <button class="fs" data-icon="M" aria-label="fullscreen"></button>
                <button class="pip" data-icon="w" aria-label="pip"></button>
              </div>
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
  import '~/assets/css/player.css'
  export default {
    data: () => ({
      intervalFwd: null,
      intervalRwd: null,
      media: {},
      controls: {},
      play: {},
      stop: {},
      rwd: {},
      fwd: {},
      pip: {},
      fs: {},
      timerWrapper: {},
      timer: {},
      timerBar: {},
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
      this.setElements();
      this.setListeners();
    },
    methods: {
      handleLaunch() {
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
        this.controls = document.querySelector(".controls");
        this.play = document.querySelector(".play");
        this.stop = document.querySelector(".stop");
        this.rwd = document.querySelector(".rwd");
        this.fwd = document.querySelector(".fwd");
        this.pip = document.querySelector(".pip");
        this.fs = document.querySelector(".fs");
        this.timerWrapper = document.querySelector(".timer");
        this.timer = document.querySelector(".timer span");
        this.timerBar = document.querySelector(".timer div");
        this.media.removeAttribute("controls");
        this.controls.style.visibility = "visible";
      },
      dragOverHandler(ev) {
        ev.preventDefault();
      },
      dropHandler(ev) {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        
          // Use DataTransfer interface to access the file(s)
        this.file = ev.dataTransfer.files[0];
        this.fileReady = true
        this.video = URL.createObjectURL(this.file);
      },
      togglePip() {
        console.log('PIP')
        if(process.client) {
          if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
          } else if (document.pictureInPictureEnabled) {
            this.media.requestPictureInPicture();
            
          }
        }  
      },
      toggleFs() {
        console.log('FS')
        if(process.client) {
          if (!document.fullscreenElement) {
            this.media.requestFullscreen();
          } else if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        } 
      },
      setTime() {
        const minutes = Math.floor(this.media.currentTime / 60);
        const seconds = Math.floor(this.media.currentTime - minutes * 60);

        const minuteValue = minutes.toString().padStart(2, "0");
        const secondValue = seconds.toString().padStart(2, "0");

        const mediaTime = `${minuteValue}:${secondValue}`;
        this.timer.textContent = mediaTime;

        const barLength = this.timerWrapper.clientWidth * (this.media.currentTime / this.media.duration);
        this.timerBar.style.width = `${barLength}px`;
      },
      windBackward() {
        if (this.media.currentTime <= 3) {
          this.rwd.classList.remove("active");
          clearInterval(this.intervalRwd);
          this.stopMedia();
        } else {
          this.media.currentTime -= 3;
        }
      },
      windForward() {
        if (this.media.currentTime >= this.media.duration - 3) {
          this.fwd.classList.remove("active");
          clearInterval(this.intervalFwd);
          this.stopMedia();
        } else {
          this.media.currentTime += 3;
        }
      },
      mediaBackward() {
        clearInterval(this.intervalFwd);
        this.fwd.classList.remove("active");

        if (this.rwd.classList.contains("active")) {
          this.rwd.classList.remove("active");
          clearInterval(this.intervalRwd);
          this.media.play();
        } else {
          this.rwd.classList.add("active");
          this.media.pause();
          this.intervalRwd = setInterval(this.windBackward, 200);
        }
      },
      mediaForward() {
        clearInterval(this.intervalRwd);
        this.rwd.classList.remove("active");

        if (this.fwd.classList.contains("active")) {
          this.fwd.classList.remove("active");
          clearInterval(this.intervalFwd);
          this.media.play();
        } else {
          this.fwd.classList.add("active");
          this.media.pause();
          this.intervalFwd = setInterval(this.windForward, 200);
        }
      },
      stopMedia() {
        this.media.pause();
        this.media.currentTime = 0;
        this.play.setAttribute("data-icon", "P");
        this.rwd.classList.remove("active");
        this.fwd.classList.remove("active");
        clearInterval(this.intervalRwd);
        clearInterval(this.intervalFwd);
      },
      playPauseMedia() {
      if (this.media.paused) {
        this.play.setAttribute("data-icon", "u");
        this.media.play();
      } else {
        this.play.setAttribute("data-icon", "P");
        this.media.pause();
      }
      },
      close() {
        this.showAbout = false;
      },
      async  handleFiles(files) {
            
                this.file = await files[0].getFile();
                this.fileReady = true
                this.video = URL.createObjectURL(this.file)
            
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


