const mockServer = require('./mockServer.js');
const host ="168.168.2.105";
const port ="8099";
const serverHost = "http://apidoc.ebixdev.cn:3000/mock/14";
const Timestamp = new Date().getTime();  //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
// const serverHost = "http://168.168.2.17:3000/mock/15"

module.exports = {
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
    /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: false,
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: host,
        // host: '0.0.0.0',
        port: port,
        // https: false,
        // hotOnly: false,
        /* 使用代理 api 和 request 的 baseURL 相关联*/
        proxy: {
            '/api': {
                target: 'http://ebixsystemv3api.ebixdev.cn',
                // target: 'http://backend.ebixsystem.v3',
                // ws: true,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
                router:mockServer.router(host,port,serverHost)
            },
            '/img': {
                target: 'https://ebixsystemv3img.ebixsys.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/img': ''
                }
            },

        }
    },
    configureWebpack: {
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
            filename: `assets/js/[name].${Timestamp}.js`,
            chunkFilename: `assets/js/[name].${Timestamp}.js`
        },
        externals: {
            "moment": "moment",
            "vue": "Vue",
            "Mock": "Mock",
            "VueQuillEditor": "VueQuillEditor"
        }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // 修改打包后css文件名
        extract: {
            filename: `assets/css/[name].${Timestamp}.css`,
            chunkFilename: `assets/css/[name].${Timestamp}.css`
        },
        // 开启 CSS source maps?
        sourceMap: false,
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/css/common.scss";`
            }
        }
    },
    // resolve: {
    //   alias: {
    //     '@scss': path.resolve(__dirname, 'src', 'scss'),
    //   }
    // }

}
