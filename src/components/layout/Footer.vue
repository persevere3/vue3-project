<style scoped lang='scss'>
  footer {
    padding: 30px 50px;
    background-color: #fcf8f5;
    color: #a59c9c;
    display: flex;
    flex-wrap: wrap;

    .link_container {
      width: 50%;
      padding: 0 50px;

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        height: 150px;

        li {
          a {
            display: block;
            height: 30px;
            line-height: 30px;
            color: #a59c9c;


            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .community_container{
      width: 50%;
      padding: 0 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo {
        a {
          display: block;
          padding: 20px 40px;
          border: 1px solid $primary;
          font-size: 32px;
          color: rgb(127, 118, 118);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .copy_right {
      width: 100%;
      margin-top: 30px;
      text-align: center;
    }
  }
</style>

<template>
  <footer>
    <div class="link_container">
      <ul>
        <li v-for="(item, index) in footer" :key="index">
          <router-link to="/"> {{ item.text }} </router-link>
        </li>
      </ul>
    </div>
    <div class="community_container">
      <div class="logo">
        <router-link to="/"> UNIQ VIDEO </router-link>
      </div>
    </div>
    <div class="copy_right"> © 資源取自網路，僅作測試使用 by UNIQ </div>
  </footer>
</template>

<script setup lang='ts'>
  const footer = [
    {
      text: '關於我們',
      link: ''
    },
    {
      text: '聯繫我們',
      link: ''
    },
    {
      text: '在 UNIQ 上教學',
      link: ''
    },
    {
      text: '職涯',
      link: ''
    },
    {
      text: '部落格',
      link: ''
    },
    {
      text: '說明與資源',
      link: ''
    },
    {
      text: '加盟',
      link: ''
    },
    {
      text: '投資者',
      link: ''
    },
    {
      text: '條款',
      link: ''
    },
    {
      text: '隱私權政策',
      link: ''
    },
  ]
</script>