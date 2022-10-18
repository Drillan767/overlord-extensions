import { defineHook } from '@directus/extensions-sdk';

type Content = {
	title: string,
	body: string,
	toc: string,
	slug: string
}

export default defineHook(({ filter }) => {
	filter('Articles.items.create', async (item) => handle(item));
	filter('Articles.items.update', async (item) => handle(item));
	filter('Project.items.create', async (item) => handle(item))
	filter('Project.items.update', async (item) => handle(item))
})

const handle = async (item: Content) => {
	console.log(item)

	if (item.hasOwnProperty('title')) {
		item.title = slugify(item.title)
		console.log('item has a title')
	}

	return item
}

const slugify = (string: string) => {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLocaleLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, '-')
}