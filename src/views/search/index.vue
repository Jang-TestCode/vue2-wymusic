<template>
  <div class="home">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
    />
    <!-- 热门搜索标题 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <!-- 搜索词 -->
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(obj, index) in searchList"
          :key="index"
          @click="btn(obj.first)"
        >
          {{ obj.first }}
        </span>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <song-item
        v-for="obj in resultList"
        :key="obj.id"
        :id="obj.id"
        :name="obj.name"
        :author="obj.artists[0].name"
      ></song-item>
    </div>
  </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue'

export default {
  data() {
    return {
      searchValue: '', // 搜索框
      searchList: [], // 热门搜索词
      resultList: [], // 搜索结果
      timer: null, // 保存定时器
    }
  },
  components: {
    SongItem,
  },
  watch: {
    searchValue(newVal) {
      clearTimeout(this.timer) // 赋予定时器
      if (newVal.length === 0) return (this.resultList = []) // 判断搜索框为空
      // 防抖，延迟0.5秒后执行
      this.timer = setTimeout(() => {
        this.search(1, newVal)
      }, 500)
    },
  },
  methods: {
    // 封装热门搜索词的请求
    async hotSearch() {
      const { data: res } = await this.$http.hotSearch()
      this.searchList = res.result.hots
    },
    // 封装搜索的请求
    async search(num, str) {
      const { data: res } = await this.$http.search({
        type: num,
        keywords: str,
      })
      this.resultList = res.result.songs
    },
    // 点击热门搜索词事件
    btn(str) {
      this.searchValue = str // 将搜索词添加到搜索框
      this.search(1, this.searchValue)
      // 清空定时器，防止发起第二次请求
      setTimeout(() => {
        clearTimeout(this.timer)
      }, 0)
    },
  },
  created() {
    // 立即请求热门搜索词
    this.hotSearch()
  },
}
</script>

<style lang="less" scoped>
/* 覆盖搜索框字体样式 */
/deep/ .van-field__control {
  font-size: 14px;
}

/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}
/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}
/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>
