<template>
  <div class="message_container"> 
    <div class="message_items" :class="[ item.type, {show : item.is_show} ]" v-for="item in message_items" :key="item.id">
      <div class="message_icon"> 
        <i v-if="item.type == 'success'" class="fas fa-check-circle"></i> 
        <i v-if="item.type == 'tip'" class="fas fa-exclamation-circle"></i>
        <i v-if="item.type == 'error'" class="fas fa-times-circle"></i>
      </div>
      <div class="message"> {{ item.message }} </div>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch} from 'vue'

interface IMessage {
  id: number,
  type: string,
  message: string,
  is_show: boolean
}

class State {
  message_items: any = {}
}

export default defineComponent({
  setup () {
    const state = reactive(new State())

    function add_message(item: IMessage) {
      let id = item.id;
      state.message_items[id] = item;
      setTimeout(function() {
        state.message_items[id].is_show = true;
      }, 0)
      setTimeout(function() {
        state.message_items[id].is_show = false;
      }, 4000)
      setTimeout(function() {
        delete state.message_items[id];
      }, 5000)
    }

    return {
      ...toRefs(state),
      add_message
    }
  }
})
</script>

<style lang="scss">
  .message_container {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    padding-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;

    .message_items {
      max-width: 100%;
      padding: 15px;
      margin-bottom: 5px;
      border-radius: 5px;

      opacity: 0;
      margin-top: -50px;
      transition: 1s;

      display: flex;
      justify-content: center;
      align-items: center;

      &.show {
        opacity: 1;
        margin-top: 0;
      }

      @mixin type($color) {
        background: lighten($color, 50%);
        border: 1px solid lighten($color, 40%);
        color: $color;
      }
      &.success {
        @include type($primary)
      }
      &.tip {
        @include type($secondary)
      }
      &.error {
        @include type($danger)
      }

      .message_icon {
        margin-right: 5px;
      }
    }
  }
</style>
