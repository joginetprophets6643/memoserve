const  express = require('express');
const router = express.Router()
const postController =  require('../controllers/postController.js');
router.post('/', postController.createPost);
router.patch('/:id',postController.updatePost);
router.get('/',postController.getPosts);
router.get('/:id',postController.getPost);
router.delete('/:id',postController.deletePost);
module.exports = router;