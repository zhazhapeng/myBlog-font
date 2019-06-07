<template>
	<div id="eidtBlog">
		<!--输入区域-->
		<div v-if="!this.submite" id="input">
			<label>标题:</label>
			<input class="hieght" type="text" placeholder="请输入标题" v-model="blogs.title" value="" />
			<br />
			<label class="center">博文内容:</label>
			<textarea class="textarea" v-model="blogs.body"></textarea>
			<br /><br />
			<p>分类：</p>
				<ul>
					<li v-for="type in blogs.type" :key="type">{{type}}</li>
				</ul>
			<br /><br />
			<label>作者：</label>
			<select class="hieght" v-model="blogs.author">
				<option>大鹏</option>
				<option>菜鸡鹏</option>
				<option>渣渣鹏</option>
			</select>
			<br /><br />
			<button v-on:click.prevent="post">确认修改</button>
		</div>
		<div id="show" v-if="submite">
			<h2 style="text-align: center;">您的博客添加成功</h2>
			<h2>{{blogs.title}}</h2>
			<article>{{blogs.body}}</article>
			<p>作者：{{blogs.authors}}</p>
			<p>分类：</p>
			<ul>
				<li v-for="type in blogs.type" :key="type">{{type}}</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios'
export default{
	name:"eidtBlog",
	data(){
		return{
			id:this.$route.params.id,
			submite:false,
			blogs:{}
			
		}
	},
	methods:{
		post:function(){
//			更改数据库地址
//			this.$http.put('https://wd6831298446ycmyyj.wilddogio.com/posts/'+this.id+".json",this.blogs)
			axios.post('/api/users/update',this.blogs)
			.then((data)=>{
				this.submite=true;
				this.$router.push({path:'/show',query:{alert:"博客修改成功!"}});
			});
		}
	},
	
	created(){
//		this.$http.get('https://wd6831298446ycmyyj.wilddogio.com/posts/'+this.id+".json")
		axios.get('/api/users/show',{params:{'id':this.id}})
		.then((response)=>{
			this.blogs=response.data[0];
		});
		
	}
}

	
</script>

<style scoped>
	#eidtBlog{
		background: #F0F8FF;
		height: 90%;
		
	}
	#input{
		margin: 0 18%;
		padding: 3%;
		width: 70%;
	}
	.hieght{
		height: 30px;
		width: 35%;
	}
	label{
		font-weight: bolder;
		font-size: x-large;
		margin: 10px;
	}
	
	.textarea{
		height: 300px;
		width: 65%;
		color: black;
		background-color: greenyellow 0.3;
		font-size: x-large;
		font-weight: bold;
		
	}
	select{
		height: 30px;
		width: 35%;
	}
	button{
		display: block;
		margin: 50 0;
		padding: 15px 55px;
		background: red;
		border-radius: 4px;
		border: none;
		position: relative;
		left: 21%;
		color: white;
	}
	.center{
		display: block;
		position: relative;
		left: 20%;
	}
	#show{
		background: whitesmoke;
		height: 400px;
		width: 40%;
		margin: 0 auto;
		padding: 40px;
	}
	
</style>