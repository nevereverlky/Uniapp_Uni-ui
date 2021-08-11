<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		//定义全局数据 通过globalData来实现
		// globalData:{
		// 	base:''
		// }>>>>getApp().globalData.base取出
	}
</script>

<style>
	/*每个页面公共css */
	@import "./style/iconfont.wxss";
	@import "./style/base.wxss";
</style>
