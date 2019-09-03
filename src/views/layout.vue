<template>
  <div>
    <el-container style="position: absolute; left:0; top:0; bottom:0; right:0; overflow:hidden;">
      <!-- 顶部布局 -->
      <el-header class="d-flex align-items-center" style="background:#545c64;">
        <a class="h5 text-light mb-0 mr-auto">{{$conf.main_logo}}</a>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            v-for="(item, index) in navBar.list"
            :index="index|numToString"
            :key="index"
          >{{item.name}}</el-menu-item>

          <!-- 循环的下拉列表 -->
          <!-- <el-submenu :index="index|numToString" v-for="(item, index) in navBar.list" :key="index">
            <template slot="title">{{item.name}}</template>
            <el-menu-item :index="index|numToString-1">选项1</el-menu-item>
            <el-menu-item :index="index|numToString-2">选项2</el-menu-item>
            <el-menu-item :index="index|numToString-3">选项3</el-menu-item>
          </el-submenu>-->

          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>账户信息
            </template>
            <el-menu-item index="100-1">个人中心</el-menu-item>
            <el-menu-item index="100-2">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>

      <el-container style="height:100%;">
        <!-- 侧边布局 -->
        <el-aside width="200px">
          <el-menu :default-active="slideMenuActive" @select="slideSelect" style="height:100%">
            <el-menu-item
              v-for="(item, index) in slideMenus"
              :index="index|numToString"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主布局 -->
        <el-main class="bg-light">
          <!-- 面包屑导航 -->
          <div class="border-bottom mb-3 bg-white" v-if="bran.length > 0" style="padding:20px; margin:-20px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in bran"
                :to="{ path: item.path }"
                :key="index"
              >{{item.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 主内容 --> 
          <router-view></router-view>
          <!-- 回到顶部按钮 -->
          <el-backtop target=".el-main" :bottom="100">
            <div style="
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;">
              UP
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";
import { constants } from "crypto";
import { log } from "util";
export default {
  mixins: [common],

  // 数据区域
  data() {
    return {
      navBar: [],
      bran: []
    };
  },

  created() {
    // 初始化菜单
    this.navBar = this.$conf.navBar;
    // 获取面包屑导航
    this.getRouterBran();
    // 初始化选中菜单
    this.__initNavBar();
  },

  watch: {
    $route(to, from) {
      // 本地存储，防止页面刷新后回到首页
      localStorage.setItem(
        "navActive",
        JSON.stringify({
          top: this.navBar.active,
          left: this.slideMenuActive
        })
      );
      // 获取面包屑导航
      this.getRouterBran();
    }
  },

  // 设置当前导航的位置
  computed: {
    // 为了维持侧边导航栏的点击位置不变
    slideMenuActive: {
      get() {
        return this.navBar.list[this.navBar.active].subActive || "0";
      },
      set(val) {
        this.navBar.list[this.navBar.active].subActive = val;
      }
    },
    // 当前仅支持效果体验模块，加了个[]避免遍历出错
    slideMenus() {
      return this.navBar.list[this.navBar.active].submenu || [];
    }
  },

  methods: {
    // 针对顶部导航栏，更新点击位置
    handleSelect(key, keyPath) {
      this.navBar.active = key;
      // 默认跳转到当前激活的那一个
      // this.slideMenuActive = '0'
      this.$router.push({
        name: this.slideMenus[this.slideMenuActive].pathname
      });
    },

    // 针对侧边导航栏，维持点击位置不变
    slideSelect(key, keyPath) {
      this.slideMenuActive = key;
      // 跳转到指定页面
      this.$router.push({
        name: this.slideMenus[key].pathname
      });
    },

    // 获取面包屑导航
    getRouterBran() {
      let b = this.$route.matched.filter(v => v.name);
      // console.log(b)
      let arr = [];
      b.forEach((v, k) => {
        // 过滤 layout 和 index
        // console.log(v)
        if (v.name === "index" || v.name === "layout") {
          this.bran = [];
          return;
        }
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
        });
        if (arr.length > 0) {
          arr.unshift({ name: "index", path: "/index", title: "效果体验" });
        }
        this.bran = arr;
      });
    },

    // 防止刷新页面后自动回到首页
    __initNavBar() {
      let r = localStorage.getItem("navActive");
      if (r) {
        r = JSON.parse(r);
        this.navBar.active = r.top;
        this.slideMenuActive = r.left;
      }
    }
  }
};
</script>

<style>
#box_relative {
  position: absolute;
  left: 30px;
  top: 20px;
}
</style>