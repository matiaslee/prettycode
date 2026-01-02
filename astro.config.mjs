// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Código Bonito',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/FranZavalla/codigo-bonito-api-rest' }],
			defaultLocale: 'es',
 		    locales: {
				es: {
					label: 'Español'
				},
				en: {
					label: 'English'
				}
			},
			sidebar: [
				{
					label: 'Secciones', // Texto para el idioma por defecto (es)
					translations: {
						'en': 'Sections'  // Traducción para el idioma inglés
					},
					collapsed: false,
					items: [
						{
							label: 'Introducción',
							slug: 'index',
							translations: { 'en': 'Introduction' }
						},
						{
							label: 'Sintaxis y Semántica',
							slug: 'syntax-and-semantic',
							translations: { 'en': 'Syntax and Semantics' }
						},
						{
							label: 'Diseño de Funciones',
							slug: 'functions',
							translations: { 'en': 'Design of Functions' }
						},
						{
							label: 'Documentación',
							slug: 'documentation',
							translations: { 'en': 'Documentation' }
						},
						{
							label: 'Organización de un Proyecto de Software',
							slug: 'architecture',
							translations: { 'en': 'Software Project Organization' }
						},
						{
							label: 'Testing',
							slug: 'testing',
							translations: { 'en': 'Testing' }
						},
					],
				},
			],

//			sidebar: [
//				{
//					label: 'Secciones',
//					items: [
//						// Each item here is one entry in the navigation menu.
//						// { label: 'Introducción', slug: 'sections/introduction' },
//						{ label: 'Sintaxis y Semántica', slug: 'sections/sintaxis-y-semantica' },
//						{ label: 'Funciones', slug: 'sections/functions' },
//						{ label: 'Documentación y comentarios', slug: 'sections/documentation' },
//						{ label: "Organización de un Proyecto de Software",slug: 'sections/architecture'},
//						{ label: "Testing",slug: 'sections/testing'}
//					],
//				}
				//,
				//{
				//	label: 'Reference',
				//	autogenerate: { directory: 'reference' },
				//},
//			],
		}),

	],
});
