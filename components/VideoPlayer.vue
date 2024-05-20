<template>
    <div>
      <video ref="videoPlayer" class="video video-js vjs-default-skin vjs-controls-enabled vjs-has-started vjs-paused vjs-user-inactive"  preload="auto">

      </video>
      <div class="vjs-playlist"></div>
    </div>
  </template>
  
  <script>
import videojs from 'video.js';
import * as playlist from 'videojs-playlist'
import * as playlistUi from 'videojs-playlist-ui'
import 'video.js/dist/video-js.css';
import 'videojs-playlist-ui/dist/videojs-playlist-ui.css'
import '@videojs/themes/dist/sea/index.css';
import '@silvermine/videojs-chromecast/dist/silvermine-videojs-chromecast.css'
import 'videojs-contrib-ads';
import 'videojs-ima';
import { Parser } from 'm3u8-parser';
import 'videojs-contrib-ads/dist/videojs-contrib-ads.css'
import 'videojs-ima/dist/videojs.ima.css'
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
    
    //Can't call ima.init if the module is not exported by webpack (see webpack.mix.js)
      // Register Google IMA to videojs instance on the window
      window.videojs = videojs
      this.player = videojs(this.$refs.videoPlayer, this.options, () => {
        try {
          if (typeof google !== 'undefined') {
            videojs.registerPlugin(ima.name, ima.init);
            this.player.ima({
            adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/23146977599/shake-tv-1&description_url=https%3A%2F%2Fshaketv.jcompsolu.com&tfcd=0&npa=0&sz=640x480&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator='
          })
        }
          
        } catch (error) {
          
        }
       
        // this.player.playlist(this.options.sources)
        // this.player.playlistUi()
      });
      
      
    
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