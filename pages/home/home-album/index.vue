<template>
	<scroll-view class="album-view" scroll-y @scrolltolower="handleToLower">
		<!--swiper
		1 自动轮播 autoplay
		2 指示器 indicator-dots
		3 衔接轮播 circular
		
		4 swiper 默认高度 150px
		5 image 默认宽度 320px => 基本样式base.wxss中重置了100%
		        默认高度 240px
		6 计算图片的宽度和高度的比例
		7 把图片的比例也写到swiper标签样式
		8 swiper-item宽高默认100%-->
		
		<!--轮播图开始-->
		<view class="album_swiper">
			<swiper
			autoplay
			indicator-dots
			circular>
				<swiper-item
				v-for="item in banner"
				:key="item.id">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<!--轮播图结束-->
		
		<!--列表开始-->
		<view class="album_list">
			<navigator class="album_item"
			v-for="item in album"
			:key="item.id"
			:url="'/pages/album/index?id='+item.id">
				<view class="album_img">
					<image mode="aspectFill" :src="item.cover"></image>
				</view>
				<view class="album_info">
					<view class="album_name">{{item.name}}</view>
					<view class="album_desc">{{item.desc}}</view>
					<view class="album_btn">
						<view class="album_attention">关注</view>
					</view>
				</view>
			</navigator>
		</view>
		<!--列表结束-->
	</scroll-view>
</template>

<script>
	export default{
		data() {
			return {
				params: {
					limit: 30,
					order: 'new',
					skip: 0
				},
				//轮播图数组
				banner: [],
				//列表数组
				album: [],
				//是否还有分页数据
				hasMore: true
			}
		},
		mounted() {
			//修改页面标题
			// uni.setNavigationBarTitle({title: "专辑"})
			this.getList();
		},
		methods: {
			//获取接口数据
			getList() {
				this.request({
					url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
					data: this.params
				}).then(result=>{
					if(this.banner.length === 0){
					    this.banner = result.res.banner;
					}
					if(result.res.album.length === 0){
						this.hasMore = false;
						uni.showToast({
							title:'没有更多数据了',
							icon:'none'
						});
						return;
					}
					this.album = [...this.album,...result.res.album];
				})
			},
			//上拉加载-执行分页
			handleToLower() {
				if(this.hasMore){
					this.params.skip+=this.params.limit;
					this.getList();
				}else{
					uni.showToast({
						title:'没有数据了',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album-view{
		height: calc(100vh - 36px);
	}
	
	.album_swiper{
		swiper{
			//750rpx 326.0869....
			//height: calc(750rpx / 2.3)
			height: 326.1rpx;
			image {
				height: 100%;
			}
		}
	}
	
	.album_list{
		padding: 10rpx;
		.album_item{
			padding: 10rpx 0;
			display: flex;//弹性容器
			border-bottom: 1rpx solid #ccc;
			.album_img{
				flex: 1;//占一份
				padding: 10rpx;
				image {
					width: 200rpx;
					height: 200rpx;
				}
			}
			.album_info{
				flex: 2;//占两份
				padding: 0 10rpx;
				overflow: hidden;//超出就截取
				.album_name{
					font-size: 30rpx;
					color: #000;
					padding: 10rpx 0;
				}
				.album_desc{
					padding: 10rpx 0;
					font-size: 24rpx;
					//使段落在一行
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.album_btn{
					padding: 10rpx;
					display: flex;
					justify-content: flex-end;
					.album_attention{
						color: $color;
						border: 1rpx solid $color;
						padding: 10rpx;
					}
				}
			}
		}
	}
</style>
