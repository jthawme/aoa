import { error } from '@sveltejs/kit';

const getFolderKey = (str) => str.match(/media\/(.+)\//)?.[1];

// export async function entries() {
// 	const folders = await import.meta.glob('$lib/media/**/*.md', { eager: true });

// 	return Object.entries(folders).flatMap(([key, obj]) => {
// 		const folder = getFolderKey(key);

// 		return [
// 			...new Array(obj.media.length).fill(0).map((_, idx) => {
// 				return {
// 					album: folder,
// 					id: idx.toString()
// 				};
// 			}),
// 			{
// 				album: folder
// 			}
// 		];
// 	});
// }

/** @type {import('../$types').PageServerLoad} */
export async function load({ params }) {
	const folders = await import.meta.glob('$lib/media/**/*.md', { eager: true });

	if (!params.album) {
		return {
			media: Object.entries(folders).map(([key, obj]) => {
				const folder = getFolderKey(key);
				return {
					link: `/media/${folder}`,
					title: `${obj.title} (${obj.media.length})`,
					cover:
						obj.media.find((item) => typeof item.src === 'object' && 'sources' in item.src)?.src ??
						'/images/play.png'
				};
			})
		};
	}

	const album = Object.entries(folders).find(([key]) => key.includes(`/${params.album}/`));

	if (!album[1]) {
		throw error(404, {
			message: 'Album not found'
		});
	}

	if (typeof params.id === 'undefined') {
		return {
			...album[1],
			media: album[1].media.map((obj, idx) => {
				return {
					link: `/media/${params.album}/${idx}`,
					title: obj.title ?? obj.src?._filename ?? `media_${idx.toString().padStart(4, '0')}`,
					cover: typeof obj.src === 'object' ? obj.src : '/images/play.png'
				};
			})
		};
	}

	if (params.id < 0 || params.id >= album[1].media.length) {
		throw error(404, {
			message: 'Media not found'
		});
	}

	return {
		...album[1],
		item: album[1].media[params.id],
		prev: params.id > 0 && `/media/${params.album}/${parseInt(params.id) - 1}`,
		next:
			params.id < album[1].media.length - 1 && `/media/${params.album}/${parseInt(params.id) + 1}`
	};
}
