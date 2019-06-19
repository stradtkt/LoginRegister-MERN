const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Feed = require('../../models/Feed');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


router.post('/',[auth,[check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const user = await User.findById(req.user.id).select('-password');
        const newFeed = new Feed({
          text: req.body.text,
          name: user.name,
          user: req.user.id
        });
        const feed = await newFeed.save();
        res.json(feed);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

router.get('/', auth, async (req, res) => {
    try {
      const feeds = await Feed.find().sort({ date: -1 });
      res.json(feeds);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/:id', auth, async (req, res) => {
    try {
      const feed = await Feed.findById(req.params.id);
  
      if (!feed) {
        return res.status(404).json({ msg: 'Feed not found' });
      }
      res.json(feed);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Feed not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const feed = await Feed.findById(req.params.id);
      if (!feed) {
        return res.status(404).json({ msg: 'Feed not found' });
      }
      if (feed.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      await feed.remove();
      res.json({ msg: 'Feed removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Feed not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  router.put('/like/:id', auth, async (req, res) => {
    try {
      const feed = await Feed.findById(req.params.id);
      if (
        feed.likes.filter(like => like.user.toString() === req.user.id).length > 0
      ) {
        return res.status(400).json({ msg: 'Feed already liked' });
      }
      feed.likes.unshift({ user: req.user.id });
      await feed.save();
      res.json(feed.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const feed = await Feed.findById(req.params.id);
      if (
        feed.likes.filter(like => like.user.toString() === req.user.id).length ===
        0
      ) {
        return res.status(400).json({ msg: 'Feed has not yet been liked' });
      }
  
      // Get remove index
      const removeIndex = feed.likes.map(like => like.user.toString()).indexOf(req.user.id);
      feed.likes.splice(removeIndex, 1);
      await feed.save();
      res.json(feed.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.post('/comment/:id',[auth,[check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const user = await User.findById(req.user.id).select('-password');
        const feed = await Feed.findById(req.params.id);
        const newComment = {
          text: req.body.text,
          name: user.name,
          user: req.user.id
        };
        feed.comments.unshift(newComment);
        await feed.save();
        res.json(feed.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});
  
  router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const feed = await Feed.findById(req.params.id);
      const comment = feed.comments.find(comment => comment.id === req.params.comment_id);
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      const removeIndex = Feed.comments.map(comment => comment.id).indexOf(req.params.comment_id);
      feed.comments.splice(removeIndex, 1);
      await feed.save();
      res.json(feed.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;