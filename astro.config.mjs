// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Typst 中文文档站',
			logo: {
				light: '/src/assets/Typst.svg',
				dark: '/src/assets/Typst.svg',
				replacesTitle: true,
			},
			sidebar: [
				{
					label: '教程',
					autogenerate: {
						directory: 'tutorial',
					},
				},
				{
					label: '参考',
					autogenerate: {
						directory: 'reference'
					},
				},
			],
		}),
	],
});
