<template>
    <div>
      <video ref="videoPlayer" class="video video-js"  preload="metadata"></video>
      <div class="vjs-playlist"></div>
    </div>
  </template>
  
  <script>
import videojs from 'video.js';
import * as playlist from 'videojs-playlist';
import PlaylistMenu from 'videojs-playlist-ui'
import 'video.js/dist/video-js.css';
import 'videojs-playlist-ui/dist/videojs-playlist-ui.css'
  
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
    mounted() {
    
      this.player = videojs(this.$refs.videoPlayer, this.options, () => {
        this.player.log('onPlayerReady', this);
      });
      this.player.playlist([{
        sources: this.options.sources
      }])
      this.player.playlistUi();
      //this.player.playlist.autoadvance(0);
    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose();
      }
    }
  }
  </script>