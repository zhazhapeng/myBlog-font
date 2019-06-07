<template>
	<div class="login">
		<div class="logo">
			<!--<img src="../assets/logo.jpg" alt="my login image"/>-->			
		</div>
		<!--手机号-->
		<InputGroup type="number" v-model="phone" placeholder="手机号" 
			:btnTitle="btnTitle" :disabled="disabled" 
			:error="errors.phone" @btnClick='getverifyCode' ></InputGroup>
		<!--验证码-->
		<p style="color: red;" v-show="this.errors.phone">{{this.errors.phone}}</p>
		<InputGroup type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code"/>
		<!--新用户登录自动注册-->
		<div class="login_des">
			<p>
				新用户登录即自动注册，表示已同意
				<span>《用户服务协议》</span>
			</p>
		</div>
		<!--登录按钮-->
		<div class="login_btn">
			<button :disabled="isClick" @click="handleLogin">登录</button>
			<button  @click="tomLogin">账号密码登录</button>
		</div>
	</div>
</template>

<script>
import InputGroup from './InputGroup'
	
	
export default{
	name:'login',
	data(){
		return{
			phone:'',
			verifyCode:"",
			errors:{},
			disabled:false,
			btnTitle:"获取验证码"
		}
	},
	computed:{
		isClick(){
			if(!this.phone || !this.verifyCode) return true;
			else return false;
		}
	},
	methods:{
		handleLogin(){
			//取消错误提醒
			this.errors={};
			//发送请求
			this.$axios.post("/api/sms_send",{
				phone:this.phone,
				code:this.verifyCode
			})
			.then(res =>{
				console.log(res);
				//检验成功 设置登录状态并且跳转到、
				localStorage.setItem("blog_login",true);
				this.$router.push("/");
			})
			.catch(err=>{
				//返回错误信息
				this.errors={
					code:err.response.data.msg
				};
				
			})
		},
		tomLogin(){
			this.$router.push("/mlogin");
		},
		getverifyCode(){
//			手机号验证
			if(this.validatePhone()){
				// 登录倒计时
				this.validateBtn();
				//发送网络请求 
				this.$axios.post("/api/sms_send",{
					tpl_id:"148314",
					key:"6fb58d377a7ced990880888f1488b3c0",
					phone:this.phone
				})
				.then(res=>{
					console.log(res);
				});
				
			}
		},
		validateBtn(){
			let time=60;
			let timer=setInterval(()=>{
				if(time==0){
					clearInterval(timer);
					this.btnTitle="获取验证码";
					this.disabled=false;
				}else{
					this.btnTitle=time+"秒后重试";
					time--;
					this.disabled=true;
					
				}
			},1000)
		},
		validatePhone(){
			if(!this.phone){
				this.errors={
					phone:"请填写手机号"
				};
				return false;
			}
			else if(!/^1[345678]\d{9}$/.test(this.phone)){
				this.errors={
					phone:"请填写正确的手机号码"
				};
				return false;
			}
			else{
				this.errors={};
				return true;
			}
			
		}
	},
	components:{
		InputGroup
	}
	
};
</script>

<style>
.login {
  width: 40%;
  height: 80%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
  margin: 0 auto;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
  
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 30%;
  margin: 8%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>