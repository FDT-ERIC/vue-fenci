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
          <el-form-item v-model="form.waiting" label="文本标签">{{waiting}}</el-form-item>
          <div
            style="display: inline-block; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:auto; width:auto; margin: 0 0 10px 10px; padding:10px 10px 5px 10px"
          >
            <div style="float:left">
              <el-radio-group v-model="radioTgpActive" size="mini">
                <el-radio-button
                  v-for="item in this.tempTag"
                  :key="item"
                  :label="item"
                  @click.native="selectTag(item)"
                ></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <!-- <div v-html="this.form.output"></div> -->
          <el-form-item v-model="form.waiting" label="输出结果">{{waiting}}</el-form-item>
          <div
            v-html="this.form.output"
            style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .24); height:auto; width:90%; margin: 0 0 20px 10px; padding:10px 10px 5px 10px"
          ></div>
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
      info: [],
      tempTag: [], // 存放临时标签
      tabIndex: 0,
      radioTgpActive: "", // 初始化临时标签
      selectTagName: "", // 存储当前选中的标签名称
      allTagToEn: {
        副词: "AD",
        时态标记: "AS",
        "“把”字句": "BA",
        并列连词: "CC",
        数词: "CD",
        从属连词: "CS",
        助词: "DE", // DEC, DEG, DER, DEV
        限定词: "DT",
        等: "ETC",
        外语: "FW",
        叹词: "IJ",
        非谓语性形容词: "JJ",
        "(施事出现)被动词": "LB",
        方位词: "LC",
        量词: "M",
        小品词: "MSP",
        名词: "NN",
        专有名词: "NR",
        时间名词: "NT",
        序数词: "OD",
        拟声词: "ON",
        介词: "P",
        代词: "PN",
        标点: "PU",
        "(施事未出现)被动词": "SB",
        句末词: "SP",
        谓词性形容词: "VA",
        是: "VC",
        有: "VE",
        动词: "VV"
      },
      allTagToCh: {
        AD: "副词",
        AS: "时态标记",
        BA: "“把”字句",
        CC: "并列连词",
        CD: "数词",
        CS: "从属连词",
        DE: "助词", // DEC, DEG, DER, DEV
        DT: "限定词",
        ETC: "等",
        FW: "外语",
        IJ: "叹词",
        JJ: "非谓语性形容词",
        LB: "(施事出现)被动词",
        LC: "方位词",
        M: "量词",
        MSP: "小品词",
        NN: "名词",
        NR: "专有名词",
        NT: "时间名词",
        OD: "序数词",
        ON: "拟声词",
        P: "介词",
        PN: "代词",
        PU: "标点",
        SB: "(施事未出现)被动词",
        SP: "句末词",
        VA: "谓词性形容词",
        VC: "是",
        VE: "有",
        VV: "动词"
      },
      form: {
        input: "", // 输入
        waiting: "", // 分析中，或者分析结束
        output: ""
      }
    };
  },

  methods: {
    submitBtn() {
      this.radioTgpActive = ""; // 每次提交，都将临时标签初始化
      this.$axios
        .post(
          "/base/pos",
          qs.stringify({
            version: "v0.2",
            text: this.form.input
          })
        )
        .then(res => {
          this.form.output = "";
          this.info = res.data.res["pos"];
          this.tempTag = [];
          for (let index = 0; index < this.info.length; index++) {
            if (
              this.info[index][1] == "DEC" ||
              this.info[index][1] == "DEG" ||
              this.info[index][1] == "DER" ||
              this.info[index][1] == "DEV"
            ) {
              this.info[index][1] = "DE";
            }
            let nameCh = this.allTagToCh[this.info[index][1]];
            if (this.tempTag.indexOf(nameCh) == -1) {
              this.tempTag.push(nameCh);
            }
          }
          this.selectTag();
        });
    },

    selectTag(item) {
      this.form.output = ""; // 清空
      console.log(item);
      for (let index = 0; index < this.info.length; index++) {
        // 判断是否是匹配的标签
        if (this.allTagToEn[item] == this.info[index][1]) {
          this.form.output +=
            '<button type="button" class="btn btn-info btn-sm mr-2 mb-2">' +
            this.info[index][0] +
            "</button>";
        } else {
          this.form.output +=
            '<button type="button" class="btn btn-outline-secondary btn-sm mr-2 mb-2">' +
            this.info[index][0] +
            "</button>";
        }
      }
    },

    // 添加示例按钮点击事件
    shiliBtn(value) {
      if (value == 1) {
        this.form.input = "9月4日，被誉为机器学习和神经网络领域的顶级会议之一的NEURIPS2019揭晓收录论文名单"
      } else if (value == 2) {
        this.form.input = "创新工场人工智能工程院以“科研+工程实验室”模式，规划研发方向，组建研发团队。目前设有医疗AI、教育 AI、机器人、机器学习理论、计算金融等面向前沿科技与应用方向的实验室，其他新方向正在规划中"
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