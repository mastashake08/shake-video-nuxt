<template>
    <div>
      <video ref="videoPlayer" class="video video-js vjs-default-skin vjs-controls-enabled vjs-has-started vjs-paused vjs-user-inactive"  preload="auto">
      </video>
      <div class="vjs-playlist"></div>
    </div>
  </template>
  
  <script>
import videojs from 'video.js';
import * as playlist from 'videojs-playlist';
import PlaylistMenu from 'videojs-playlist-ui';
import 'video.js/dist/video-js.css';
import 'videojs-playlist-ui/dist/videojs-playlist-ui.css'
import * as registerChromeCast from '@silvermine/videojs-chromecast'
import '@videojs/themes/dist/sea/index.css';
import '@silvermine/videojs-chromecast/dist/silvermine-videojs-chromecast.css'
import { StoreFrames } from '@mastashake08/remote-video-recorder';
  export default {
    name: 'VideoPlayer',
    props: {
      options: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        player: null
      }
    },
    created() {
      
    },
    async mounted() {
      registerChromeCast(videojs, { preloadWebComponents: true });
      this.player = videojs(this.$refs.videoPlayer, this.options, () => {
        this.player.log('onPlayerReady', this);
      });
      this.player.playlist([{
        sources: this.options.sources
      }])

      
      //this.player.play()
    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose();
      }
    }
  }
  </script>
  <style>
   .video {  
    border-radius: 10px;
    background-color: transparent;
    box-shadow: 3px 3px 5px black;
    transition:  1s all ;
    
  }
  
  
  
  
  .player:hover .controls,
  .player:focus-within .controls {
    opacity: 1;
  }
  
  
</style>