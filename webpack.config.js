const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/main.js',
    resolve: {
        alias: {
            language:"src/language" // 地址重定向，当打包中使用language时实际为src/language
        }
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "http://wpq.cpm/"
        //chunkFilename: "[name].chunk.min.js"        异步加载时需要被打包的文件名
    },
    module: {

    },
    plugins:[
        new HtmlwebpackPlugin({
            template: './index.html',
            //title:'',
            //inject:true,  //true/'head'/'body'/false true或body时js放置在body底部，head则在head元素中
            //favicon:'', // 添加 favicon 图标
            hash:true,//是否为静态资源生成hash值
            minify:{
                removeComments :true,//删除html中的注释
                collapseWhitespace:true//删除html中的换行符和空白值
            }
        }),
    ]
}
