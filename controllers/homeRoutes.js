

// declaring routes: 
const { userInfo } = require('os');
const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');


// Get request for login info: 
router.get('/login', (req, res) => {
    // if user is logged in, then re-route to home:
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});



// Get request for signup info:
router.get('/signup', (req, res) => {
    // if user is logged in, then re-route to home:
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');

})

// route for post id:
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment, 
                attributes: ['comment_text', 'id', 'post_id', 'user_id', 'created_at']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No posts found with this ID' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        res.render('single-post', {
            post, loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Get requestfinding all id, title, created date, and content:
router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'id', 'post_id', 'user_id', 'created_at'],
              
            }
        
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get ({ plain: true }));
        res.render('homepage', {
            posts, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;