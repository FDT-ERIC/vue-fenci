<template>
  <div
    class="bg-white px-3 txt_senti"
    style="margin:-20px; margin-top:-1rem; margin-bottom:0 !important;"
  >
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="Version 0.2">
        <el-form ref="form" label-width="80px">
          <el-form-item label="文本输入">
            <el-button-group style="margin-left:1%">
              <el-button size="mini" type="success" icon="el-icon-edit" plain @click="shiliBtn(1)">示例 1</el-button>
              <el-button size="mini" type="success" icon="el-icon-edit" plain @click="shiliBtn(2)">示例 2</el-button>
              <el-button size="mini" type="success" icon="el-icon-delete" plain @click="shiliBtn(0)">清空</el-button>
            </el-button-group>
          </el-form-item>
          <el-input
            class="w-50"
            type="textarea"
            :rows="4"
            placeholder="例如：创新工场大湾区人工智能工程院"
            style="margin-left:10px"
            v-model="form.input"
          ></el-input>
          <div style="width:50%">
            <center>
              <button
                type="button"
                class="btn btn-outline-success btn-sm"
                style="margin:20px 0 20px 0; width:40%"
                @click="submitBtn"
              >提交分析</button>
            </center>
          </div>
          <el-form-item v-model="form.waiting" label="识别结果">{{form.waiting}}</el-form-item>
          <!-- 输出左右的类别 -->
          <div
            v-for="(item, index) in totalNER"
            :key="index"
            style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:45px; width:90%; margin: 0 0 30px 10px; padding:5px"
          >
            <div>
              <el-tag
                v-model="form.resultType"
                type="success"
                effect="plain"
                style="align:left; margin:0 auto; text-align:center; width:auto;"
              >
                <!-- 将英文转换成中文 -->
                {{subItemToCN[item]}}
              </el-tag>
              <!-- 在每个类别里对特定数组进行遍历 -->
              <el-tag
                v-model="form.resultType"
                v-for="subItem in obj[item]"
                :key="subItem"
                type="success"
                effect="plain"
                style="align:left; margin:0 auto; text-align:center; width:auto; margin-left:10px"
              >{{ subItem }}</el-tag>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from "qs";
import { constants } from "crypto";
export default {
  data() {
    return {
      resArr: [], //获取数据结果
      PER: [], // 人物标签
      LOC: [], // 地点标签
      ORG: [], // 对象标签
      totalNER: ["PER", "LOC", "ORG"], // 存放总标签
      subItemToCN: { PER: "人物", LOC: "地点", ORG: "组织" },
      obj: { PER: this.PER, LOC: this.LOC, ORG: this.ORG },
      tabIndex: 0,
      form: {
        input: "", // 输入
        waiting: "" // 分析中，或者分析结束
      }
    };
  },
  methods: {
    submitBtn() {
      // 将数据清空
      this.resArr = [];
      this.PER = [];
      this.LOC = [];
      this.ORG = [];

      // fake数据
      if (this.form.input.search("创新工场") != -1) {
        this.ORG.push("创新工场");
      }

      // 请求API
      this.$axios
        .post(
          "/base/ner",
          qs.stringify({
            version: "v0.2",
            text: this.form.input
          })
        )
        .then(res => {
          if (res.data.res.ner.length > 0) {
            this.resArr = res.data.res.ner;
            this.detectNER();
          } else {
            this.resArr = [];
          }
          this.form.waiting = "(完成实体识别)";
          console.log(this.PER);
          console.log(this.ORG);
        });
    },
    detectNER() {
      for (let index = 0; index < this.resArr.length; index++) {
        let item = this.resArr[index];
        // console.log(this.resArr[index].entity);
        if (item.type == "PER") {
          this.PER.push(item.entity);
        } else if (item.type == "LOC") {
          this.LOC.push(item.entity);
        } else if (item.type == "ORG") {
          this.ORG.push(item.entity);
        }
        this.obj = { LOC: this.LOC, ORG: this.ORG, PER: this.PER };
      }
    },

    // 添加示例按钮点击事件
    shiliBtn(value) {
      if (value == 1) {
        this.form.input = "李开复：十年前的今天，创新工场成立。我们从天使投资到VC+AI工程院，从移动互联网到AI时代，从1500万美元到20多亿美元，从零创业到16个独角兽，一直没有忘记我们的初心：真心帮助年轻创业者、坚持做技术型投资人、让中国创新得到世界尊重"
      } else if (value == 2) {
        this.form.input = "创新工场由李开复博士创办于2009年9月，旨在帮助中国青年成功创业，是一家早期投资机构。7年，创新工场投资了273个项目，然而它的投资逻辑到底是怎样的？本文转自微信公众号：中国股权转让研究中心，作者徐祥君。"
      } else if (value == 0) {
        this.form.input = ""
      }
    }
    // handelClick(tab, event) {}
  }
};
</script>

<style>
.txt_senti .el-form-item {
  margin-bottom: 0px;
}
.txt_senti .el-input {
  margin-bottom: 10px;
}
</style>