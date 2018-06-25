<template>
  <div>
    <header class="header">
      <h1 class="logo">豆瓣</h1>
      <nav>
        <ul>
          <li><a href="#" style="color: #2384E8;">电影</a></li>
          <li><a href="#" style="color: #9F7860;">图书</a></li>
          <li><a href="#" style="color: #E4A813;">广播</a></li>
          <li><a href="#" style="color: #2AB8CC;">小组</a></li>
        </ul>
      </nav>
      <span class="searchIcon"><i class="iconfont icon-search_list_light"></i></span>
    </header>
    <div class="card">
      <ul class="quick-nav">
        <li><a href="#">影院热映</a></li>
        <li><a href="#">近期值得看的国产剧</a></li>
        <li><a href="#">豆瓣时间</a></li>
        <li><a href="#">使用豆瓣App</a></li>
      </ul>
      <section>
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <a class="feed-item" v-for="recommendFeed in recommendFeeds" :key="recommendFeed.id" :href="recommendFeed.target.url">
            <div class="feed-content">
                <div class="left">
                  <h3>{{recommendFeed.title}}</h3>
                  <p>{{recommendFeed.target.desc}}</p>
                </div>
                <!-- <div class="right">
                  <img :src="recommendFeed.target.cover_url" alt="">
                </div> -->
            </div>
            <div class="author">
              <span>by&nbsp;{{recommendFeed.target.author.name}}</span>
            </div>
          </a>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.header {
  width: 100%;
  height: 47px;
  padding: 0 18px;
  position: fixed;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #f3f3f3;
  top: 0;
  left: 0px;
  display: flex;
  justify-content: space-between;
}
.logo {
  color: #00b600;
  margin: 0px;
  padding: 0px;
  display: inline-block;
}
.searchIcon{
  margin-right: 40px;
  line-height: 47px;
  color: #00b600;
  font-weight: 700;
}
ul {
  list-style: none;
  margin: 0px;
}
a {
  color: #000;
}
nav {
  line-height: 47px;
}
nav li {
  display: inline-block;
  margin-right: 19px;
}
nav li:nth-last-child() {
  margin-right: 0px;
}
a {
  text-decoration: none;
}
.card {
  margin: 0 18px;
}
.quick-nav {
  margin-top: 67px;
  margin-bottom: 0px;
  padding: 0;
  overflow: hidden;
}
.quick-nav li {
  float: left;
  width: 50%;
  padding: 3px;
  box-sizing: border-box;
}
.quick-nav a {
  display: block;
  background-color: #f6f6f6;
  color: #494949;
  padding: 12px 0;
  text-align: center;
}
.feed-item {
  display: block;
  padding: 25px 18px 15px 0;
  border-bottom: 1px solid #ddd;
}
.feed-content {
  margin-bottom: 10px;
}
.feed-content p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 12px;
  color: #aaa;
}
.feed-content h3 {
  margin-bottom: 6px;
  margin-top: 0px;
}
.author {
  font-size: 12px;
  color: #ccc;
}
</style>

<script>
export default {
  data () {
    return {
      queryValue: '',
      recommendFeeds: [],
      bottomStatus: '',
      allLoaded: false
    }
  },
  methods: {
    handleBottomChange (status) {
      console.log(status)
      this.bottomStatus = status
    },
    loadBottom () {
      setTimeout(() => {
        this.$fetch('/v2/recommend_feed').then(
          res => (this.$data.recommendFeeds = res.recommend_feeds)
        )
        // 固定的方法
        this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    }
  },
  // 相当于ngOnInit
  created () {
    this.$data.queryValue = this.$route.query
    this.$fetch('/v2/recommend_feed').then(res => (console.log(res)))
    this.$fetch('/v2/recommend_feed').then(
      res => (this.$data.recommendFeeds = res.recommend_feeds)
    )
  }
}
</script>
