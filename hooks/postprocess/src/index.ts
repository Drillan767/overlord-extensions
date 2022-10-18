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
		console.log('item has a title')
	}
	return item
}