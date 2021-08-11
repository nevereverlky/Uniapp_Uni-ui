<template>
	<view class="home_tab">
		<view class="home_tab_title">
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
		<view class="home_tab_content">
            <view v-show="current === 0">
		        <home-recommend></home-recommend>
		    </view>
			<view v-show="current === 1">
                <home-category></home-category>
	        </view>
            <view v-show="current === 2">
                <home-new></home-new>
            </view>
			<view v-show="current === 3">
			    <home-album></home-album>
			</view>
        </view>
	</view>
</template>

<script>
	import homeAlbum from './home-album';
	import homeCategory from './home-category';
	import homeNew from './home-new';
	import homeRecommend from './home-recommend';
	import {uniSegmentedControl} from '@dcloudio/uni-ui'
	export default {
		components: {
			homeAlbum,
			homeCategory,
			homeNew,
			homeRecommend,
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{title: '推荐'},
					{title: '分类'},
					{title: '最新'},
					{title: '专辑'},
				],
				current: 0
			};
		},
		methods: {
			onClickItem(e) {
				if(this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			}
		}
	}
</script>

<style lang="scss">
	.home_tab{
		.home_tab_title{
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
	}
</style>