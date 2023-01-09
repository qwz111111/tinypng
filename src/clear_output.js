const fs = require('fs')
const path = require('path')
const { deleteFiles } = require('./utils/utils.cjs')

// 上一级目录
const cwd = path.resolve(__dirname, '..')
//删除目录下所有文件和文件夹
const root = `${cwd}\\output`
deleteFiles(root)
if (!fs.existsSync(root)) {
  fs.mkdirSync(root)
}
