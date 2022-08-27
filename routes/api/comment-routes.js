const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
            order: [['created_at', 'DESC']],
            attributes: [
                'id', 
                'comment_text', 
            ],
            order: [['created_at', 'DESC']],
            include: [
                //include the user model here:
                {
                    model: User,
                    attributes: ['id', 'username'],
                },
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_url']
                }
            ]
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        
    })
});

module.exports = router;