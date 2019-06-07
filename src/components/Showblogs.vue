<template>
	<div v-them="'narrow'" id="show-blogs">
		<div v-if="alert" id="alert" class="alert alert-success alert-dismissible fade show" role="alert">
		  <strong>{{alert}}</strong>
		  <button v-on:click="hidden" type="button" class="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<label style="font-size: x-large; font-weight: bold;">搜索：</label><input type="text" v-model="search"	placeholder="搜索" />
		<br />
		<div  v-for="blog in filteredBlogs" class="blogs">
			<router-link v-bind:to="'/blog/' + blog._id">
			<h3 v-rainbow>{{blog.title | to-uppercase}}</h3>
			</router-link>
			<p>{{blog.body}}</p>
		</div>

	</div>

</template>

<script>
import axios from 'axios'	
export default{
	name:"show-blogs",
	data(){
		return {
			search:'',
			alert:'',
			blogs:[]
		}
	},
	created:function(){
//		如果请求的是本地数据,必须要放到static文件夹里 
//		this.$http.get("https://wd6831298446ycmyyj.wilddogio.com/posts.json")
		axios.get("/api/users/showCourse")
			   .then((data)=> {
        return data.data;
      })
      .then((data)=>{
        var blogsArray=[];//保存每个对象的数组
        for(let key in data){
          data[key].id = key;//给每个对象添加id(这个key就是每次保存，自动生成的name)
          blogsArray.push(data[key]);
        }
        this.blogs = blogsArray;
      })
	},
	updated:function(){
		if(this.$route.query.alert){
			this.alert=this.$route.query.alert;
		}
	},
	computed:{
//		过滤匹配博客
	filteredBlogs:function(){
		return this.blogs.filter((blog)=>{
			return blog.title.match(this.search);
		})
	  }
	},
	methods:{
		hidden:function(){
			var dis=document.getElementById("alert");
			dis.style.display="none";
			
		}
	}
}

</script>

<style scoped>
	#show-blogs{
		margin: 0 auto;
	}
	
.blogs{
	/*width: 60%;*/
	background: aliceblue;
	margin: 30px;
	padding: 50px;
}
	input{
		height: 30px;
		width: 80%;
	}

</style>