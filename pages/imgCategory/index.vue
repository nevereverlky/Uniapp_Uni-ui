<template>
	<view class="category_tab">
		<view class="category_tab_title">
			<view class="title_inner">
				<uni-segmented-control 
				:current="current" 
				:values="items.map(v=>v.title)" 
				@clickItem="onClickItem" 
				styleType="text" 
				activeColor="#13227a">
				</uni-segmented-control>
			</view>
			<view class="iconfont iconhot1">
			</view>
		</view>
		<scroll-view @scrolltolower="handleScrolltolower" enable-flex scroll-y class="category_tab_content">
	        <view class="cate_item"
			v-for="item in vertical"
			:key="item.id">
			<image :src="item.thumb" mode="widthFix"></image>
			</view>
	    </scroll-view>
	</view>
</template>

<script>
	import {uniSegmentedControl} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{title: '最新',order: 'new'},
					{title: '热门',order: 'hot'}
				],
				current: 0,
				params:{
					limit: 30,
					skip: 0,
					order: 'new'
				},
				id: 0,
				vertical:[],
				hasMore: true
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getList()
		},
		methods: {
			onClickItem(e) {
				if(this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}else {
					//如果点击相同标题
					return;
				}
				this.params.order = this.items[e.currentIndex].order;
				this.params.skip = 0;
				this.vertical = [];
				this.getList()
			},
			getList() {
				this.request({
					url: 'http://157.122.54.189:9088/image/v1/vertical/category/'+this.id+'/vertical',
					data: this.params
				}).then(result=>{
					console.log(result);
					if(result.res.vertical.length === 0){
						this.hasMore = false;
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none'
						})
						return;
					}
					this.vertical = [...this.vertical,...result.res.vertical];
				})
			},
			//加载下一页数据
			handleScrolltolower() {
				if(this.hasMore) {
					this.params.skip += this.params.limit;
					this.getList()
				}else {
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.category_tab{
		.category_tab_title{
			position: relative;
			.title_inner{
				width: 60%;
				margin: 0 auto;
			}
			.iconhot1{
				position: absolute;
				top: 15%;
				transform: translateY(-5);
				right: 5%;
			}
		}
		.category_tab_content {
			display: flex;
			flex-wrap: wrap;
			height: calc(100vh - 36px);//当既想实现scrollview又想伸缩盒子flex，需在标签中加enable-flex
			.cate_item {
				width: 33.33%;
				border: 5rpx solid #fff;
				image {
					
				}
			}
		}
	}
</style>
