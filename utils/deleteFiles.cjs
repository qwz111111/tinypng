const fs = require('fs')

/**
 * @param {string} url 被扫描的文件夹路径
 */

function deleteFiles(url) {
  try {
    fs.readdir(url, (err, files) => {
      console.log(files)
      if (err) throw err
      // // 判断是不是空文件夹 true 则删除
      if (files.length == 0) {
        // 删除该文件或者该文件夹
        fs.rmdir(url, function (err) {
          if (err) {
            throw err
          }
          console.log('目录:' + url + '删除成功！')
        })
      }
      // 该文件下的所有文件
      files.forEach(item => {
        // 该子项文件的文件路径
        let fliesUrl = url + '\\' + item
        // 同步读取文件是不是文件夹
        let stat = fs.lstatSync(fliesUrl)
        // 确认是文件夹
        if (stat.isDirectory()) {
          deleteFiles(fliesUrl)
        } else {
          // 删除该文件
          fs.unlink(fliesUrl, function (err) {
            if (err) {
              throw err
            }
            console.log('文件:' + fliesUrl + '删除成功！')
          })
        }
      })
    })
  } catch (error) {
    console.log('报错', error)
    return error
  }
}

module.exports = {
  deleteFiles
}
