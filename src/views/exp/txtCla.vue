<template>
  <div
    class="bg-white px-3 txt_senti"
    style="margin:-20px; margin-top:-1rem; margin-bottom:0 !important;"
  >
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="Version 0.2">
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
            this.info = res.data.res['label']
            console.log(res.data);
          });
          this.waiting = "(完成分类)"
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