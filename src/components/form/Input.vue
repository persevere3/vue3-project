<style lang="scss" scoped>
  $padding_top: 25px;
  $padding_tip: 5px;
  $padding_input: 0 $padding_tip;
  $background_color: #fff;
  .input_container {
    width: 100%;
    padding-top: $padding_top;
    position: relative;

    .icon {
      width: $height;
      height: $height;
      position: absolute;
      top: $padding_top;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &.eye {
        left: auto;
        right: 0;
        cursor: pointer;
      }
    }
    input {
      width: 100%;
      height: $height;
      line-height: $height;
      padding: $padding_input;
      border-radius: 5px;
      border: 1px solid $primary;
      transition: box-shadow .3s;
      cursor: pointer;

      &.is_icon {
        padding-left: $height;

        & ~ label {
          padding-left: $height;
        }
      }
      &.is_pass {
        padding-right: $height;
      }

      &:focus{
        box-shadow: 0 0 3px 1px $primary;
      }
      &.error{
        box-shadow: 0 0 3px 1px $danger;
      }

      &:focus, &.is_value {
        & ~ label {
          height: $padding_top;
          line-height: $padding_top;
          top: 0;
          font-size: 0.75rem;
        }
      }
    }
    label {
      height: $height;
      line-height: $height;
      padding: $padding_input;
      position: absolute;
      top: $padding_top;
      left: 0;
      transition: .3s;
    }
    .tip {
      padding-top: $padding_tip;
      font-size: 0.75rem;
    }
    .warn {
      padding-top: $padding_tip;
      color: $danger;
      font-size: 0.75rem;
    }
  }
</style>

<template>
  <div class="input_container">
    <input  :type="data.type == 'password' ? type_toggle : data.type"
            :class="{ is_icon : data.icon, is_pass : data.type == 'password',
                      is_value : data.value, error : data.is_error }" 
            v-model.trim="data.value" :readonly="data.is_readonly"
            autocomplete="true" @blur="emits('blur')">
    <label for=""> {{ data.label }} </label>
    <div v-if="data.icon" class="icon"> <i :class="data.icon"></i> </div>
    <template v-if="data.type == 'password'">
      <div v-if="type_toggle == 'text'" class="icon eye" @click="type_toggle = 'password'"> <i class="fas fa-eye"></i> </div>
      <div v-else class="icon eye" @click="type_toggle = 'text'"> <i class="fas fa-eye-slash"></i> </div>
    </template>

    <div v-if="data.tip" class="tip"> {{ data.tip }} </div>
    <div v-if="data.is_error && data.warn" class="warn">
      <i class="error_icon fas fa-exclamation-circle"></i>
      {{ data.warn }} 
    </div>
  </div>
</template>

<script setup lang="ts">
  import {reactive, toRefs} from 'vue'

  const props = defineProps<{
    data: any,
  }>()

  const emits = defineEmits<{
    (e: 'blur'): void
  }>()

  const state = reactive({
    data: props.data,
    type_toggle: 'password'
  })

  let { data, type_toggle} = toRefs(state);
</script>