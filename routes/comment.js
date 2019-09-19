const express = require('express');
const router = express.Router();
const request  = require('../util/request');

router.get('/', async (req, res, next) => {
  const { id, pageNo = 1, pageSize = 20, type = 0 } = req.query;

  if (!id) {
    return res.send({
      result: 500,
      errMsg: 'id 不能为空',
    });
  }

  const result = await request({
    url: 'http://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg',
    data: {
      biztype: 1,
      topid: id,
      cmd: [8, 6][type],
      pagenum: pageNo - 1,
      pagesize: pageSize,
    }
  });

  res.send(result);
});

module.exports = router;
