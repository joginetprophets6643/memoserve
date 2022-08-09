const  express = require('express');
const router = express.Router()
const  auth = require('../middleware/auth.js')
const postController =  require('../controllers/postController.js');
router.post('/',auth, postController.createPost);
router.patch('/:id',auth,postController.updatePost);
router.get('/',postController.getPosts);
router.get('/:id',postController.getPost);
router.delete('/:id',auth,postController.deletePost);
router.patch('/:id/likePost', auth, postController.likePost);
router.get('/search',postController.getPostsBySearch);
module.exports = router;