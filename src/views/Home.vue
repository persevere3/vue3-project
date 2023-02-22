<style scoped lang='scss'>
  .home {
    .category_container, .course_container{
      .title {
        padding: 0 5px;
        margin-bottom: 20px;
        font-size: 32px;
        font-weight: 900;
      }

      .category {
        margin-bottom: 20px;
        .category_title {
          padding: 0 5px;
          margin-bottom: 10px;
          font-size: 24px;
          position: relative;
          display: flex;

          .text {
            padding-right: 15px;
            background: #fff;
          }

          &:before {
            content: '';
            width: calc(100% - 10px);
            height: 1px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px dashed $primary;
            z-index: -1;
          }
        }
      }

      .courses {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 25%;
          padding: 5px;
          cursor: pointer;

          a {
            color: #333;
          }

          .name, .author, .star_container {
            margin-bottom: .5rem;
          }
          .img {
            width: 100%;
            padding-bottom: 100%;
            margin-bottom: 1rem;
            background: #eee;
            position: relative;

            img {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          .name {
            line-height: 1.2rem;
            font-weight: 900;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .author {
            color: #1c1d1f;
          }
          .star_container {
            display: flex;

            .score {
              margin-right: 10px;
              color: #b4690e;
              font-weight: 900;
            }
            .star {
              margin-right: 10px;
              color: #e59819;
            }

            .number {
              color: #6a6f73;
            }
          }
          .price {
            font-weight: 900;
          }
        }
      }
    }

    .introduce_container {
      background: #eee;

      ul {
        display: flex;
        li {
          flex: 1 1;
          padding: 0 5px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon {
            width: 70px;
            height: 70px;
            margin-bottom: 50px;
            border-radius: 70px;
            background-color: $primary;
            color: #fff;
            font-size: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &:before {
              content: '';
              width: 1px;
              height: 40px;
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              border: 1px dashed $primary;
            }
          }

          .text {
            font-weight: 900;
          }
        }
      }
    }

    .third_login {
      display: none;
    }
  }
</style>

<template>
  <div class="home">
    <!-- <Banner/> -->
    <div class="container category_container"> 
      <div class="title"> {{ $t('__popular_categories') }} </div>

      <div class="category" v-for="(category, index) in categories" :key="index">
        <div class="category_title"> <div class="text"> {{ category.category_title }} </div> </div>
        <ul class="courses">
          <li v-for="(course, index2) in category.courses" :key="index2">
            <router-link to="/">
              <div class="img"> <img :src="`https://picsum.photos/500?random=${index * 10 + index2}`" alt=""> </div>
              <div class="name"> {{ course.name }} </div>
              <div class="author"> {{ course.author }} </div>
              <div class="star_container">
                <div class="score"> {{ course.score }} </div>
                <div class="star"> 
                  <i class="fa-solid fa-star" v-for="item in (Math.floor(course.score))"></i>
                  <i class="fa-duotone fa-star-half-stroke" v-if="course.score - (Math.floor(course.score))"></i>
                </div>
                <div class="number"> ({{ course.number }}) </div>
              </div>
              <div class="price"> NT$ {{ numberThousands(course.price) }} </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="introduce_container">
      <div class="container">
        <ul>
          <li v-for="(introduce, index) in introduces" :key="index">
            <div class="icon" v-html="introduce.icon"> </div>
            <div class="text"> {{ introduce.text }} </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="container course_container"> 
      <div class="title"> 暢銷課程 </div>

      <ul class="courses">
        <li v-for="(course, index2) in courses" :key="index2">
          <router-link to="/">
            <div class="img"> <img :src="`https://picsum.photos/500?random=${50 + index2}`" alt=""> </div>
            <div class="name"> {{ course.name }} </div>
            <div class="author"> {{ course.author }} </div>
            <div class="star_container">
              <div class="score"> {{ course.score }} </div>
              <div class="star"> 
                <i class="fa-solid fa-star" v-for="item in (Math.floor(course.score))"></i>
                <i class="fa-duotone fa-star-half-stroke" v-if="course.score - (Math.floor(course.score))"></i>
              </div>
              <div class="number"> ({{ course.number }}) </div>
            </div>
            <div class="price"> NT$ {{ numberThousands(course.price) }} </div>
          </router-link>
        </li>
      </ul>
    </div>

    <ThirdLogin/>
  </div>
</template>

<script setup lang='ts'>
  import Banner from '../components/home/Banner.vue'
  import ThirdLogin from '../components/ThirdLogin.vue'

  const categories = [
    {
      category_title: '網頁開發',
      courses: [
        {
          img: '',
          name: '(Ken Cen出品)建網百科全書-使用 HTML,CSS,JS, jQuery,php,mySQL 建立網站',
          author: 'Ken Cen',
          score: 4.9,
          number: 2702,
          price: 2290
        },
        {
          img: '',
          name: '2022網頁開發全攻略(HTML, CSS, JavaScript, React, SQL, Node, more)',
          author: 'Wilson Ren',
          score: 4.6,
          number: 2504,
          price: 2190
        },
        {
          img: '',
          name: 'The Complete 2020 Fullstack Web Developer Course',
          author: 'Kalob Taulien',
          score: 4.5,
          number: 6644,
          price: 2290
        },
      ]
    },
    {
      category_title: '財務金融',
      courses: [
        {
          img: '',
          name: 'The Complete 2020 Fullstack Web Developer Course',
          author: 'Kalob Taulien',
          score: 4.5,
          number: 6644,
          price: 2290
        },
        {
          img: '',
          name: '(Ken Cen出品)建網百科全書-使用 HTML,CSS,JS, jQuery,php,mySQL 建立網站',
          author: 'Ken Cen',
          score: 4.9,
          number: 2702,
          price: 2290
        },
        {
          img: '',
          name: '2022網頁開發全攻略(HTML, CSS, JavaScript, React, SQL, Node, more)',
          author: 'Wilson Ren',
          score: 4.6,
          number: 2504,
          price: 2190
        },
        {
          img: '',
          name: 'The Complete 2020 Fullstack Web Developer Course',
          author: 'Kalob Taulien',
          score: 4.5,
          number: 6644,
          price: 2290
        },
        {
          img: '',
          name: '(Ken Cen出品)建網百科全書-使用 HTML,CSS,JS, jQuery,php,mySQL 建立網站',
          author: 'Ken Cen',
          score: 4.9,
          number: 2702,
          price: 2290
        },
        {
          img: '',
          name: '2022網頁開發全攻略(HTML, CSS, JavaScript, React, SQL, Node, more)',
          author: 'Wilson Ren',
          score: 4.6,
          number: 2504,
          price: 2190
        }
      ]
    },
  ]

  const introduces = [
    {
      icon: '<i class="fa-solid fa-play"></i>',
      text: '運用超過213000堂影片課程，學習搶手技能',
    },
    {
      icon: '<i class="fa-solid fa-book"></i>',
      text: '選擇現實世界專家傳授的課程',
    },
    {
      icon: '<i class="fa-solid fa-mobile"></i>',
      text: '無論是行動裝置或桌上型設備都有終身存取權，讓您以自己的步調學習',
    }
  ]

  const courses = [
    {
      img: '',
      name: 'The Complete 2020 Fullstack Web Developer Course',
      author: 'Kalob Taulien',
      score: 4.5,
      number: 6644,
      price: 2290
    },
    {
      img: '',
      name: '(Ken Cen出品)建網百科全書-使用 HTML,CSS,JS, jQuery,php,mySQL 建立網站',
      author: 'Ken Cen',
      score: 4.9,
      number: 2702,
      price: 2290
    },
    {
      img: '',
      name: '2022網頁開發全攻略(HTML, CSS, JavaScript, React, SQL, Node, more)',
      author: 'Wilson Ren',
      score: 4.6,
      number: 2504,
      price: 2190
    },
    {
      img: '',
      name: 'The Complete 2020 Fullstack Web Developer Course',
      author: 'Kalob Taulien',
      score: 4.5,
      number: 6644,
      price: 2290
    },
  ]

  function numberThousands(number: Number) {
    return String(number).replace( /(\d)(?=(?:\d{3})+$)/g, '$1,')
  }

</script>