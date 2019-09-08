<template>
  <div
    class="bg-white px-3 txt_senti"
    style="margin:-20px; margin-top:-1rem; margin-bottom:0 !important;"
  >
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <!-- 版本v0.1 -->
      <el-tab-pane label="Version 0.2">
        <el-form ref="v0.2" label-width="80px">
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
                <!-- <i class="el-icon-check">加上一个勾</i> -->
              </el-tag>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
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

    // 添加示例按钮点击事件
    shiliBtn(value) {
      if (value == 1) {
        this.form.input = "9月4日，被誉为“伤心的游戏”正式登录国服，该公司一跃成为游戏市场的大赢家"
      } else if (value == 2) {
        this.form.input = "2010年，“愤怒的小鸟”这款游戏成功推出PC端，获得大量玩家的关注"
      } else if (value == 0) {
        this.form.input = ""
      }
    }
    // handelClick(tab, event) {}
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