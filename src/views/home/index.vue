<template>
  <div class="home">
    <p class="title">推荐歌单</p>
    <van-row gutter="7">
      <van-col span="8" v-for="obj in recommendList" :key="obj.id">
        <van-image width="100%" height="3rem" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <song-item
      v-for="obj in hotList"
      :key="obj.id"
      :id="obj.id"
      :name="obj.name"
      :author="obj.song.artists[0].name"
    ></song-item>
  </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue'

export default {
  data() {
    return {
      recommendList: [],
      hotList: [],
    }
  },
  components: {
    SongItem,
  },
  methods: {
    // 封装推荐歌单的请求
    async personalized(num) {
      const { data: res } = await this.$http.personalized({ limit: num })
      this.recommendList = res.result
    },
    // 封装推荐新音乐的请求
    async Newsong(num) {
      const { data: res } = await this.$http.Newsong({ limit: num })
      this.hotList = res.result
    },
  },
  created() {
    this.personalized(6) // 发起6条的推荐歌单请求
    this.Newsong(20) // 发起20条的推荐新音乐的请求
  },
}
</script>

<style lang="less" scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
