const router = require ("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const commentRoutes = require("./comment");

//create new post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//update post
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

//delete post
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await Post.findByIdAndDelete(req.params.id);
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  



//get post
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
          // Update the view count
    post.views += 0.5;

    // Save the updated post
    await post.save();
    res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL POSTS
  router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Create new comment
router.post("/:postId/comment", async (req, res) => {
  const { postId } = req.params;
  const { username, text } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new Comment({
      postId: post._id,
      username,
      text,
    });

    const savedComment = await newComment.save();

    // Add the comment to the post's comments array
    post.comments.push(savedComment._id);
    await post.save();

    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comments for a post
router.get("/:postId/comments", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like a post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Assuming you have a 'likes' field in your Post model
    post.likes = (post.likes || 0) + 1; // Increment likes
    await post.save();

    // Respond with the updated post
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Increment view count
router.put('/:id/view', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the view count
    post.views += 1;

    // Save the updated post
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.use("/:postId", commentRoutes);

module.exports = router;