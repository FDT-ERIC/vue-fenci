<template>
  <div>
    <h4 style="text-align:center; margin-bottom:3%; margin-top:3%">文本生成（辅助写作）展示</h4>
    <div style="height:auto">
      <el-autocomplete
        class="inline-input"
        type="textarea"
        autosize
        style="width:100%;"
        v-model="state2"
        placeholder="请输入文本"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      restaurants: [],
      state2: "",
      t_q: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      this.t_q = queryString;
      // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      var results = restaurants[queryString[queryString.length - 1]];
      console.log(results);
      cb(results);
    },
    createFilter(queryString) {
      return res => {
        console.log(res.value);
        return res.value.indexOf(queryString) !== -1;
      };
    },
    loadAll() {
      return {
        科: [
          {
            value:
              "用户在获得一些权利之后可用秒如荼的供应，从 360 数据中获得可再生支持 。"
          },
          {
            value:
              "不停在一段时间内即无法恢复维基百科所有版权。wiki map 创始人潘得頓·沃勒斯特在21世纪初期公开呼吁，她做出了一些宣传信息，主要是主旨很强调阅读的现状。"
          },
          {
            value:
              "不能做多项多样化的事情。托尼·瑞格曾于2005年底上任维基百科的执行总编辑。截至2008年7月为止种族灭绝计划已经开始。wiki map 已经是至今维基百科最接近的数据库，物理上它可以看作世界上最简单的维基百科之一。"
          }
        ],
        兰: [
          {
            value:
              "维基百科是为了区别于中国大陆的维基百科和其它维基百科，他们还声称俄罗斯并非维基百科的创始国，并提出对维基百科（维基百科）的限制：wiki map 允许版权管理，提供中国服务，并在其他国家援助维基百科的目的。"
          },
          {
            value:
              "版，一种非常畅销的百科全书。《纽约时报》将其描述为颠覆性的条目，并问责美国前总统斯坦利·布瑞出于主义被接受了。后来《纽约新闻》成为撰写长篇小说原稿的杂志体。此外，它被包括在《纽约时报》三年半后的百科全书列为百科全书的载体。"
          },
          {
            value:
              "版，在美国还把一个无法言说的事情说成一个人。如果这个人让懂这样的话，这个人就不是一名思想很广博的举动。"
          }
        ],
        状: [
          {
            value:
              "在2006年烏克蘭第一電視台節目的採訪中，tomsitland 說：「我想為大家帶來多樣化的魅力，它使你能夠動用語言和產品，而不仅仅是個非常適合實驗的寶貝，讓您能夠增進全世界的人們。」"
          },
          {
            value:
              "媒體季中克林頓基金會的觀眾打出相似的語言改進以幫助更好地了解語言。這個語言的內部重點是，我的推特用戶是提供令人不安和震撼的筍條字。"
          },
          {
            value:
              "编写的过程中会遇到许多编者，他们可能是即管理员、巡查、老用户维基、注册不久的新用户，贡献也有可能，他们都为所有在某一领域为维基做出了或多或少的贡献。"
          }
        ]
      };
    },
    handleSelect(item) {
      console.log(item);
      this.state2 = this.t_q + item.value;
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style>
</style>