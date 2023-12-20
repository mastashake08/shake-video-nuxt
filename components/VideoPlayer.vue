<template>
    <div>
      <video ref="videoPlayer" class="video video-js vjs-default-skin vjs-controls-enabled vjs-has-started vjs-paused vjs-user-inactive"  preload="auto">
        <source
            src="https://iptv-org.github.io/iptv/index.m3u"
            type="application/x-mpegURL">
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

import '@videojs/themes/dist/sea/index.css';

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
        sources: {
            src: "https://iptv-org.github.io/iptv/index.m3u",
            type: "application/x-mpegURL"
        }
      }])

      //this.player.playlist.autoadvance(0);
      this.player.playlistUi();
    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose();
      }
    }
  }
  </script>