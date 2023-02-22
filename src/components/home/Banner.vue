<style lang="scss">
  .swiper_container {
    display: flex;
    align-items: center;
    background: #eee;

    .prev, .next {
      flex: 0 0 50px;
      height: 50px;
      font-size: 32px;
      color: $primary;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        background: $primary;
        color: #fff;
      }
    }
  }
  .swiper {
    flex: 1 1 1px;
    padding: 20px 0;

    .swiper-button-prev, .swiper-button-next {
      color: $primary;
    }

    .swiper-slide {
      background-position: center;
      background-size: cover;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
</style>

<template>
  <div class="swiper_container">
    <div class="prev" ref="prev"> <i class="fa-solid fa-caret-left"></i> </div>
    <swiper class="swiper-no-swiping"
      :effect="'coverflow'"
      :coverflowEffect="{
        rotate: 0,
        stretch: 150,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }"
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :loop="true"
      :navigation="{ nextEl: '.next', prevEl: '.prev'}"
      :modules="modules"
      @slideChange="slideChange"
    >
      <swiper-slide v-for="item in video_controls" :key="item.id" :style="{width: `${videoWidth}px`, height: `${videoHeight}px`}">
        <video-player :data-test="item.id" :options="videoOption" :control_id="item.id" :control="item.value" :poster="`https://picsum.photos/${videoWidth}/${videoHeight}?random=${item.id}`"></video-player> 
        <div class="mask" > </div>
        <div class="name"><router-link to="/"> {{ item.name }} </router-link></div>
      </swiper-slide>
    </swiper>
    <div class="next" ref="next"> <i class="fa-solid fa-caret-right"></i> </div>
  </div>

  <!-- <video-player :options="videoOption" :control="video_controls[0].value" :poster="`https://picsum.photos/${videoWidth}/${videoHeight}?random=${video_controls[0].id}`"></video-player> -->
</template>

<script setup lang="ts">
  import VideoPlayer from '../Video.vue'
  
  import { Swiper, SwiperSlide} from "swiper/vue";
  import { Navigation, EffectCoverflow } from "swiper";
  
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/effect-coverflow";
  
  import { reactive, onMounted } from 'vue'

  const modules =  [Navigation, EffectCoverflow]

  const videoWidth = 600
  const videoHeight = 400
  
  const video_controls = reactive([
    {id: 1, value: '', name: 'JavaScript Basics for Beginners'}, 
    {id: 2, value: '', name: '2023 網頁全端開發'}, 
    {id: 3, value: '', name: 'Getting started with WebAssembly & Emscripten'}, 
    {id: 4, value: '', name: '2023 Python全攻略'}, 
    {id: 5, value: '', name: 'The Complete Javascript Course for Developers'}
  ]);

  let lastIndex: number;
  let is_start: boolean;
  function slideChange(swiper: any) {
    if(!is_start) {
      return
    }

    if(swiper.realIndex != lastIndex) {
      // let tests:any = document.querySelector('.swiper-slide-active');
      // console.log(tests)
      // for(let item of tests) {
      //   console.log(item.dataset.test)
      // }
      return;
      let prev = swiper.realIndex - 1 < 0 ? 4 : swiper.realIndex - 1
      video_controls[prev].value = 'pause'
      video_controls[(swiper.realIndex)].value  = 'play'
      video_controls[((swiper.realIndex + 1) % 5)].value  = 'pause'
    }
    lastIndex = swiper.realIndex
  }

  onMounted(() => {
    is_start = true
  })

  let videoOption = reactive({
    autoplay: false,
    controls: true,
    sources: [
      {
        src: '/videoTest/uniqVideo/1/.m3u8',
        type:'application/x-mpegURL'
      }
    ],
    width: videoWidth + 'px',
    height: videoHeight + 'px',
  })
</script>
