<style scoped lang='scss'>
  .login {
    padding: 70px 0;
  }
</style>

<template>
  <div class="login">
    <ThirdLogin/>
    <div class="line"></div>
    <Form :form_data="form_data" :form_items="form_items" @verify_finish="verify_finish"></Form>
  </div>
</template>

<script setup lang='ts'>
  import Form from '../components/form/Form.vue'
  import ThirdLogin from '../components/ThirdLogin.vue'
  
  import { reactive, toRefs} from 'vue'

  const state = reactive({
    form_data: {
      title: 'Login',
      button_name: 'Login',
    },
    form_items: {
      'account': {
        'label': '帳號',
        'component': 'input',
        'type': 'text',
        'icon': 'fa-solid fa-user',
        'is_readonly': false,
        'value': '',
        'tip': '',
        'rules': {
          required: {
            warn: '此項目為必填'
          },
          length: {
            min: 8,
            warn: '不得少於8位',
          }
        },
        'is_error' : false,
        'warn': '',
        'is_show': true,
      },
      'password': {
        'label': '密碼',
        'component': 'input',
        'type': 'password',
        'icon': 'fa-solid fa-key',
        'is_readonly': false,
        'value': '',
        'tip': '',
        'rules': {
          required: {
            warn: '此項目為必填'
          },
          length: {
            min: 8,
            warn: '不得少於8位',
          }
        },
        'is_error' : false,
        'warn': '',
        'is_show': true,
      },
    },
  })
  let { form_data, form_items} = toRefs(state);

  function verify_finish() {
    console.log('login')
  }
</script>