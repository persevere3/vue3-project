<style scoped lang='scss'>

</style>

<template>
   <Header/>
   <slot></slot>
   <Footer/>
</template>

<script setup lang='ts'>
   import Header from './Header.vue'
   import Footer from './Footer.vue'
</script>