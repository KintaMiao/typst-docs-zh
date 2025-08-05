// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Typst 中文文档站',
			logo: {
				src: '/src/assets/Typst.svg',
				replacesTitle: true,
			},
			favicon: '/src/assets/typst-favicon-32x32.png',
			sidebar: [
				{
					label: '欢迎来到 Typst',
					link: '/welcome',
				},
				{
					label: '中文支持快速指北',
					link: '/chinese-suppot',
				},
				{
					label: '教程',
					autogenerate: {
						directory: 'tutorial',
					},
				},
				{
					label: '迁移指南',
					autogenerate: {
						directory: 'migration',
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
