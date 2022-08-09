const express = require('express');
const  mongoose = require('mongoose');
const  PostMessage = require('../models/postMessage');
const router = express.Router();


exports.createPost = async (req, res) => {
    const post = req.body;
    const title = req.body.title;
    const message = req.body.message;
    const selectedFile = req.body.selectedFile;
    // const creator = req.body.creator;
    const tags = req.body.tags;
    const creator = req.userId;
   
    // console.log(title,message,selectedFile,creator,tags);

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags,createdAt: new Date().toISOString() })
    // const newPostMessage = new PostMessage({...post,creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
/**
 *   Update Post with Patch
 * 
 */
exports.updatePost = async (req,res)=>{
    const {id} = req.params;
    const creator = req.userId;
    const { title, message, selectedFile, tags } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`);
    const updatePost = { title, message, selectedFile, creator, tags,_id:id } 
    await PostMessage.findByIdAndUpdate(id,updatePost);
    res.json(updatePost);
}

/** Get All  Posts  */

exports.getPosts = async (req,res)=>{
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

/** Get Single Post */

exports.getPost = async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    try {
        const post = await PostMessage.findById(id)
        if(post!=null)
        {
            res.status(200).json(post);
        }
        else
        {
            res.status(404).send(`No post with id:${id}`)
        }
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

/** Delete Single Post */

exports.deletePost = async (req,res) =>{
    const {id} = req.params;
    const post = await PostMessage.findById(id)
    if(post!=null)
    {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`);
        await PostMessage.findByIdAndRemove(id);
        res.json({ message: "Post deleted successfully." });
    }
    else
    {
        res.status(404).send(`No post with id:${id}`)
    }
  
}


exports.likePost = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}
exports.getPostsBySearch = async (req,res) =>{
    
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}