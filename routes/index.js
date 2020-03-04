const express = require('express');
const router = express.Router();
const albumModel = require('../models/albumModel')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const data = await albumModel.getAllAlbums();
  console.log(data)


  res.render('template', {
    locals: {
      title: 'express',
      data: data
    },
    partials: {
      partial: 'partial-index'
    }
  })
})

router.get('/:id?', async (req, res) => {
  const {
    id
  } = req.params;
  const albumData = await albumModel.getAlbumAndReviewDetails(id)
  res.render('template', {
    locals: {
      title: albumData[0].name,
      albumData: albumData
    },
    partials: {
      partial: 'partial-single'
    }
  })
});

module.exports = router;