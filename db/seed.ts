import { Clients, db } from 'astro:db';

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


	// TODO

	console.log('seed executed');

}
