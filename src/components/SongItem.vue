<template>
  <div>
    <van-cell
      :title="name"
      :label="author + ' - ' + name"
      center
      @click="$router.push({ path: '/comment', query: { id: id } })"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon
          name="play-circle-o"
          class="search-icon"
          @touchstart="playFn"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    id: Number, // 歌曲id
    name: String, //  歌名
    author: String, //  作者
  },
  methods: {
    playFn() {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
/* 给图标设置大小 */
.search-icon {
  font-size: 24px;
  line-height: inherit;
}
/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
