import express from 'express'
import {getFeedPosts, getUserPosts , likePost} from '../controllers/posts.mjs'
import { verifyToken } from '../middleware/auth.mjs'

const router=express.Router()

// Read
router.get('/',verifyToken,getFeedPosts)
router.get('/:userId',verifyToken,getUserPosts)

// Update
router.patch('/:id/like',verifyToken,likePost)

export default router