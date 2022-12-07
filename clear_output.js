const fs = require('fs')

const { deleteFiles } = require('./utils/deleteFiles.cjs')
// 当前文件路径
const cwd = process.cwd()
//删除目录下所有文件和文件夹
deleteFiles(`${cwd}\\output`)
if (!fs.existsSync(`${cwd}\\output`)) {
  fs.mkdirSync(`${cwd}\\output`)
}