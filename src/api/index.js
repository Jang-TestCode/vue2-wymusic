import requset from '@/utils/requset.js' // 导入网络请求工具

const recommendMusic = {
  // 推荐歌单
  personalized(params) {
    return requset({
      url: '/personalized',
      params,
    })
  },
  // 推荐新音乐
  Newsong(params) {
    return requset({
      url: '/personalized/newsong',
      params,
    })
  },
  // 热搜列表(简略)
  hotSearch() {
    return requset({
      url: '/search/hot',
    })
  },
  // 搜索
  search(params) {
    return requset({
      url: '/search',
      params,
    })
  },
  // 播放页 - 获取歌曲详情
  detail(id) {
    return requset({
      url: `/song/detail?ids=${id}`,
    })
  },
  // 播放页 - 获取歌词
  lyric(id) {
    return requset({
      url: `/lyric?id=${id}`,
    })
  },
  // 歌曲评论
  commentMusic(params) {
    return requset({
      url: '/comment/music',
      params,
    })
  },
}

export default recommendMusic
