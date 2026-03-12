import type { AlbumItem, TrackItem } from '$lib/components/Music/Music.svelte';

export const TRACKS: (AlbumItem | TrackItem)[] = [
	{
		id: 'fullband',
		title: 'Full Band',
		credits: '2007 AOA Industries',
		artwork: '/images/band.jpg',
		items: [
			{
				id: 'changethechannel',
				title: 'Change the Channel',
				artist: `All Obstacles Aside`,
				src: '/music/full_band/01 Change the Channel.mp3'
			},
			{
				id: 'yesterdayslosses',
				title: "Yesterday's Losses",
				artist: `All Obstacles Aside`,
				src: '/music/full_band/02 Yesterdays Losses.mp3'
			},
			{
				id: 'giveitup',
				title: 'Give it Up',
				artist: `All Obstacles Aside`,
				src: '/music/full_band/Give It Up.mp3'
			},
			{
				id: 'preferhugstohandshakes',
				title: 'Prefer Hugs to Handshakes',
				artist: `All Obstacles Aside`,
				src: '/music/full_band/Prefer Hugs to Handshakes.mp3'
			},
			{
				id: 'sowhatifitsfarewell',
				title: "So What If It's Farewell",
				artist: `All Obstacles Aside`,
				src: '/music/full_band/So What if its Farewell.mp3'
			}
		]
	},

	{
		id: 'fakeband',
		title: 'Re-records (Fake Band)',
		credits: `2012 AOA Industries`,
		artwork: '/images/band2.jpg',
		items: [
			{
				id: 'changethechannel',
				title: 'Change The Channel',
				artist: `All Obstacles Aside`,
				src: '/music/fake_band/01 Change The Channel.mp3'
			},
			{
				id: 'yesterdayslosses',
				title: "Yesterday's Losses",
				artist: `All Obstacles Aside`,
				src: "/music/fake_band/02 Yesterday's Losses.mp3"
			},
			{
				id: 'doctordoctor',
				title: 'Doctor Doctor',
				artist: `All Obstacles Aside`,
				src: '/music/fake_band/03 Doctor Doctor.mp3'
			},
			{
				id: 'interlude',
				title: 'Interlude',
				artist: `All Obstacles Aside`,
				src: '/music/fake_band/04 Interlude.mp3'
			},
			{
				id: 'sowhatifitsfarewell',
				title: "So What if it's Farewell",
				artist: `All Obstacles Aside`,
				src: '/music/fake_band/05 So What If Its Farewell.mp3'
			}
		]
	},

	{
		id: 'midnightsgig',
		title: 'Midnights - 21st February 2008',
		credits: `2008 AOA Industries`,
		artwork: '/images/midnights.jpg',
		items: [
			{
				id: 'Change the Channel',
				title: 'Change the Channel',
				artist: 'All Obstacles Aside',
				src: '/music/midnights/01-Change the Channel.mp3'
			},
			{
				id: "Yesterday's Losses",
				title: "Yesterday's Losses",
				artist: 'All Obstacles Aside',
				src: "/music/midnights/02-Yesterday's Losses.mp3"
			},
			{
				id: 'Give it Up',
				title: 'Give it Up',
				artist: 'All Obstacles Aside',
				src: '/music/midnights/03-Give it Up.mp3'
			},
			{
				id: 'Fell in Love Without You',
				title: 'Fell in Love Without You',
				artist: 'All Obstacles Aside',
				src: '/music/midnights/04-Fell in Love Without You.mp3'
			},
			{
				id: 'Eighty Eights',
				title: 'Eighty Eights',
				artist: 'All Obstacles Aside',
				src: '/music/midnights/05-Eighty Eights.mp3'
			},
			{
				id: 'Ghostbusters',
				title: 'Ghostbusters',
				artist: 'All Obstacles Aside',
				src: '/music/midnights/06-Ghostbusters.mp3'
			},
			{
				id: "What's My Age Again",
				title: "What's My Age Again",
				artist: 'All Obstacles Aside',
				src: "/music/midnights/07-What's My Age Again.mp3"
			},
			{
				id: "So What If It's Farewell (Intro",
				title: "So What If It's Farewell (Intro)",
				artist: 'All Obstacles Aside',
				src: "/music/midnights/08-So What If It's Farewell (Intro).mp3"
			},
			{
				id: "So What If It's Farewell",
				title: "So What If It's Farewell",
				artist: 'All Obstacles Aside',
				src: "/music/midnights/09-So What If It's Farewell.mp3"
			}
		]
	},

	{
		id: 'covers',
		title: 'Covers',
		credits: '2007 AOA Industries',
		artwork: '/images/covers.jpg',
		items: [
			{
				id: 'Attractive Today',
				title: 'Attractive Today (Motion City Soundtrack)',
				artist: 'All Obstacles Aside',
				src: '/music/covers/Attractive Today.mp3'
			},
			{
				id: '88s done and dusted',
				title: 'Eighty Eights (Farewell)',
				artist: 'All Obstacles Aside',
				src: '/music/covers/88s done and dusted.mp3'
			},
			{
				id: 'The Lovecats',
				title: 'The Lovecats (The Cure)',
				artist: 'All Obstacles Aside',
				src: '/music/covers/The Lovecats.mp3'
			}
		]
	},

	{
		id: 'intros',
		title: 'Intros',
		credits: `2008 AOA Industries`,
		artwork: `/images/beaver.jpg`,
		items: [
			{
				id: 'Enter Shikari Start.WAV',
				title: 'Enter Shikari (Enter Shikari))',
				artist: 'All Obstacles Aside',
				src: '/music/intros/Enter Shikari Start.WAV.mp3'
			},
			{
				id: 'Labyrinth Start.WAV',
				title: 'Labyrinth (Enter Shikari)',
				artist: 'All Obstacles Aside',
				src: '/music/intros/Labyrinth Start.WAV.mp3'
			},
			{
				id: 'Mothership intro ES',
				title: 'Mothership (Enter Shikari)',
				artist: 'All Obstacles Aside',
				src: '/music/intros/Mothership intro ES.mp3'
			},
			{
				id: 'My Favorite Accident.WAV',
				title: 'My Favorite Accident (My Favourite Accident)',
				artist: 'All Obstacles Aside',
				src: '/music/intros/My Favorite Accident.WAV.mp3'
			},
			{
				id: 'So What if its Farewell',
				title: 'So What if its Farewell (All Obstacles Aside)',
				artist: 'All Obstacles Aside',
				src: '/music/intros/So What if its Farewell.mp3'
			},
			{
				id: 'S.Y.N.A.W.WAV',
				title: "Sorry You're Not a Winner (Enter Shikari) [Ver. 1]",
				artist: 'All Obstacles Aside',
				src: '/music/intros/S.Y.N.A.W.WAV.mp3'
			},
			{
				id: 'SYNAW INTRO',
				title: "Sorry You're Not a Winner (Enter Shikari) [Ver. 2]",
				artist: 'All Obstacles Aside',
				src: '/music/intros/SYNAW INTRO.mp3'
			},
			{
				id: 'SYNAW Start.WAV',
				title: "Sorry You're Not a Winner (Enter Shikari) [Ver. 3]",
				artist: 'All Obstacles Aside',
				src: '/music/intros/SYNAW Start.WAV.mp'
			}
		]
	},

	{
		id: 'misc',
		title: 'Misc',
		credits: `2008 AOA Industries`,
		artwork: `/images/misc.jpg`,
		items: [
			{
				id: 'Attractive Today live',
				title: 'Attractive Today (Motion City Soundtrack)[LIVE]',
				artist: 'All Obstacles Aside',
				src: '/music/misc/attractive.mp3'
			},

			{
				id: 'swiif',
				title: "So What if it's Farewell (J-Dizzle Remix)",
				artist: 'J-Dizzle',
				src: '/music/misc/So What if its Farewell.mp3'
			}
		]
	},

	{
		id: 'demos',
		title: 'Demos',
		credits: `2007 AOA Industries`,
		artwork: `/images/cool3.jpg`,
		items: [
			{
				id: 'start',
				title: 'Start is Mint',
				artist: 'All Obstacles Aside',
				src: `/music/demos/start.mp3`
			},
			{
				id: '36',
				title: '36',
				artist: 'All Obstacles Aside',
				src: `/music/demos/36.mp3`
			},
			{
				id: 'Baby We Have A Connection (Wireless)',
				title: 'Baby We Have A Connection (Wireless)',
				artist: 'All Obstacles Aside',
				src: `/music/demos/Baby We Have A Connection.mp3`
			},
			{
				id: 'Bigomy',
				title: 'Bigomy',
				artist: 'All Obstacles Aside',
				src: `/music/demos/Bigomy.mp3`
			},
			// {
			// 	id: 'bloc',
			// 	title: 'Bloc',
			// 	artist: 'All Obstacles Aside',
			// 	src: `/music/demos/bloc.mp3`
			// },
			{
				id: 'Christmas Does not Mean Shitmas',
				title: 'Christmas Does not Mean Shitmas',
				artist: 'All Obstacles Aside',
				src: `/music/demos/Christmas Does not Mean Shitmas.mp3`
			},
			{
				id: 'christmastime',
				title: 'CHRISTMAS!!!!!',
				artist: 'All Obstacles Aside',
				src: `/music/demos/christmastime.mp3`
			},
			{
				id: 'Electro start',
				title: 'Electro start',
				artist: 'All Obstacles Aside',
				src: `/music/demos/Electro start.mp3`
			},
			{
				id: 'Glide Baby Glide',
				title: 'Glide Baby Glide',
				artist: 'All Obstacles Aside',
				src: `/music/demos/Glide Baby Glide.mp3`
			},
			{
				id: 'GranMum.wav',
				title: 'Gran Mum',
				artist: 'All Obstacles Aside',
				src: `/music/demos/GranMum.wav.mp3`
			},
			{
				id: 'mix down',
				title: 'Untitled (24/10/07)',
				artist: 'All Obstacles Aside',
				src: `/music/demos/mix down.mp3`
			},
			{
				id: 'mix down.WAV',
				title: 'Untitled (10/02/06)',
				artist: 'All Obstacles Aside',
				src: `/music/demos/mix down.WAV.mp3`
			},
			{
				id: 'mix down2',
				title: 'Untitled (15/10/07)',
				artist: 'All Obstacles Aside',
				src: `/music/demos/mix down2.mp3`
			},
			{
				id: 'mp3',
				title: 'FTSK',
				artist: 'All Obstacles Aside',
				src: `/music/demos/mp3.mp3`
			},
			{
				id: 'So What if its Farewell',
				title: 'So What if its Farewell',
				artist: 'All Obstacles Aside',
				src: `/music/demos/So What if its Farewell.mp3`
			},
			{
				id: 'space',
				title: 'Space',
				artist: 'All Obstacles Aside',
				src: `/music/demos/space.mp3`
			},
			{
				id: 'riff',
				title: 'Riff',
				artist: 'All Obstacles Aside',
				src: `/music/demos/riff.mp3`
			}
		]
	}
];
