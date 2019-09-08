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
          <el-form-item v-model="form.waiting" label="分类结果">{{waiting}}</el-form-item>
          <div
            style="display: inline-block; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:45px; width:auto; margin: 0 0 30px 10px; padding:5px"
          >
            <div style="text-align:center">
              <el-tag
                v-model="form.resultType"
                type="success"
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
export default {
  data() {
    return {
      info: null,
      tabIndex: 0,
      form: {
        input: "", // 输入
        waiting: "", // 分析中，或者分析结束
        output: "" // 输出
      }
    };
  },
  methods: {
    submitBtn() {
      this.$axios
        .post(
          "/base/classifier",
          qs.stringify({
            version: "v0.2",
            text: this.form.input
          })
        )
        .then(res => {
          this.info = res.data.res["label"];
          console.log(res.data);
        });
      this.waiting = "(完成分类)";
    },

    // 添加示例按钮点击事件
    shiliBtn(value) {
      if (value == 1) {
        this.form.input = "近日， Viela Bio 公司宣布，评估抗 CD19 单抗 inebilizumab（前称 MEDI-551）治疗视神经脊髓炎频谱障碍（NMOSD）的关键性研究 N-MOmentum（NCT02200770）的结果已发表于医学期刊《柳叶刀》（The Lancet）。 NMOSD 是一种罕见的、严重的、复发性、神经炎症性自身免疫性疾病，可导致严重的肌肉无力和瘫痪、视力丧失、呼吸衰竭和神经性疼痛。"
      } else if (value == 2) {
        this.form.input = "教学环境品控不到位。传统线上要么是录课的形式，要么是真人的形式。录课是跟着视频学，学习效果没有互动。真人直播 1000 个学员就有 1000 个老师，这和线下是一样的，线下上学的时候都会挑好老师，线上也是一样，不是所有的老师教学质量都是一样好，很难做到品控。"
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