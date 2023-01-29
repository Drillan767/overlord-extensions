import { defineHook } from '@directus/extensions-sdk';

type Content = {
    title?: string
    slug: string
}

const events = ['items.create', 'items.update']

export default defineHook(({ filter }) => {
    filter('*.*', (payload, meta) => {
        if (events.includes(meta.event) && /_translations$/.test(meta.collection)) {
            const item = payload as Content

            if (item.title) {
                item.slug = slugify(item.title)
            }

            return item
        }

        return payload
    })
})

const slugify = (string: string) => {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLocaleLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, '-')
}