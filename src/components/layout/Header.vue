<style scoped lang="scss">
  header {
    height: 70px;
    padding: 0 20px;
    background: $secondary;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
    position: sticky;
    top: 0;
    z-index: 100;

    .logo_container {
      flex: 0 0;
      font-size: 32px;
      color: $primary;
      white-space: nowrap;

      a {
        color: $primary;
      }
    }

    .search_container {
      flex: 1 1;
      margin: 0 20px;
      color: $primary;
      position: relative;

      .icon {
        width: 50px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      } 
      input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 20px 0 50px;
        border-radius: 40px;
        border: 1px solid $primary;
        background: transparent;
        transition: .3s;

        &:focus {
          box-shadow: 0 0 3px 1px $primary;
        }
      }
    }

    .language_container {
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .button {
        padding: 0 10px;
      }

      ul {
        position: absolute;
        top: calc(100% + 3px);
        right: 0;
        box-shadow: 1px 1px 3px 1px $primary;
        
        li {
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          @include border;
          border: none;
          white-space: nowrap;
          cursor: pointer;
        }
      }
    }

    .user_container {
      flex: 0 0;
      margin-left: auto;
      white-space: nowrap;
    }
  }
</style>

<template>
  <header class="flex align_items_center">
    <div class="logo_container"> <router-link to="/"> UNIQ VIDEO </router-link> </div>
    <div class="search_container">
      <div class="icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <input type="text">
    </div>
    <div class="user_container flex">
      <router-link to="/login"> <div class="button border"> 登入 </div> </router-link>
      <router-link to="/register"> <div class="button"> 註冊 </div> </router-link>
    </div>
    <div class="language_container">
      <div class="button border" @click.stop="lang_ul_active = !lang_ul_active">
        <i class="fa-solid fa-language"></i>
      </div>
      <ul v-show="lang_ul_active">
        <li @click="handleChangeLanguage('tw');">
          繁體中文
        </li>
        <li @click="handleChangeLanguage('en');">
          English
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang='ts'>
  import { reactive, toRefs, onMounted} from 'vue'

  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  const state = reactive({
    lang_ul_active: false
  })
  let { lang_ul_active } = toRefs(state);

  function handleChangeLanguage(lang: string) {
    locale.value = lang;
  }

  onMounted(() => {
    document.body.addEventListener('click', () => {
      state.lang_ul_active = false;
    })
  })
</script>
