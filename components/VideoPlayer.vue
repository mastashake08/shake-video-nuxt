<template>
    <div>
      <video ref="videoPlayer" class="video video-js"></video>
      <div class="vjs-playlist"></div>
    </div>
  </template>
  
  <script>
import videojs from 'video.js';
import videojsPlaylistPlugin from 'videojs-playlist';
import 'video.js/dist/video-js.css';
import 'videojs-playlist/dist/videojs-playlist-ui.css'
  
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

      videojs.registerPlugin('playlist', videojsPlaylistPlugin);
      this.player = videojs(this.$refs.videoPlayer, this.options, () => {
        this.player.log('onPlayerReady', this);
      });
      console.log('PLAYLIST', this.player.playlist)
    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose();
      }
    }
  }
  </script>