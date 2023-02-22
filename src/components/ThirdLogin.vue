<style scoped lang='scss'>
  .third_login {
    width: 600px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .button {
      flex: 1 1 1px;
    }
  }
</style>

<template>
  <div class="third_login">
    <div class="button" style="background-color: #3B5998;" @click="FBLogin">  使用 Facebook 繼續 </div>
    <!-- <div class="button" style="background-color: rgb(127,118,118);">  使用 Google 繼續 </div> -->
    <GoogleLogin :callback="callback" />
    <div class="button" style="background-color: #00c300;" @click="LineLogin">  使用 Line 繼續 </div>
  </div>
</template>

<script setup lang='ts'>
  import { reactive, toRefs, ref, onMounted} from 'vue'

  import { GoogleLogin, decodeCredential} from 'vue3-google-login'
  const GOOGLE_CLIENT_ID = '877753746517-im9q8pu2baeidnbbfvg5duk06030s42i.apps.googleusercontent.com'

  // FB ==================================================
  let window2: any = window

  window2.fbAsyncInit = function() {
    // @ts-ignore
    FB.init({
      appId      : '851665509219913',
      cookie     : true,
      xfbml      : true,
      version    : 'v15.0'
    });
      
    // @ts-ignore
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
    var js: any, fjs: any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function FBLogin() {
    // @ts-ignore
    FB.getLoginStatus(function(response: any) {
      if (response.status === "connected") {
        getFBProfile();
      } else {
        // @ts-ignore
        FB.login(function(res: any) {
          console.log(res)
          getFBProfile();
        });
      }
    });
  }
  function FBLogout() {
    // 檢查登入狀態
    // @ts-ignore
    FB.getLoginStatus(function(response: any) {
      // 檢查登入狀態
      if (response.status === "connected") {
        // 移除授權
        // @ts-ignore
        FB.api("/me/permissions", "DELETE", function(res: any) {
          // 用戶登出
          // @ts-ignore
          FB.logout();
        });
      } else {
        // do something
      }
    });
  }
  function getFBProfile() {
    // @ts-ignore
    FB.api("/me?fields=name, id, email", function(res: any) {
      console.log(res)
    });
  }

  // Google ==================================================

  function callback(response: any) {
    console.log(response)
    // decodeCredential will retrive the JWT payload from the credential
    const userData = decodeCredential(response.credential)
    console.log("Handle the userData", userData)
  }

  // Line ==================================================
  const client_id = '1657797715';
  const client_secret = 'b405c6cac53870053a3b4a43b465b7df';
  const redirect_uri = `https://demo.uniqcarttest.tk/uniqvideo/`;
  let LineToken = '';

  const code = location.href.split('code=')[1] && 
                   location.href.split('code=')[1].split('&')[0];
  if(code){
    window.history.replaceState({}, document.title, "/uniqvideo/");
    getLineToken();
  }

  function LineLogin() {
    let link = 'https://access.line.me/oauth2/v2.1/authorize?';
    link += 'response_type=code';
    link += '&client_id=' + client_id;
    link += '&redirect_uri=' + redirect_uri;
    link += '&state=login';
    link += '&scope=openid%20profile';
    window.location.href = link;
  }
  function getLineToken() {
    let obj: any = {
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        client_secret
    };
    var body: any = [];
    for (let key in obj) {
      let value = obj[key];
      body.push(`${key}=${value}`);
    }
    body = body.join("&");

    let xhr = new XMLHttpRequest();
    xhr.open('post', `https://api.line.me/oauth2/v2.1/token`, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.withCredentials = true;
    xhr.send(body);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        LineToken = JSON.parse(xhr.response).access_token
        getLineProfile()
      }
    }
  }
  function getLineProfile() {
    let xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.open('get', `https://api.line.me/oauth2/v2.1/userinfo`, true);
    xhr.setRequestHeader("Authorization", `Bearer ${LineToken}`); 
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhr.response));
      }
    }
  }
</script>