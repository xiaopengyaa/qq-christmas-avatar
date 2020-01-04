var express = require('express')
var axios = require('axios')
var path = require('path')
var fs = require('fs')
var app = express()

// 托管静态文件
app.use('/src', express.static(path.join(__dirname, './src')))

// 新增路由
app.get('/avatar', function(req, res) {
  if (req.query.qq) {
    downloadFile(path.join(__dirname, './src/avatar'), req.query.qq, function() {
      res.sendFile(path.join(__dirname, './index.html'))
    })
  } else {
    res.sendFile(path.join(__dirname, './index.html'))
  }
})

app.listen(8080, function() {
  console.log('启动成功，端口监听8080')
})

// 下载qq头像
function downloadFile (oPath, name, cb) {
  var url = 'http://q.qlogo.cn/headimg_dl?dst_uin=' + name + '&spec=640'
  var streamName = path.join(oPath, name + '.jpg')
  axios.get(url, {
    responseType: 'stream'
  }).then(function(res) {
    res.data.pipe(fs.createWriteStream(streamName))
    typeof cb === 'function' && cb()
  })
}