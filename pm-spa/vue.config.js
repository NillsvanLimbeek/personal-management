const path = require('path');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/utils/_mixins.scss";`,
            },
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@components': path.join(__dirname, '/src/components/'),
                '@views': path.join(__dirname, '/src/views/'),
                '@data': path.join(__dirname, '/src/data/'),
                '@state': path.join(__dirname, '/src/data/state/'),
                '@type': path.join(__dirname, '/src/data/type/'),
                '@models': path.join(__dirname, '/src/data/models/'),
                '@utils': path.join(__dirname, '/src/utils/'),
            },
        },
    },
    // resolve building error
    productionSourceMap: false,
};
