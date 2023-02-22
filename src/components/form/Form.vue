<style lang="scss">
  .form {
    width: 400px;
    padding: 20px;
    margin: 20px auto 0 auto;
    border-top: 1px solid $primary;
    color: $primary;

    .title {
      text-align: center;
      font-size: 2rem;
      font-weight: 900;
    }
  }
</style>

<template>
  <form class="form">
    <!-- title -->
    <div v-if="form_data.title" class="title"> {{ form_data.title }} </div>

    <!-- items -->
    <template v-for="(component, key) in form_items" :key="key">
      <Input v-if="component.component == 'input' && component.is_show" :data="component" @blur="verify(component)"> </Input>
    </template>
    
    <!-- 會員條款與隱私權聲明 -->
    <div v-if="form_data.terms_name && form_data.terms_HTML" class="checkbox_container">
      <input type="checkbox" id="is_agree" v-model="is_agree">
      <label for="is_agree"> 
        <div class="text"> 我已同意 </div>
      </label>
      <div class="terms_name" @click="modal_data.is_show = true">
        {{ form_data.terms_name }} 
      </div>
    </div>
    <!-- button -->
    <div v-if="form_data.button_name" class="flex justify_content_center mt_20">
      <div class="button" :class="{disabled : form_data.terms_name && form_data.terms_HTML && !is_agree}" @click="verify_all"> {{ form_data.button_name }} </div>
      <div class="button ml_5" @click="test"> Test </div>
    </div>
  </form>

  <!-- modal -->
  <template v-if="form_data.terms_name && form_data.terms_HTML">
    <modal :modal_data="modal_data">      
      <template #modal_content>
        <div v-html="form_data.terms_HTML" v-for=" item in 5 "></div>
      </template>

      <template #modal_buttons>
        <div class="button"  @click="close"> 關閉 </div>
      </template>
    </modal>
  </template>
</template>

<script setup lang="ts">
  import Input from './Input.vue'
  import Modal from '../Modal.vue'

  import {IForm_component, IMethods} from '../../types/form'

  import { reactive, toRefs, onMounted } from 'vue'

  const props = defineProps<{
    form_data: any
    form_items: any
  }>()
  const emits = defineEmits<{
    (e: 'verify_finish'): void
  }>()

  const state = reactive({
    form_data: props.form_data,
    form_items: props.form_items,
    is_agree: false,

    // modal_example
    modal_data: {
      title: props.form_data.terms_name,
      icon: 'fas fa-check-circle',
      is_show: false,
    },
  })

  let { form_data, form_items, is_agree, modal_data} = toRefs(state)

  const verify_methods: IMethods = {
    required (component: IForm_component) {
      if (!component.value) {
        component.is_error = true;
        component.warn = component.rules.required?.warn || '';
        return false;
      }
      else {
        component.is_error = false;
        component.warn = '';
        return true;
      }
    },
    cellphone (component: IForm_component) {
      let rep = /^(09)[0-9]{8}$/;
      if (!rep.test(component.value)) {
        component.is_error = true;
        component.warn = component.rules.cellphone?.warn || '';
        return false;
      }
      else {
        component.is_error = false;
        component.warn = '';
        return true;
      }
    },
    email (component: IForm_component) {
      let rep = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!rep.test(component.value)) {
        component.is_error = true;
        component.warn = component.rules.email?.warn || '';
        return false;
      }
      else {
        component.is_error = false;
        component.warn = '';
        return true;
      }
    },
    length (component: IForm_component) {
      if (component.value.length < (component.rules.length?.min || 0) || component.value.length > (component.rules.length?.max || 10000)) {
        component.is_error = true;
        component.warn = component.rules.length?.warn || '';
        return false;
      }
      else {
        component.is_error = false;
        component.warn = '';
        return true;
      }
    },
    confirm (component: IForm_component) {
      if (component.value != state.form_items[component.rules.confirm?.password || 'password'].value) {
        component.is_error = true;
        component.warn = component.rules.confirm?.warn || '';
        return false;
      }
      else {
        component.is_error = false;
        component.warn = '';
        return true;
      }
    }
  }

  function verify(...arr: IForm_component[]) {
    let is_valid = true;
    for (let component of arr) {
      for (let rule in component.rules) {
        if (!verify_methods[rule](component)) {
          is_valid = false;
          break
        }
      }
    }
    return is_valid;
  }

  function verify_all() {
    if(state.form_data.terms_name && state.form_data.terms_HTML && !state.is_agree) return;
    let arr = [];
    for(let component in state.form_items) {
      let item = state.form_items[component]
      if(item.is_show && Object.keys(item.rules).length) {
        arr.push(item)
      }
    }
    if(verify(...arr)) {
      emits('verify_finish');
    }
  }

  //
  function close() {
    state.modal_data.is_show = false;
  }

  // test
  function test() {
    if(location.href.indexOf('login') > -1) {
      state.form_items.account.value = 'test1234';
      state.form_items.password.value = '12345678';
    } else {
      state.form_items.name.value = 'test';
      state.form_items.cellphone.value = '0912123123';
      state.form_items.email.value = 'test1234@gmail.com';
      state.form_items.account.value = 'test1234';
      state.form_items.password.value = '12345678';
      state.form_items.confirm_password.value = '12345678';
      state.is_agree = true;
    }
    verify_all();
  }

  onMounted(() => {
    setTimeout(() => {
      let title: any = document.querySelector('.title');
      title.click();
    }, 0)
  })
</script>