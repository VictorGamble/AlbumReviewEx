const express = require('express');
const router = express.Router();
const albumModel = require('../models/albumModel')

/* GET home page. */
router.get('/', async function (req, res, next) {
    const data = await albumModel.getAllAlbums();

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
            title: 'express',
            albumData: albumData
        },
        partials: {
            partial: 'partial-single'
        }
    })
});

router.post('/', async function (req, res) {
    console.log(req.body);
    const {
        name,
        title,
        stars,
        review,
        reviewer_id,
        album_id
    } = req.body

    const postData = await albumModel.addReviews(name,
        title,
        stars,
        review,
        reviewer_id,
        album_id);
    console.log(postData);

    res.status(200).redirect('/');
});


module.exports = router;