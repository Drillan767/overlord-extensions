import { defineHook } from '@directus/extensions-sdk';
import { parse } from 'node-html-parser';

export default defineHook(({ filter }) => {
	filter('Articles.items.create', async (item) => handle(item));
	filter('Articles.items.update', async (item) => handle(item));
	filter('Project.items.create', async (item) => handle(item))
	filter('Project.items.update', async (item) => handle(item))
});

const handle = async (item) => {
	if (item.hasOwnProperty('title')) {
		item.slug = await slugify(item.title)
	}

	console.log({item})

	if (item.hasOwnProperty('body')) {
		console.log('Item has body omg')
		const { toc, body } = handleToC(item.body)
		console.log(toc)
		item.toc = toc
		item.body = body
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

const link = (header) => `<li><a href="#"${header.id}">${header.title}</a></li>`

const handleToC = (body) => {
	let headers = []

	const document = parse(body)
	const headings = document.querySelectorAll('h2, h3, h4, h5, h6')
	headings.forEach((h) => {
		h.setAttribute('id', slugify(h.innerHTML))
		headers.push({
			id: h.getAttribute('id'),
			level: parseInt(h.tagName.replace('H', '')),
			title: h.innerText
		})
	})

	let toc = '<ul>'

	headers.forEach((header, index) => {
		if (index) {
			var prev = headers[index - 1]
		}
		if (!index || prev.level === header.level) {
			toc += link(header)
		}
		else if (prev.level > header.level) {
			toc += '</ul>' + link(header)
		}
		else if (prev.level < header.level) {
			toc += '<ul>' + link(header)
		}
	})
	  
	toc += '</ul>'

	return {
		toc: toc,
		body: document.toString()
	}
}