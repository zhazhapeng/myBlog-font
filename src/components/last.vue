<template>
	<div id="swiper">
		<!--轮播图展示区域-->
		<div class="slide-img" @mouseover="stop" @mouseleave="autoplay">
			<!--使用vue中的transition实现图片的无缝滑动效果-->
			<transition name="show">
				<div class="slide" v-for="(item,index) in imgs" :key="index" v-if="mark === index">
					<img :src="item" />
					<h3>{{title[index]}}</h3>
				</div>
			</transition>
		</div>

		<!--底部导航条部分(不需要可以删除)-->
		<!-- 上一页 -->
		<ul class="slide-page">
			<li @click="sub">&lt;</li>
			<li v-for="(item,index) in imgs" @click="goto(index)">
				<a :class="{red:mark===index}">{{ index + 1 }}</a>
			</li>
			<!-- 下一页 -->
			<li @click="add">&gt;</li>
		</ul>
	</div>
</template>

<script>
//	导入的图片
	import img1 from '../assets/slide/b1.jpg'
	import img2 from '../assets/slide/b2.jpg'
	import img3 from '../assets/slide/b3.jpg'
	import img4 from '../assets/slide/b4.jpg'
	export default {
		name: "slide",
		data() {
			return {
				isShow: true,
				mark: 0,
				imgs: [img1, img2, img3, img4],
				title:["xxxxxx1","xxxxxx2","救救中国 996 程序员！GitHub 近 230,000 Star、Python 之父伸张正义！				","xxxxxx4"]
			}
		},
//		绑定属性:轮播图的播放速度,组件调用时可以修改的参数
		props: {
			speed: {
				type: Number,
				default: 200000

			}
		},
		methods: {
			//下一页
			add() {
				this.stop();
				setTimeout(() => {
					this.mark++;
					if(this.mark == 4) {
						this.mark = 0;
					}
				}, 30);
				this.autoplay();
			},
			//上一页
			sub() {
				this.stop();
				setTimeout(() => {
					this.mark--;
					if(this.mark == -1) {
						this.mark = 3;
					}
				}, 30);
				this.autoplay();
			},
			//自动播放
			autoplay() {
				this.timer = setInterval(() => {
					this.mark++;
					if(this.mark == 4) {
						this.mark = 0;
					}
				}, this.speed)
			},
			//鼠标移入停止，移除继续
			stop() {
				clearInterval(this.timer);
			},
			//点击后跳转到指定页
			goto(num) {
				//				console.log(num);
				this.stop();
				setTimeout(() => {
					this.mark = num;
				}, 30);
				this.autoplay();
			}
		},
		//在页面created后开始执行轮播函数
		created() {
			this.autoplay();
		}
	}
</script>

<style scoped>
	.slide-img {
		margin: 0 auto;
		position: absolute;
		left: 30%;
		top: 70%;
		width: 600px;
		height: 360px;
		overflow: hidden;
	}
	
	.slide {
		margin: 0 auto;
		position: absolute;
		border: 1px;
	}
	
	.slide img {
		width: 600px;
		height: 200px;
	}
	.slide h3{
		position: absolute;
		color: white;
		left: 0px;
		top: 165px;
	}
	
	/*主要的滑动效果代码*/
	/*进入的初始状态*/
	.show-enter {
		transform: translateX(400px);
	}
	.show-enter-active {
		transition: all 0.8s ease;
	}
	/*进入的结束状态*/
	.show-enter-to {
		transform: translateX(0px);
	}
	/*离开的初始状态*/
	.show-leave {
		transform: translateX(0px);
	}
	.show-leave-active {
		transition: all 0.8s ease;
	}
	/*离开的结束状态*/
	.show-leave-to {
		transform: translateX(-400px);
	}
	
	
	.slide-page {
		margin: 0 auto;
		padding: 10px;
		width: 600px;
		top: 100%;
		left: 30%;
		position: absolute;
		background: rgba(0, 0, 0, 0.7);
		
	}
	
	.slide-page li {
		display: inline-block;
		padding: 0 10px;
		cursor: pointer;
		color: #fff;
	}
	
	.slide-page li .on {
		text-decoration: underline;
	}
	
	.red {
		background: indianred;
		width: 5px;
		height: 5px;
		border-radius: 8px;
		position: relative;
	}
</style>