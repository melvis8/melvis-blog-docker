import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../core/constants';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface Iblog {
	title: string;
	slug: string;
	vue: number;
	content: string;
}

const blogController = {
	getOneBlog: async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const blogId: string = id;
		try {
			const NewBlog: object | null = await prisma.blog.findUnique({
				where: {
					Id: blogId
				}
			});
			if (!NewBlog) res.json(NewBlog).status(HttpCode.OK);
			res.json({ msg: 'no user in the database' });
		} catch (error) {
			console.log(error);
			res.json({ msg: 'no user' }).status(HttpCode.BAD_REQUEST);
		}
	},
	getManyBlogs: async (req: Request, res: Response): Promise<void> => {
		try {
			const blogs: object | null = await prisma.blog.findMany();
			res.json(blogs).status(HttpCode.OK);
		} catch (error) {
			console.log(error);
			res.json({ msg: 'no users in db' }).status(HttpCode.BAD_REQUEST);
		}
	},
	createOneUser: async (req: Request, res: Response): Promise<void> => {
		const { title, slug, vue, content } : Iblog = req.body;
		try {
			const myBlog = await prisma.blog.create({
				data: {
					title,
					slug,
					vue,
					content
				}
			});
			res.json(myBlog);
			console.log(myBlog);
		} catch (error) {
			console.error(error);
			res.json({ msg: 'not created' }).status(HttpCode.BAD_REQUEST);
		}
	},
	createManyUSers: async (req: Request, res: Response): Promise<void> => {
		try {
			const { title, slug, content, vue } : Iblog = req.body;
			const myBlogs = await prisma.blog.createMany({
				data: [{title, slug, content, vue}]
			});
		} catch (error) {
			console.error(error);
			res.json({ msg: 'not created' }).status(HttpCode.BAD_REQUEST)
		}
	},
	updateBlog: async (req: Request, res: Response): Promise<void> => {
		const { title, slug, vue, content } : Iblog = req.body;
		const { id } = req.params;

		const blogId: string = id;
		try {
			const blog = await prisma.blog.update({
				where: {
					Id: blogId
				},
				data: {
					title,
					slug,
					vue,
					content
				}
			});
		} catch (error) {
			console.error(error);
			res.json({ msg: 'not updated sorry' }).status(HttpCode.FORBIDDEN);
		}
	},
	deleteOneBlog : async (req: Request, res: Response): Promise<void> =>{
		const {id} = req.body
		const blogId: string = id;
		try {
			const blog = await prisma.blog.delete({
				where:{
					Id:blogId
				}
			})
		} catch (error) {
			console.error(error);
			res.json({ msg: 'not updated sorry' }).status(HttpCode.UNAUTHORIZED);
		}
	},
	deleteAllBlogs : async (req: Request, res: Response): Promise<void> =>{
		const blog = await prisma.blog.deleteMany()
	}
};

export default blogController;
