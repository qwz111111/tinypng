const fs = require('fs')
const path = require('path')

/**
 * @param {string} url 被扫描的文件夹路径
 */
function deleteFiles(url) {
  var files = []
  /**
   * 判断给定的路径是否存在
   */
  if (fs.existsSync(url)) {
    /**
     * 返回文件和子目录的数组
     */
    files = fs.readdirSync(url)
    files.forEach(function (file, index) {
      var curPath = path.join(url, file)
      /**
       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
       */
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFiles(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    /**
     * 清除文件夹
     */
    fs.rmdirSync(url)
  } else {
    console.log('给定的路径不存在，请给出正确的路径')
  }
}

/**
 * @param {string} dirname 递归创建目录 同步方法
 * @return {boolean}
 */
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * @param {number} size 递归创建目录 同步方法
 * @return {string}
 */
function transition(size) {
  const map = [
    [() => size < 1024, () => `${size}字节`],
    [() => size < 1048576, () => `${(size / 1024).toFixed(1)}kb`]
  ]
  const target = map.find(m => m[0]())
  if (target) {
    return target[1]()
  } else {
    return `${(size / 1048576).toFixed(2)}Mb`
  }
}
module.exports = {
  deleteFiles,
  mkdirsSync,
  transition
}
