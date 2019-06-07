<template>
  <div class="backlogin">
  			<!--提示-->
  	<div v-if="alert" id="alert" class="alert alert-success alert-dismissible fade show" role="alert">
		  <strong>{{alert}}</strong>
		  <button v-on:click="hidden" type="button" class="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
  	
        <div class="login_box">
            <div class="title">用户注册</div>
            <div class="input_group">
            	<label>用户名：</label>
                <input class="myinput" required='true' type="text" placeholder="用户名" v-model="username" />
            </div>
            <div class="input_group">
            	<label>邮箱：</label>
                <input class="myinput email" required="true" type="email" placeholder="邮箱" v-model="email" />
            </div>
            
            <div class="input_group">
            	<label>密码：</label>
                <input class="myinput email" required="true" type="password" placeholder="口令" v-model="password"  />
            </div>
            
            <div class="input_group">
            	<label>确认密码：</label>
                <input class="myinput" required="true" type="password" placeholder="口令" v-model="password1"  />
            </div>
            <div class="login_other">
                <a href="javascript:;">找回密码</a>
                <input type="checkbox" id="remenberme" /><label for="remenberme">记住我</label>
            </div>
            <button :disabled="disablebtn" class="login" @click="register">{{loginText}}</button>
        </div>
        
  </div>
</template>

<script>
import axios from 'axios'
    export default {
      name: 'backlogin',
      data () {
        return {
                username:"",/*TODO:先预存测试值，以免手动输入*/
               	email:"",
               	password1:"",
                password:"",
                disablebtn:false,
                loginText:"注册",
                alert:''
        }
      },
      methods:{
      				hidden(){
									var dis=document.getElementById("alert");
									dis.style.display="none";
									
								},
            register(){

										this.goto()
										
										.then((data)=>{
											for(var i in data[0]){
												this.alert=data[0][i];
//												console.log(data[0][i]);
											}
											if(data.length===0){
		                  var _this = this;
			                this.disablebtn = true;
			                this.loginText = "注册中...";
			                //this.$reqs就访问到了main.js中绑定的axios
			                axios.post("/api/users/register",{
			                        username:this.username,
			                        password:this.password,
			                        email:this.email
			                })
													.then(res =>{
														console.log(res);
														//检验成功 设置登录状态并且跳转到、
														this.$router.push({path:'/mlogin'});
													})
			
			                .catch(function (error) {
			                    //失败
			                    _this.disablebtn = false;
			                    _this.loginText = "注册"
			                });
	            			}
											else{
	            				this.ifshow=true,
	            				console.log(data.length);
	//          				console.log(errors.msg);
	            			}    
										})
            				        			
            			
            },
            goto(){
            		var errors=[];
            			//登录验证
            			if(this.username==""){
            				errors.push({username:"用户名不能为空"});
            			
            			}
            			else if(this.email==""){
            				errors.push({email:"邮箱不能为空"});
            				
            			}
            			else if(this.password1!==this.password){
            				errors.push({msg:"两次密码输入不一致！"});
            				
            			}else if(this.password.length<5){
            				errors.push({msg:"密码长度不能低于5位！"});
            				
            			}
            	return Promise.resolve(errors)
            }
           
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
        width: 400px;
        margin: 50px auto;
    }
    .login_box .myinput{
        width: 66%;
        float: right;
        border: 1px solid #cad3de;
        height: 40px;
        line-height: 40px;
        margin: 5px 0 10px;
        border-radius: 3px;
        padding: 0 10px;
        outline: none;
        box-sizing: border-box;
    }
    .login_box .myinput.email{
    	position: relative;
        width: 66%;
        float: right;
        border: 1px solid #cad3de;
        height: 40px;
        line-height: 40px;
        margin: 5px 0 0  15px;
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
    .input_group{
    	display: inline-block;
    }
    .input_group label{
    	 padding: 10px 10px;
    	float: left;
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
    .login{
    		width: 100%;
    		padding: 7px;
    		margin-top: 15px;
    		background: #48ca38;
    		 border-radius: 7px;
    		 color: #fff;
    		 outline: none;
    		 border: none;
    }
    .login:hover{
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
    
    @media only screen and (max-width: 768px) {
        .login_box{
            width: 280px;
            margin: 50px auto;
        }
    }
</style>