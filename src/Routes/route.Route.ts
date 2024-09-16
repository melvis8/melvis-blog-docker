import { Router } from "express";
import blogController from "../Controller/blog.Controller";

const Route = {
	GET_ONE_BLOG: '/article/:id',
	GET_ALL_BLOGS: '/article/articles/all',
	CREATE_ONE_BLOG: '/article',
	CREATE_MANY_BLOGS: '/articles/all',
	DELETE_BLOG: '/article/delete',
	DELETE_ALL_BLOGS: '/article/delete/all',
	CHANGE_BLOG: '/article/:id'
};

export const router = Router()

router.get(Route.GET_ONE_BLOG, blogController.getOneBlog)
router.get(Route.GET_ALL_BLOGS, blogController.getManyBlogs)
router.post(Route.CREATE_ONE_BLOG, blogController.createOneUser)
router.post(Route.CREATE_MANY_BLOGS, blogController.createManyUSers)
router.delete(Route.DELETE_BLOG,blogController.deleteOneBlog)
router.delete(Route.DELETE_ALL_BLOGS,blogController.deleteAllBlogs)
router.put(Route.CHANGE_BLOG,blogController.updateBlog)
