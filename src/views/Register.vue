<style scoped lang='scss'>
  .register {
    padding: 70px 0;
  }
</style>

<template>
  <div class="register">
    <ThirdLogin/>
    <Form :form_data="form_data" :form_items="form_items" @verify_finish="verify_finish"></Form>
  </div>
</template>

<script setup lang='ts'>
  import Form from '../components/form/Form.vue'
  import ThirdLogin from '../components/ThirdLogin.vue'
  
  import { reactive, toRefs} from 'vue'

  const state = reactive({
    form_data: {
      title: 'Register',
      terms_name: '會員條款與隱私權聲明',
      terms_HTML: '<div style="color: #4db38e"> <p>Tempore quas omnis a suscipit doloremque voluptatibus sit non aliquid at accusamus quam vero culpa quisquam aut placeat vel odit. Pariatur architecto placeat nesciunt eveniet dolore eius voluptatibus ab fuga.</p> </div>',
      button_name: 'Register',
    },
    form_items: {
      'name': {
        'label': '姓名',
        'component': 'input',
        'type': 'text',
        'icon': 'fas fa-user',
        'is_readonly': false,
        'value': '',
        'tip': '',
        'rules': {
          required: {
            warn: '此項目為必填'
          },
        },
        'is_error' : false,
        'warn': '',
        'is_show': true,
      },
      'cellphone': {
        'label': '手機',
        'component': 'input',
        'type': 'text',
        'icon': 'fas fa-mobile-alt',
        'is_readonly': false,
        'value': '',
        'tip': '',
        'rules': {
          required: {
            warn: '此項目為必填'
          },
          cellphone: {
            warn: '手機格式錯誤'
          }
        },
        'is_error' : false,
        'warn': '',
        'is_show': true,
      },
      'email': {
        'label': '電子信箱',
        'component': 'input',
        'type': 'text',
        'icon': 'fas fa-envelope',
        'is_readonly': false,
        'value': '',
        'tip': '',
        'rules': {
          required: {
            warn: '此項目為必填'
          },
          email: {
            warn: 'email格式不符',
          }
        },
        'is_error' : false,
        'warn': '',
        'is_show': true,
      },
      'account': {
        'label': '帳號',
        'component': 'input',
        'type': 'text',
        'icon': 'fas fa-user',
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
        'icon': 'fas fa-key',
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
      'confirm_password': {
        'label': '確認密碼',
        'component': 'input',
        'type': 'password',
        'icon': 'fas fa-key',
        'is_readonly': false,
        'value': '',
        'tip': '',
        'rules': {
          required: {
            warn: '此項目為必填'
          },
          confirm: {
            password: 'password',
            warn: '密碼不正確',
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
    console.log('register')
  }
</script>