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

      this.player = videojs(this.$refs.videoPlayer, this.options, () => {});
      this.player.playlist([
      {
        name: 'Rick and Morty',
        description: 'Rick is a mad scientist who drags his grandson, Morty, on crazy sci-fi adventures. Their escapades often have potentially harmful consequences for their family and the rest of the world. Join Rick and Morty on AdultSwim.com as they trek through alternate dimensions, explore alien planets, and terrorize Jerry, Beth, and Summer. ',
        poster:'https://media.cdn.adultswim.com/uploads/20230927/239271334177-rick-and-morty-season-7-metaThumb_420x236.png',
        thumbnail: [{
          src: 'https://media.cdn.adultswim.com/uploads/20230927/239271334177-rick-and-morty-season-7-metaThumb_420x236.png'
        }],
        sources: [{
          src: 'https://adultswim-vodlive.cdn.turner.com/live/rick-and-morty/stream.m3u8',
          type:'application/x-mpegURL'
          }]
        },
        {
          name: 'Adult Swim Aqua Teen Hunger Force',
          description: 'Can you handle this much Carl? Should you?',
          poster: 'https://i.cdn.turner.com/adultswim/big/video/aqua-teen-hunger-force-marathon/marathonStream_athf10.jpg',
          thumbnail: [{
            src: 'https://i.cdn.turner.com/adultswim/big/video/aqua-teen-hunger-force-marathon/marathonStream_athf10.jpg'
          }],
          sources: [{
              src:' https://adultswim-vodlive.cdn.turner.com/live/aqua-teen/stream.m3u8',
              type:'application/x-mpegURL'
            }]
        },
        {
          name: 'Bloody Disgusting',
          sources:[{
            src: 'https://bloodydisgusting-ingest-roku-us.cinedigm.com/playlist.m3u8',
            type: 'application/x-mpegURL'
          }],
          thumbnail: [{
            src: 'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2024/02/bdlogo.png?fit=600%2C600&ssl=1'
          }],
          poster: {
            src: 'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2024/02/bdlogo.png?fit=600%2C600&ssl=1'
          }
        }
        ])
      this.player.playlistUi()
    
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