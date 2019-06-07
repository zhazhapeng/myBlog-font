<template>
  <div class="mlogin">
  		<!--注册成功提示-->
  	<div v-if="alert" id="alert" class="alert alert-success alert-dismissible fade show" role="alert">
		  <strong>{{alert}}</strong>
		  <button v-on:click="hidden" type="button" class="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
        <div class="login_box">
            <div class="title">用户登录</div>
            <div>
                <input class="myinput" type="text" placeholder="手机号/用户名" v-model="username" />
            </div>
            <div>
                <input @keyup.13="login" class="myinput" type="password" placeholder="输入密码" v-model="password" />
            </div>
            <div class="login_other">
                <a href="javascript:;">找回密码</a>
                <input type="checkbox" id="remenberme" /><label for="remenberme">记住我</label>
            </div>
            <button :disabled="disablebtn" class="loginbtn" @click="login">{{loginText}}</button>
            <button class="loginbtn" @click="register">注册</button>
        </div>
        
  </div>
</template>

<script>
 import axios from 'axios'   
    export default {
      name: 'mlogin',
      data () {
        return {
                username:"admin",/*TODO:先预存测试值，以免手动输入*/
                password:"",
                disablebtn:false,
                loginText:"登录",
                alert:''
        }
      },
      methods:{
      			//点击隐藏
      			hidden(){
									var dis=document.getElementById("alert");
									dis.style.display="none";
									
								},
            login(){
                  var _this = this;
	                this.disablebtn = true;
	                this.loginText = "登录中...";
	                //this.$reqs就访问到了main.js中绑定的axios
	                axios.post("/api/users/login",{
	                        username:this.username,
	                        password:this.password
	                })
										.then(res =>{
											//检验成功 设置登录状态并且跳转到、
										
											if(res.data.err){
												this.alert=res.data.err;
												 this.disablebtn = false;
	               				 this.loginText = "登录";
											}else{
												localStorage.setItem("blog_login",true);
												this.$router.push("/");
											}
											
										})
	                .catch(function (error) {
	                    //失败
	                    _this.disablebtn = false;
	                    _this.loginText = "登录"
	                });
            },
            register(){
            	this.$router.push({path:'/register'});
            },
      },
        beforeRouteEnter (to, from, next) {
							if(from.name==='register'){	
								next(vm=>{
//									console.log(vm);
									vm.alert='用户注册成功！';
								});
							}
							next();
				  	}

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header{
        height: 60px;
        box-shadow: 0 1px 5px rgba(13,62,73,0.2) ;
    }
    .header img{
        width: 170px;
        margin-top: 12px;
        margin-left: 15px;
        float: left;
    }
    .header span{
        float: left;
        color: #566a80;
        margin: 21px 0 0 20px;
    }
    .login_box{
        width: 320px;
        margin: 50px auto;
    }
    .login_box .myinput{
        width: 100%;
        border: 1px solid #cad3de;
        height: 40px;
        line-height: 40px;
        margin: 5px 0 10px;
        border-radius: 3px;
        padding: 0 10px;
        outline: none;
        box-sizing: border-box;
    }
    .login_box .myinput:focus{
        border: 1px solid #4289dc;
    }
    .login_other{
        overflow: hidden;
    }
    
    .login_other a{
        float: right;
        color: #727f8f;
    }
    .login_other a:hover{
        color: #273444;
    }
    .login_other input, .login_other label{
        float: left;
        color: #727f8f;
    }
    .login_other input{
        margin: 4px 5px 0 0;
    }
    .loginbtn:hover{
        background: #8bda81;
    }
    .login[disabled]{
        opacity: 0.8;
    }
    .login[disabled]:hover{
        background:#4187db;
    }
    .title{
        color: #273444;
        font-size: 1.5em;
        text-align: center;
        margin: 0 0 20px 0;
    }
    .loginbtn{
    		width: 100%;
    		padding: 7px;
    		margin-top: 15px;
    		background: #48ca38;
    		 border-radius: 7px;
    		 color: #fff;
    		 outline: none;
    		 border: none;
    }
    
    @media only screen and (max-width: 768px) {
        .login_box{
            width: 280px;
            margin: 50px auto;
        }
    }
</style>