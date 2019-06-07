<template>
	<div id="peng">
		<ul>
			<li>
				<router-link to="/show" exact>博客主页</router-link>	
				<router-link to="/add" exact>添加博客</router-link>	
			</li>
		</ul>
	</div>
	
</template>

<script>
	export default{
		name:"peng"
	}
	
	
</script>

<style scoped>
	#peng{
	background: crimson;
	padding: 30px 0;
	margin-bottom: 40px;
	}
	ul{
		list-style-type: none;
		text-align: center;
		margin: 0;
	}
	li{
		display: block;
		margin: 0 10px;
	}
	
	a{
		color: #fff;
		padding: 20px;
		text-decoration: none;
		border-radius: 5px;
	}
	.router-link-active{
		background: rgba(255,255,255,0.8);
		color: #444;
	}
	
	
</style>