export default {

    main_logo:"创新工场 AI 工程院",

    login_logo:"AI PARTICIPLE",

    navBar: {
        active: "0", // 当前位置，当前仅支持第一个，分词体验
        list: [
          {
            name: "效果体验",
            subActive: "0", // 默认显示第一个，情感分析
            submenu: [
              {
                icon: "el-icon-s-home",
                name: "后台首页",
                pathname:"index"
              },
              {
                icon: "el-icon-service",
                name: "情感分析",
                // pathname:"shop_goods_list"
                pathname:"exp_txtSentiAna"
              },
              {
                icon: "el-icon-notebook-1",
                name: "文本分类",
                // pathname:"shop_goods_list"
                pathname:"exp_txtCla"
              },
              {
                icon: "el-icon-tickets",
                name: "分词",
                pathname:"exp_txtPar"
              },
              {
                icon: "el-icon-edit",
                name: "NER",
                pathname:"exp_txtNer"
              },
              {
                icon: "el-icon-mouse",
                name: "POS",
                pathname:"exp_txtPos"
              }
            ]
          },
          { name: "解决方案",
            subActive: "0",
            submenu:[
                {
                    icon: "el-icon-notebook-1",
                    name: "算法解析",
                    pathname:"temp_test"
                }
            ]
          },
          { name: "合作方案" },
          { name: "AI加速器" },
          { name: "AI市场" }
        ]
      }
}