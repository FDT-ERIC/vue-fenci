<template>
  <div
    class="bg-white px-3 txt_senti"
    style="margin:-20px; margin-top:-1rem; margin-bottom:0 !important;"
  >
    <el-tabs v-model="tabIndex">
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
          <el-form-item v-model="form.waiting" label="分词结果">{{waiting}}</el-form-item>
          <div
            v-for="(item, index) in arr"
            :key="index"
            style="display: inline-block; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:45px; width:auto; margin: 0 0 30px 10px; padding:5px"
          >
            <div style="text-align:center">
              <el-tag
                v-model="form.resultType"
                type="success"
                effect="plain"
                style="display:block;margin:0 auto"
              >
                {{item}}
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
      arr: [],
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
          "/base/cws",
          qs.stringify({
            version: "v0.2",
            text: this.form.input
          })
        )
        .then(res => {
          this.info = res.data.res["words"];
          this.arr = res.data.res["words"];
          console.log(res.data);
        });
      this.waiting = "(完成分词)";
    },

    // 添加示例按钮点击事件
    shiliBtn(value) {
      if (value == 1) {
        this.form.input = "创新工场由李开复博士创办于2009年9月，作为国内的创业投资机构，创新工场深耕在人工智能&大数据、消费升级、 “B2B”&企业升级、教育、消费互联网、医疗等领域，并不断探索与创新"
      } else if (value == 2) {
        this.form.input = "2016年9月，创新工场人工智能工程院成立，李开复博士亲任院长，王咏刚任执行院长，与来自世界顶级机构的著名工程师和顶尖科学家共同探索技术、数据、人才、商业价值的结合"
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