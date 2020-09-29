const webpack = require('webpack');
const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');  



const distPath = path.join(__dirname,'/public/dist/');  

var plugins = []; 
var entry = {};
var pages = [
    'reqlogin','reqsignup','reqforget','reqassociate_google','reqsignup_google','reqtask','reqimage','reqaudio'
];

function setHtmlWebpackPlugin(){
    pages.map(function(name){
        plugins.push(new HtmlWebpackPlugin({
            filename: 'html/'+name+'.html',  
            template: './view/'+name+'/'+name+'.html', 
            inject: true,
            chunks : ['react','react-dom','material-core','commons', name],
            hash: true, 
        }));
    });
}
setHtmlWebpackPlugin();

function setEntry(){
    pages.map(function(name){
        entry[name] = './view/'+name+'/'+name+'.js';
    });
}
setEntry();

module.exports = {
    //入口文件，这里循环所有入口文件，不需要每个都写出来
    entry: entry,
    output: {
        //打包文件存放的绝对路径，html、css、js都会按这个路径打包
        path: distPath,  
        //网站运行时的访问路径，不设置的话，打包出的html中的默认引用的路径会是相对路径
        publicPath: "/static/",  
        //打包后的文件名 
        filename: 'js/[name].js'  
    },
    mode:'development',
    resolve: {
        //require文件的时候不需要写后缀了，可以自动补全
        extensions: ['*','.js', '.jsx','.css']
    },
    module: {
        rules: [//定义一系列加载器
            {test: /\.html$/,use: "html-loader"},  /*html*/
            {test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }},     /*es6 to es5*/
            {test: /\.css$/, use: [{loader:"style-loader"},{loader:"css-loader"}]},                      /*css to css*/
        ]
    },
    plugins: plugins , //使用插件
    optimization: {
        splitChunks: {
          chunks: 'async', 
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~', 
          name: true,
          cacheGroups: {
            react:{
                name: "react",
                chunks: "all",
                test: /react/,
                priority: 100
            },
            commons: {
                name: "commons",
                chunks: "initial",
                minChunks: 2,
                priority: 80
            }
          }
        }
    }
    //watch: true //开启观察者模式
};