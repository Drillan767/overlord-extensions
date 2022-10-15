import { defineHook } from '@directus/extensions-sdk';
import { parse } from 'node-html-parser';

export default defineHook(({ filter }) => {
	filter('Articles.items.create', async (item) => handleSlug(item));
	filter('Articles.items.update', async (item) => handleSlug(item));
	filter('Project.items.create', async (item) => handleSlug(item))
	filter('Project.items.update', async (item) => handleSlug(item))
});

const handleSlug = async (item) => {
	if (item.hasOwnProperty('title')) {
		item.slug = await slugify(item.title)
	}

	if (item.hasOwnProperty('body')) {
		const document = parse(item.body)
		const headings = document.querySelector('h2, h3, h4, h5, h6')

		console.log(headings)
	}

	return item
}

const slugify = (string) => {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLocaleLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, '-')
}