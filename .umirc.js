
// ref: https://umijs.org/config/
export default {
	treeShaking: true,
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		['umi-plugin-react', {
            antd: true,
            dva: true,
            //dynamicImport: { webpackChunkName: true },
            dynamicImport: true,
            title: 'mombx-umi',
            dll: false,
            locale: {
                enable: true,
                default: 'zh-CN',
                baseNavigator: true,
            },
            hardSource: false,
            routes: {
                exclude: [
                /components\//,
                ],
            },
		}],
	],
	proxy: {
        // '/data': {
        //     target: 'http://172.16.5.23:9090',
        //     changeOrigin: true,
        //     // pathRewrite: { '^/server': '' },
        // },
        '/scm/': {
            // target: 'http://data.paat.net',
            // target: 'http://172.16.5.23:9090',
            target: 'http://jieji.paat.org',
            // target: 'http://172.16.5.23:9090',
            changeOrigin: true,
           // pathRewrite: { '^/app': '' },
        }

    },
    targets: {
        ie: 11,
    },
    externals:{
        'BMap':'BMap'
    },
    hash: true
}
