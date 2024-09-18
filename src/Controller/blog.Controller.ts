import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../core/constants';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface Iblog {
	title: string;
	Slug: string;
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
	createOneUser: async (req: Request, res: Response) => {
		const { title, Slug, vue, content }  = req.body;
		console.log(req.body)
		try {
			const myBlog = await prisma.blog.create({
				data: {
					title,
					Slug,
					vue,
					content
				}
			});
			if(!title || !Slug || !content || !vue){
            res.json({msg:"please fill all the fields"})
			}
			res.json(myBlog);
			console.log(myBlog);
		} catch (error) {
			console.error(error);
			res.json({msg:"not created"}).status(HttpCode.BAD_REQUEST);
		}
	},
	createManyUSers: async (req: Request, res: Response): Promise<void> => {
		try {
			const { title, Slug, content, vue } : Iblog = req.body;
			console.log(req.body)
			 // Ensure all required fields are present
			 if (!title || !Slug || !content || !vue) {
				 res.status(400).json({ message: "All fields are required" });
			}
			const myBlogs = await prisma.blog.createMany({
				data: [{title, Slug, content, vue}]
			});
			 res.json(myBlogs).status(HttpCode.CREATED)
			console.log("succes")
		} catch (error) {
			console.error(error);
			res.json({ msg: 'not created' }).status(HttpCode.BAD_REQUEST)
		}
	},
	updateBlog: async (req: Request, res: Response): Promise<void> => {
		const { title, Slug, vue, content } : Iblog = req.body;
		const { id } = req.params;

		const blogId: string = id;
		try {
			const blog = await prisma.blog.update({
				where: {
					Id: blogId
				},
				data: {
					title,
					Slug,
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
