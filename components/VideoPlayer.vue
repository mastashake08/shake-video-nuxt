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

import 'videojs-contrib-ads/dist/videojs-contrib-ads.css'
import 'videojs-ima/dist/videojs.ima.css'
import { StoreFrames } from '@mastashake08/remote-video-recorder';
import ima from 'videojs-ima/dist/videojs.ima';
// Register Google IMA to videojs instance on the window
// Can't call ima.init if the module is not exported by webpack (see webpack.mix.js)

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
      console.log(ima)
      if (typeof google !== 'undefined') {
        videojs.registerPlugin(ima.name, ima.init);
      }
    },
    async mounted() {

      this.player = videojs(this.$refs.videoPlayer, this.options, () => {
        // this.player.ima({
        //   adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/23146977599/shake-tv-1&description_url=https%3A%2F%2Fshaketv.jcompsolu.com&tfcd=0&npa=0&sz=640x480&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator='
        // })
        // this.player.playlist([
        //   {
        //   name: 'Rick and Morty',
        //   description: 'Rick is a mad scientist who drags his grandson, Morty, on crazy sci-fi adventures. Their escapades often have potentially harmful consequences for their family and the rest of the world. Join Rick and Morty on AdultSwim.com as they trek through alternate dimensions, explore alien planets, and terrorize Jerry, Beth, and Summer. ',
        //   poster:'https://media.cdn.adultswim.com/uploads/20230927/239271334177-rick-and-morty-season-7-metaThumb_420x236.png',
        //   thumbnail: [{
        //     src: 'https://media.cdn.adultswim.com/uploads/20230927/239271334177-rick-and-morty-season-7-metaThumb_420x236.png'
        //   }],
        //   sources: [{
        //     src: 'https://adultswim-vodlive.cdn.turner.com/live/rick-and-morty/stream.m3u8',
        //     type:'application/x-mpegURL'
        //     }]
        //   },
        //   {
        //     name: 'Adult Swim Aqua Teen Hunger Force',
        //     description: 'Can you handle this much Carl? Should you?',
        //     poster: 'https://i.cdn.turner.com/adultswim/big/video/aqua-teen-hunger-force-marathon/marathonStream_athf10.jpg',
        //     thumbnail: [{
        //       src: 'https://i.cdn.turner.com/adultswim/big/video/aqua-teen-hunger-force-marathon/marathonStream_athf10.jpg'
        //     }],
        //     sources: [{
        //         src:' https://adultswim-vodlive.cdn.turner.com/live/aqua-teen/stream.m3u8',
        //         type:'application/x-mpegURL'
        //       }]
        //   },
        //   {
        //     name: 'Bloody Disgusting',
        //     sources:[{
        //       src: 'https://bloodydisgusting-ingest-roku-us.cinedigm.com/playlist.m3u8',
        //       type: 'application/x-mpegURL'
        //     }],
        //     thumbnail: [{
        //       src: 'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2024/02/bdlogo.png?fit=600%2C600&ssl=1'
        //     }],
        //     poster: {
        //       src: 'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2024/02/bdlogo.png?fit=600%2C600&ssl=1'
        //     }
        //   }
        // ])
        //this.player.playlistUi()
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