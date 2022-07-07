<template>
  <div class="home">
    <van-nav-bar :title="activeTitle" fixed />
    <div class="main">
      <!-- 使用路由缓存，防止组件切换时被销毁 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar active-color="#ee0a24" route>
      <van-tabbar-item icon="home-o" replace to="/layout/home">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/layout/search">
        搜索
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTitle: this.$route.meta.title, // 导航标题
    }
  },
  watch: {
    $route() {
      // 侦听路由对象身上的属性的改变
      this.activeTitle = this.$route.meta.title
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
