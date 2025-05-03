import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {


	await db.insert(Clients).values([
		{ id: 1, name: 'Alan', isActive: true, age: 28 },
		{ id: 2, name: 'Jon Snow', isActive: true, age: 25 },
		{ id: 3, name: 'Daenerys Targaryen', isActive: true, age: 24 },
		{ id: 4, name: 'Arya Stark', isActive: true, age: 18 },
		{ id: 5, name: 'Tyrion Lannister', isActive: true, age: 32 },
		{ id: 6, name: 'Cersei Lannister', isActive: false, age: 42 },
		{ id: 7, name: 'Bran Stark', isActive: false, age: 20 },
	]);


	const posts = await getCollection('blog');


	await db.insert(Posts).values(
		posts.map(post => ({
			id: post.id,
			title: post.data.title,
			likes: Math.round(Math.random() * 100),
		}))
	)



	console.log('seed executed');

}
