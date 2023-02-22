<style lang="scss">
  .swiper-slide {
    .video-js {
      border-radius: 5px;
      z-index: 1;

      .vjs-big-play-button {
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      z-index: 2;
    }
    .name {
      display: none;
    }

    &.swiper-slide-active {
      cursor: pointer;

      .mask {
        display: none;
      }
      .name {
        width: 100%;
        position: absolute;
        top: -15px;
        left: 0;
        z-index: 2;
        display: block;

        a {
          display: block;
          padding: 5px 10px;
          font-size: 24px;
          font-weight: 900;
          text-shadow: black 1px 1px 10px;
          color: #fff;
        }
      }
    }
  }
</style>

<template>
  <video ref="rVideoPlayer" class="video-js vjs-default-skin" :poster="`https://picsum.photos/600/400?random=${poster}`"></video>
</template>

<script setup lang="ts">
  import videoJs from 'video.js'
  import 'video.js/dist/video-js.css'
  
  import { ref, onMounted, watch} from 'vue'

  const props = defineProps({
    options: {
      type: Object,
      default: () => ({}),
    },
    control_id: Number,
    control: String,
    poster: String
  })

  const is_control = ref(false);

  watch(() => props.control, (newV, originV) => {
      if(!is_control.value) {
        return
      }
      if(newV == 'pause') {
        pause()
      } else if(newV == 'play') {
        play()
      }
    }
  )

  const rVideoPlayer = ref<Element>()
  let player = ref()
  onMounted(() => {
    player.value = videoJs(rVideoPlayer.value as Element, props.options)
  })

  function pause (){
    console.log(props.control_id, 'pause')
    is_control.value = true
    player.value.pause();
  }
  function play (){
    console.log(props.control_id, 'play')
    is_control.value = true
    player.value.play();
  }

  defineExpose({pause, play})
</script>