<style lang="scss">
  .modal_container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    visibility: hidden;
    opacity: 0;
    transition: linear .5s;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

    &.show {
      visibility: visible;
      opacity: 1;
      transition: .5s;

      .modal {
        transform: translateY(0%);
        opacity: 1;
      }
    }

    .modal {
      width: 500px;
      border-radius: 5px;
      background-color: #fff;
      transform: translateY(-50%);
      position: relative;
      opacity: 0;
      transition: .5s;

      .modal_close {
        width: $height;
        height: $height;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 18px;
        color: $primary;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1;

        &:hover {
          font-size: 20px;
        }
      }

      .modal_header {
        min-height: $height;
        padding: 0 $height;
        color: $primary;
        position: relative;

        .modal_icon {
          width: $height;
          height: $height;
          margin: 10px auto 0;
          font-size: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal_title {
          line-height: $height;
          font-size: 18px;
          font-weight: 900;
          text-align: center;
        }
      }

      .modal_content {
        max-height: 200px;
        padding: 5px 15px;
        overflow-y: auto;
        line-height: normal;
      }

      .modal_buttons {
        padding: 5px;
        display: flex;
        justify-content: flex-end;
        .button {
          height: $height - 10;
          line-height: $height - 10;
          margin-top: 0;
          margin-left: 2px;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="modal_container" :class="{show : modal_data.is_show}">
    <div class="modal">
      <div class="modal_close" @click="modal_data.is_show = false"> <i class="fas fa-times"></i> </div>
      <div class="modal_header">
        <div class="modal_icon" :class="modal_data.icon"></div>
        <div class="modal_title"> {{ modal_data.title }} </div>
      </div>
      <div class="modal_content">
        <slot name="modal_content"/>
      </div>
      <div class="modal_buttons">  
        <slot name="modal_buttons"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modal_data: any
  }>()
</script>
