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
          <el-form-item v-model="form.waiting" label="识别结果">{{waiting}}</el-form-item>
          <div
            v-for="(item, index) in totalNER"
            :key="index"
            style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:45px; width:auto; margin: 0 0 30px 10px; padding:5px"
          >
            <div>
              <el-tag
                v-model="form.resultType"
                type="success"
                effect="plain"
                style="align:left; margin:0 auto; text-align:center; width:5%"
              >
                {{item}}
              </el-tag>
              <el-tag
                v-model="form.resultType"
                v-for="subItem in obj[item]"
                :key="subItem"
                type="success"
                effect="plain"
                style="align:left; margin:0 auto; text-align:center; width:5%; margin-left:10px"
              >
                {{ subItem }}
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
import { constants } from "crypto";
export default {
  data() {
    return {
      resArr: [], //获取数据结果
      PER: [], // 人物标签
      LOC: [], // 地点标签
      ORG: [], // 对象标签
      totalNER: ['PER', 'LOC', 'ORG' ], // 存放总标签
      obj : {'PER':this.PER, 'LOC':this.LOC, 'ORG':this.ORG},
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
      // 将数据清空
      this.resArr = [];
      this.PER = [];
      this.LOC = [];
      this.ORG = [];
      // 请求API
      this.$axios
        .post(
          "/base/pos",
          qs.stringify({
            version: "v0.2",
            text: this.form.input
          })
        )
        .then(res => {
          if (res.data.res.ner.length > 0) {
            this.resArr = res.data.res.ner;
            this.detectNER()
          } else {
            this.resArr = [];
          }
          this.form.waiting = "(完成词性识别)";
        });
    },
    detectNER() {
      for (let index = 0; index < this.resArr.length; index++) {
        let item = this.resArr[index]
        // console.log(this.resArr[index].entity);
        if (item.type == "PER") {
          this.PER.push(item.entity)
        } else if (item.type == "LOC") {
          this.LOC.push(item.entity)
        } else if (item.type == "ORC") {
          this.ORC.push(item.entity)
        }
        this.obj = {'LOC':this.LOC, 'ORC':this.ORC, 'PER':this.PER}
      }
      console.log(this.PER)
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