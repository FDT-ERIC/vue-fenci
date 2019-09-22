export default {

    main_logo:"创新工场大湾区AI研究院",

    login_logo:"AI PARTICIPLE",

    navBar: {
        active: "0", // 当前位置，当前仅支持第一个，分词体验
        list: [
          {
            name: "效果体验",
            subActive: "0", // 默认显示第一个，后台首页
            submenu: [
              {
                icon: "el-icon-s-home",
                name: "后台首页",
                pathname:"app_index"
              },
              {
                icon: "el-icon-tickets",
                name: "分词",
                pathname:"app_exp_txtPar"
              },
              {
                icon: "el-icon-mouse",
                name: "POS",
                pathname:"app_exp_txtPos"
              },
              {
                icon: "el-icon-edit",
                name: "NER",
                pathname:"app_exp_txtNer"
              },
              {
                icon: "el-icon-service",
                name: "情感分析",
                // pathname:"shop_goods_list"
                pathname:"app_exp_txtSentiAna"
              },
              {
                icon: "el-icon-notebook-1",
                name: "文本分类",
                // pathname:"shop_goods_list"
                pathname:"app_exp_txtCla"
              }
            ]
          },
          { name: "解决方案",
            subActive: "0",
            submenu:[
                {
                    icon: "el-icon-notebook-1",
                    name: "算法解析",
                    pathname:"app_solution_test"
                }
            ]
          },
          { name: "合作方案" },
          // { name: "AI加速器" },
          // { name: "AI市场" }
        ]
      }
}