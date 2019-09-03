<template>
  <div
    class="bg-white px-3 txt_senti"
    style="margin:-20px; margin-top:-1rem; margin-bottom:0 !important;"
  >
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="版本1.0">
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
          <!-- <div
            style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:100px; width:20%; margin: 0 0 30px 10px; padding:5px"
          >
            <el-col :span="12">
              <div style="height:80px; display:flex; justify-content:center; align-items:center;">积极</div>
            </el-col>
            <el-col :span="12">
              <div class="contain" style="display:flex; justify-content:center; align-items:center; padding:10px 10ox 0 0">
                <img src="../../assets/positive.png"/>
              </div>
            </el-col>
          </div>-->

          <div
            style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:45px; width:8%; margin: 0 0 30px 10px; padding:5px"
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

          <!-- <el-form-item label="多层分类">
            <el-cascader v-model="form.category" :options="options"></el-cascader>
          </el-form-item>-->
          <!-- <el-input v-model="form.output" type="textarea" autosize placeholder="输出结果">结果输出</el-input> -->
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="version2.0">Version 2.0</el-tab-pane> -->
    </el-tabs>
    <!-- <button @click="abc">登录</button> -->
    <!-- <div>{{ info }}</div> -->
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      info: null,
      tabIndex: 0,
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
      this.waiting = "分析中，请稍后",
      this.$axios
        .post(
          "/base/sentiment_analysis",
          qs.stringify({ text: this.form.input }),
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
          this.waiting = "分析结束"
        });
    },
    handelClick(tab, event) {}
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