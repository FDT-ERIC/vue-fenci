/**
 * 规则：
 * 一、以 index 结尾的，如 index/index，shop/index，path 和 name 默认去除 index
 * 二、其他的，如 shop/list，默认生成 name 为 shop_list，path 为 /shop/list
 * 三、如果本身存在 name 和 path，则不会自动生成
 */

let routes = [
    {
        path:'/',
        name:'layout',
        redirect:{name:'index'}, //重定向到 index 主界面
        // component:()=>import('../../views/layout.vue'),
        component:'layout',
        children:[
            {
                // path:'/index',
                // name:'index',
                // component:()=>import('../../views/index/index.vue')
                meta:{title:'效果体验'},
                component:'index/index'
            },
            {
                // path:'/shop/goods/list',
                meta:{title:'后台首页'},
                // component:'shop/goods/list'
                component:'exp/home'
            },
            {
                // path:'/shop/goods/list',
                meta:{title:'情感分析'},
                // component:'shop/goods/list'
                component:'exp/txtSentiAna'
            },
            {
                // path:'/shop/goods/list',
                meta:{title:'文本分类'},
                // component:'shop/goods/list'
                component:'exp/txtCla'
            },
            {
                // path:'/shop/goods/list',
                meta:{title:'分词'},
                // component:'shop/goods/list'
                component:'exp/txtPar'
            },
            {
                // path:'/shop/goods/list',
                meta:{title:'NER'},
                // component:'shop/goods/list'
                component:'exp/txtNer'
            },
            {
                // path:'/shop/goods/list',
                meta:{title:'POS'},
                // component:'shop/goods/list'
                component:'exp/txtPos'
            },
        ]
    },
    {
        // path:'/login',
        // name:'login',
        // component:()=>import('../../views/login/index.vue')
        meta:{title:'用户登录'},
        component:'login/index'
    },
    {
        path:'*',
        redirect:{name:'index'}, //网址错误时，重定向到 index 主界面
    },
]

// 获取路由信息方法 (递归)
let getRoutes = function() {
    // 生成路由详细信息
    createRoute(routes)
    return routes
}

// 自动生成路由 (递归)
function createRoute(arr) {
    for (let i = 0; i < arr.length; i++) {
        // 为空时，直接 return 返回主界面
        if (!arr[i].component) return 
        // index 结尾的，去除 index
        let val = getValue(arr[i].component)
        // 生成 name ('shop_goods_list')
        arr[i].name = arr[i].name || val.replace(/\//g, '_')
        // 生成 path ('/shop/goods/list')
        arr[i].path = arr[i].path || `/${val}`
        // 自动生成 component
        let componentFun = import(`../../views/${arr[i].component}.vue`)
        arr[i].component = ()=>componentFun
        // 存在 children 子件时，递归
        if (arr[i].children && arr[i].children.length > 0) {
            createRoute(arr[i].children)
        }
    }
}

// index 结尾的，去除 index
function getValue(str) {
    // 获取最后一个 反斜杠 / 的索引
    let index = str.lastIndexOf('/')
    // 获取最后一个 / 后面的值
    let val = str.substring(index+1, str.length)
    // 判断是不是 index 结尾
    if (val == 'index') {
        return str.substring(index, -1)
    }
    return str
}

export default getRoutes()