<template>
	<div class="jumbotron text-center">
		<h1 class="display-3">{{title}}</h1>
		<p class="lead">欢迎来到大鹏的个人博客</p>
		<a href="/show" class="btn btn-dark btn-lg">查看我的博客</a>
		<div class="swiper">
			<swiper :speed="speed"></swiper>
		</div>
	</div>
</template>

<script>
	import last from './last'
	export default{
		name:'card',
		data(){
			return{
				title:"大鹏的博客",
				speed:2000
			}
		},
		components:{
			"swiper":last
		}
	}
</script>

<style>
	
	
</style>