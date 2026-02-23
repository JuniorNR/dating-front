import { defineConfig } from 'orval';

export default defineConfig({
	api: {
		input: {
			target: 'http://localhost:3001/docs-json/',
		},
		output: {
			target: 'src/shared/api/apiGenerated.ts',
			client: 'react-query',
			mode: 'single',
			override: {
				mutator: {
					path: 'src/shared/api/apiFetch.ts',
					name: 'customApiFetch',
				},
				query: {
					useQuery: true,
					useMutation: true,
				},
			},
		},
	},
});
