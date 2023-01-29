import { defineHook } from '@directus/extensions-sdk';

type Content = {
    title: string,
	body: string,
	toc: string,
	slug: string
}

type Header = {
	id: string,
	title: string
	level: Number,
}

export default defineHook(({ filter }) => {
    ['Articles', 'Project', 'Pages'].forEach((type) => {
        filter(`${type}.items.create`, async (item) => handle(item))
        filter(`${type}.items.update`, async (item) => handle(item))
    })
})

const handle = (item: unknown) => {
    const element = item as Content
    if (element.hasOwnProperty('title')) {
        element.slug = slugify(element.title)
    }

    return element
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