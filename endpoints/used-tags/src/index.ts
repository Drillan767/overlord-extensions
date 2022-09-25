import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint((router, {services, exceptions}) => {
	const { ItemsService } = services;
	const { ServiceUnavailableException } = exceptions;

	router.get('/articles', (req, res) => {
		const testService = new ItemsService('Tag', { schema: req.schema, accountability: req.accountability })

		testService
			.readByQuery({ sort: 'title', fields: ['title', 'description'] })
			.then((results: object) => res.json(results))
			.catch((error: object) => {
				throw new ServiceUnavailableException(error.message);
			});
		
	});
	router.get('/projects', (_req, res) => {
		res.json({message: 'henlo fren'})
	})
});
