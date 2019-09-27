<template>
  <div
    class="bg-white px-3 txt_senti"
    style="margin:-20px; margin-top:-1rem; margin-bottom:5% !important;"
  >
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="Version 0.2">
        <el-form ref="form" label-width="80px">
          <el-form-item label="文本输入">
            <el-button-group style="margin-left:1%">
              <el-button
                size="mini"
                type="success"
                icon="el-icon-edit"
                plain
                @click="shiliBtn(1)"
              >示例 1</el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-edit"
                plain
                @click="shiliBtn(2)"
              >示例 2</el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-delete"
                plain
                @click="shiliBtn(0)"
              >清空</el-button>
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
            v-for="(item, index) in not_null"
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
          "/api/cws",
          qs.stringify({
            version: "v0.2",
            text: this.form.input
            // text: this.form.input.replace(/\s+/g, "")
          })
        )
        .then(res => {
          // this.info = res.data.res["words"];
          console.log(res.data.res)
          this.arr = res.data.res["words"];
        });
      this.waiting = "(完成分词)";
    },

    // 添加示例按钮点击事件
    shiliBtn(value) {
      if (value == 1) {
        this.form.input =
          "一名北京大学生在今天的考试中踌躇满志，对于第一名是志在必得";
      } else if (value == 2) {
        this.form.input =
          "据高考最新报道，多名衡水中学生斩获北大清华的录取名额";
      } else if (value == 0) {
        this.form.input = "";
      }
    }

    // handelClick(tab, event) {}
  },
  computed: {
    // 把返回的结果的空格去掉
    not_null() {
      var arr_withoutSpace = this.arr.filter(item => {
        return item != ' '
      })
      return arr_withoutSpace
    }
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