const  express = require('express');
const router = express.Router()
const  auth = require('../middleware/auth.js')
const postController =  require('../controllers/postController.js');
router.post('/', postController.createPost);
router.patch('/:id',postController.updatePost);
router.get('/',postController.getPosts);
router.get('/:id',postController.getPost);
router.delete('/:id',postController.deletePost);
router.patch('/:id/likePost', auth, postController.likePost);
module.exports = router;