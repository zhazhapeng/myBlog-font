<template>
	<!--路由参数-->
	<div id="single-bolg">
		<h2>{{blog.title}}</h2>
		<br />
		<article>{{blog.body}}</article>
		<br />
		<p>作者：{{blog.author}}</p>
		<p>分类：</p>
		<ul>
			<li v-for="type in blog.type" :key="type">{{type}}</li>
		</ul>
		<br /><br />
		<div class="button">
			<button class="flex-item"><router-link class="route" v-bind:to="'/eidt/' + id">编辑</router-link></button>
			<button class="flex-item" v-on:click="deleteSingle()">删除</button>
		</div>
		
		
	</div>
</template>

<script>
import axios from 'axios'
export default{
	name:"single-blog",
	data(){
		return{
			id:this.$route.params.id,
			blog:{}
		}
	},
	methods:{
		deleteSingle:function(){
			axios.get('/api/users/delete',{params:{'id':this.id}})
			.then(response=>{
				this.$router.push({path:'/show',query:{alert:"博客删除成功!"}});
			})
		}
		
	},
	
	created(){
//		axios.get('/api/users/showCourse/'+this.id)
		axios.get('/api/users/show',{params:{'id':this.id}})
		.then((response)=>{
			this.blog=response.data[0];
		});
	}
	
}
	
</script>

<style scoped>
	#single-bolg{
		background: whitesmoke;
		height: 400px;
		width: 40%;
		margin: 0 auto;
		padding: 40px;
	}
	.button{
		display: flex;
		flex-flow: row;
		justify-content:space-around;
	}
	.button button{
		margin: 50 0;
		padding: 10px 30px;
		background: red;
		border-radius: 4px;
		border: none;
		color: white;
		font-size: large;
		font-weight: bold;
		text-decoration: none;
	}
	.route{
		color: white;
		font-size: large;
		font-weight: bold;
		text-decoration: none;
	}
</style>