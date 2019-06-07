<template>
  <div id="app">
  		<peng></peng>
    <router-view></router-view>
  </div>
</template>

<script>
	import ShowBlogs from './components/Showblogs'
	import AddBlog from './components/AddBlog'
	import Peng from './components/Peng'
	import Card from './components/Card'
export default {
  name: 'App',
  components:{
  	AddBlog,ShowBlogs,Peng,Card
  }         
}
</script>

<style>

</style>
