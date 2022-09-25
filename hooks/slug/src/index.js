import { defineHook } from '@directus/extensions-sdk';

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