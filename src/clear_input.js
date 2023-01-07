const fs = require('fs')
const { deleteFiles } = require('./utils/utils.cjs')

// 当前文件路径
const cwd = process.cwd()
//删除目录下所有文件和文件夹
const root = `${cwd}\\input`
deleteFiles(root)
if (!fs.existsSync(root)) {
  fs.mkdirSync(root)
}
