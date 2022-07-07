const path = require('path')
const lessPath = path.resolve(__dirname + '/src/assets/less/cover.less')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'cell-font-size': '24px',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${lessPath}";`,
          },
        },
      },
    },
  },
})
