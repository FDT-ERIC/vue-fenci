<template>
  <div
    class="bg-white px-3 txt_senti"
    style="margin:-20px; margin-top:-1rem; margin-bottom:0 !important;"
  >
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <!-- 版本v0.1 -->
      <el-tab-pane label="Version 0.2">
        <el-form ref="v0.2" label-width="80px">
          <el-form-item label="文本输入"></el-form-item>
          <!-- <el-input
            v-model="form.input"
            class="w-50"
            style="margin-left:10px"
            placeholder="例如：创新工场大湾区人工智能工程院"
          >
            <el-button @click="submitBtn" slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
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
          <el-form-item v-model="form.waiting" label="分析结果">{{waiting}}</el-form-item>
          <!-- <el-form-item v-model="form.waiting" label="分析结果">
            <h1 v-show="elementVisible" class="hideElement"> 分析完成 </h1>
          </el-form-item> -->

          <div
            style="display: inline-block; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:45px; width:auto; margin: 0 0 30px 10px; padding:5px"
          >
            <div style="text-align:center">
              <el-tag
                v-model="form.resultType"
                :type="this.resultType"
                effect="plain"
                style="display:block;margin:0 auto"
              >
                {{this.info}}
                <!-- <i class="el-icon-check">加上一个勾</i> -->
              </el-tag>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
      <!-- 版本v0.2 -->
      <!-- <el-tab-pane label="增加词信息的pretrain模型">
        <el-form ref="form" label-width="80px">
          <el-form-item label="文本输入"></el-form-item>
          <el-input
            v-model="form.input"
            class="w-50"
            style="margin-left:10px"
            placeholder="例如：创新工场大湾区人工智能工程院"
          >
            <el-button @click="submitBtn" slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-form-item v-model="form.waiting" label="分析结果">{{waiting}}</el-form-item>

          <div
            style="display: inline-block; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:45px; width:auto; margin: 0 0 30px 10px; padding:5px"
          >
            <div style="text-align:center">
              <el-tag
                v-model="form.resultType"
                :type="this.resultType"
                effect="plain"
                style="display:block;margin:0 auto"
              >
                {{this.info}}
              </el-tag>
            </div>
          </div>
        </el-form>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
import qs from "qs";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      info: null,
      tabIndex: 0,
      elementVisible: false, // 显示分析完成的提示信息
      form: {
        input: "", // 标题
        // category: [], // 多层分类
        waiting: "", // 分析中，或者分析结束
        output: "",
        resultType: "" // 设置结果的颜色状态，积极为绿色，消极为红色
      }
    };
  },

  methods: {
    submitBtn() {
      // (this.form.info = "分析中，请稍后"), // 没作用
        this.$axios
          .post(
            "/base/sentiment_analysis",
            qs.stringify({ text: this.form.input })
          )
          .then(res => {
            let param = res.data.res["label"];
            if (param == "0") {
              this.info = "消极";
              this.resultType = "danger";
            } else {
              this.info = "积极";
              this.resultType = "success";
            }
            // this.elementVisible = 'true'
            // setTimeout(() => (this.elementVisible = 'true'), 1000)
            this.waiting = "(完成分析)";
          });
    },
    handelClick(tab, event) {}
  },

  // created() {
  //   this.elementVisible = 'true'
  //   setTimeout(() => (this.elementVisible = true), 1000);
  // }
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