<template>
  <div>
    <van-nav-bar
      title="评论"
      fixed
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="main">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="obj in commentList" :key="obj.commentId">
            <template>
              <div class="wrap">
                <div class="img_wrap">
                  <img :src="obj.user.avatarUrl" alt="" />
                </div>
                <div class="content_wrap">
                  <div class="header_wrap">
                    <div class="info_wrap">
                      <p>{{ obj.user.nickname }}</p>
                      <p>{{ obj.timeStr }}</p>
                    </div>
                    <div>{{ obj.likedCount }}点赞</div>
                  </div>
                  <div class="footer_wrap">
                    {{ obj.content }}
                  </div>
                </div>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      isLoading: false, // 上拉加载状态
      loading: false, // 下拉加载状态
      finished: false, // 如果为ture，则没有更多数据了
      page: 0, // 当前要请求第几页的数据
    }
  },
  methods: {
    async commentMusic() {
      const { data: res } = await this.$http.commentMusic({
        id: this.$route.query.id,
        limit: 20,
        offset: (this.page - 1) * 20,
      })
      res.comments.forEach(obj => this.commentList.push(obj))
      // this.commentList = res.comments
      // console.log(this.commentList)
    },
    // 上拉刷新事件
    onRefresh() {
      setTimeout(() => {
        this.page = 1 // 把请求页码数变回1
        this.commentList = [] // 先将列表的数据清空
        this.commentMusic() // 再请求新数据
        this.isLoading = false
      }, 1000)
    },
    // 下拉加载事件
    onLoad() {
      this.page++
      this.commentMusic()
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  padding-top: 46px;
}
/*容器样式*/
.wrap {
  display: flex;
}
.img_wrap {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.266667rem;
}

.img_wrap img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.content_wrap {
  flex: 1;
}

/*右侧头部*/
.header_wrap {
  display: flex;
}

.info_wrap {
  flex: 1;
}

.info_wrap p:first-child {
  font-size: 0.373333rem;
  color: #666;
}

.info_wrap p:last-of-type {
  font-size: 0.24rem;
  color: #999;
}

.header_wrap div:last-of-type {
  color: #999;
  font-size: 0.293333rem;
}

/*评论内容*/
.footer_wrap {
  font-size: 0.4rem;
  color: #333;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
