import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint((router) => {
	router.get('/articles', (_req, res) => res.send('Hello, World! -- articles'));
	router.get('projects', (_req, res) => res.send('Hello, World! -- projects'))
});
