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
            <div class="feed-content clearfix" v-show="recommendFeed.layout === 1">
                <div :class="{left: recommendFeed.target.cover_url}">
                  <h3>{{recommendFeed.title}}</h3>
                  <p>{{recommendFeed.target.desc}}</p>
                </div>
                <div class="right">
                  <img class="default-image" :src="getImages(recommendFeed.target.cover_url)" alt="" @load="successLoading(getImages(recommendFeed.target.cover_url), $event)" @error="errorLoading">
                </div>
            </div>
            <div v-show="recommendFeed.layout === 5">
              <section class="photos">
                <div class="big-photo">
                  <img :src="getImages(recommendFeed.target.cover_url)" alt="">
                </div>
                <div class="small-photos">
                  <img :src="getImages(recommendFeed.target.more_pic_urls[0])" alt="">
                  <div class="more-pic">
                    <img :src="getImages(recommendFeed.target.more_pic_urls[1])" alt="">
                    <span>{{recommendFeed.target.photos_count-3}}+</span>
                  </div>
                </div>
              </section>
              <h3 class="title">
                {{recommendFeed.title}}
              </h3>
            </div>
            <div class="content-footer">
              <div class="author">
                <span>by&nbsp;{{recommendFeed.target.author.name}}</span>
              </div>
              <div class="address">
                <span>{{recommendFeed.source_cn}}</span>
              </div>
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
    .card {
      margin: 0 18px;
    }
    .quick-nav {
      margin-top: 67px;
      margin-bottom: 0px;
      padding: 0;
      overflow: hidden;
      li {
        float: left;
        width: 50%;
        padding: 3px;
        box-sizing: border-box;
        a{
          display: block;
          background-color: #f6f6f6;
          color: #494949;
          padding: 12px 0;
          text-align: center;
        }
      }
    }
    .feed-item {
      display: block;
      padding: 25px 18px 15px 0;
      border-bottom: 1px solid #ddd;
    }
    .feed-content {
      margin-bottom: 10px;
      h3 {
        font-size: 17px;
        line-height: 1.41;
        margin-bottom: 6px;
        margin-top: 0px;
      }
      .left{
        width: 68%;
        float: left;
      }
      .right {
        float: right;
        width: 27%;
        img{
          height: auto;
        }
      }
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        font-size: 12px;
        color: #aaa;
      }
    }
    .content-footer{
      font-size: 12px;
      color: #ccc;
      display: flex;
      justify-content: space-between;
    }
    .photos{
      display: flex;
      margin-bottom: 10px;
      .big-photo{
        flex: 3.2;
        margin-right: 4px;
        img{
          height: 100%;
        }
      }
      .small-photos{
        flex: 1;
        .more-pic{
          margin-top: 4px;
          position: relative;
          span{
            color: #fff;
            display: inline-block;
            width: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
          }
        }
      }
    }
    .title {
      margin-bottom: 6px;
      font-size: 17px;
      line-height: 1.41;
      font-weight: 500;
    }
    .default-image {
      background-color: #ccc;
      height: 98px;
      width: 98px;
      display: inline-block;
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
    loadBottom () { },
    getImages (_url) {
      if (_url && _url !== undefined) {
        let _u = _url.substring(7)
        return 'https://images.weserv.nl/?url=' + _u
      }
    },
    successLoading (imgUrl, event) {
      if (event.target.complete === true) {
        event.target.classList.remove('default-image')
      }
    },
    errorLoading (event) {
      // 这个应该是图片出错的时候
      event.target.src = ''
      event.target.classList.add('default-image')
    }
  },
  // 相当于ngOnInit
  created () {
    this.$data.queryValue = this.$route.query
    this.$fetch('/v2/recommend_feed').then(res => (console.log('dd')))
    this.$fetch('/v2/recommend_feed').then(
      res => (this.$data.recommendFeeds = res.recommend_feeds)
    )
  }
}
</script>
