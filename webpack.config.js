const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Autoprefixer = require("autoprefixer");
const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require("webpack");


const projectRoot = path.resolve(__dirname, "./src");


module.exports = {
    entry: {
        "main": './src/main.js',
        "index": './src/index.js',
        "jquery":'jquery'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'src': "./src/" // 地址重定向，当打包中使用language时实际为src/language
        }
    },
    output: {
        filename: "[name].min.js",//[name].[ext]
        path: path.resolve(__dirname, 'dist'),
        //publicPath: "http://wpq.cpm/"
        //chunkFilename: "[name].chunk.min.js"        异步加载时需要被打包的文件名
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,//配置是将node_modules文件下的内容排除在外，降低编译时间。
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",// 编译后用什么loader来提取css文件
                    //publicfile:用来覆盖项目路径,生成该css文件的文件路径
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            //modules: true,
                            minimize: true,//是否压缩css
                            //localIdentName: '[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    },]
                }),
                //loader: ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader"),
                //use:["style-loader","css-loader","postcss-loader"],
                include: projectRoot
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1024,//图片小于这个值则将图片转化为base64码
                        outputPath: "static/",
                        //name:"[path][name].[ext]",// 不加name则使用hash
                        //publicPath:"http://hello.com/"
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './src/index.html',
            //title:'',
            //inject:true,  //true/'head'/'body'/false true或body时js放置在body底部，head则在head元素中
            //favicon:'', // 添加 favicon 图标
            chunks: ["index"],//对应的节点
            hash: true, //是否为静态资源生成hash值
            minify: {
                removeComments: true,//删除html中的注释
                collapseWhitespace: true//删除html中的换行符和空白值
            }
        }),  //html

        // new HtmlwebpackPlugin({
        //     filename: __dirname + '/dist/main.html',
        //     template: './src/index.html',
        //     //title:'',
        //     //inject:true,  //true/'head'/'body'/false true或body时js放置在body底部，head则在head元素中
        //     //favicon:'', // 添加 favicon 图标
        //     chunks: ["common","main"],//对应的节点
        //     hash: true, //是否为静态资源生成hash值
        //     minify: {
        //         removeComments: true,//删除html中的注释
        //         collapseWhitespace: true,//删除html中的换行符和空白值
        //         //removeAttributeQuotes: true 
        //     }
        // }),

        new ExtractTextPlugin("[name].css"), //分离css并添加css兼容

        // new UglifyJsPlugin({
        //     //include: /\/includes/,
        //     //exclude: /\/excludes/,
        // }),   //压缩js

        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, './src/*.html')),//绝对路径
        // }),  // 清除无用class

        // new webpack.optimize.CommonsChunkPlugin({
        //     name:['common','jquery'], // 注意不要.js后缀
        //     filename: "commons.js",
        //     chunks:['main','index'],
        //     minSize:1
        //     // name: ["common", "main", "index", "load"],
        //     // minChunks: 1
        // }),
        // 默认会把所有入口节点的公共代码提取出来,生成一个common.js  []对应相应的节点

    ]
}
