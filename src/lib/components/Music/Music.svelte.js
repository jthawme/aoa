/**
 * @typedef {object} TrackItem
 * @property {string} id
 * @property {string} title
 * @property {string} artist
 * @property {string} src
 *
 * @typedef {object} AlbumItem
 * @property {string} id
 * @property {string} title
 * @property {string} credits
 * @property {string} artwork
 * @property {TrackItem[]} items
 */

/** @type {AlbumItem[]} */
export const TRACKS = [
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
	}
];

export let stats = $state({
	plays: 420,
	downloads: 0,
	total: 69000
});

export let playerContext = $state({
	playing: false,
	loaded: false,
	duration: 0,
	currentTime: 0,
	volume: 1
});

/** @type {{id: null | string, position: number}} */
let playerQueueContext = $state({
	id: null,
	position: -1
});

let currentAlbum = $derived(
	playerQueueContext.id !== null ? TRACKS.find((album) => album.id === playerQueueContext.id) : null
);
let currentTrack = $derived(currentAlbum ? currentAlbum.items[playerQueueContext.position] : null);

export let getCurrentTrack = () => currentTrack;
export let getCurrentAlbum = () => currentAlbum;

/** @type {{current: HTMLAudioElement | null}} */
export let musicPlayer = $state({ current: null });

/** @type {{ current: AudioContext | null}} */
export let audioCtx = $state({ current: null });

export const instantiatePlayer = () => {
	if (!musicPlayer.current) {
		musicPlayer.current = new Audio();
		musicPlayer.current.onended = onTrackEnded;
		musicPlayer.current.onpause = () => {
			playerContext.playing = false;
			navigator.mediaSession.playbackState = 'paused';
		};
		musicPlayer.current.onplay = async () => {
			playerContext.playing = true;
			navigator.mediaSession.playbackState = 'playing';

			if (audioCtx.current && audioCtx.current.state !== 'running') {
				await audioCtx.current.resume();
			}
		};

		musicPlayer.current.addEventListener('canplaythrough', () => {
			playerContext.loaded = true;
		});

		musicPlayer.current.addEventListener('timeupdate', () => {
			if (!musicPlayer.current) {
				return;
			}

			playerContext.duration = musicPlayer.current.duration;
			playerContext.currentTime = musicPlayer.current.currentTime;
		});

		navigator.mediaSession.setActionHandler('play', () => {
			PLAYER.PLAY();
		});
		navigator.mediaSession.setActionHandler('pause', () => {
			PLAYER.PAUSE();
		});
		navigator.mediaSession.setActionHandler('stop', () => {
			PLAYER.STOP();
		});
		navigator.mediaSession.setActionHandler('seekbackward', (time) => {
			time.seekTime && PLAYER.SEEK(time.seekTime);
		});
		navigator.mediaSession.setActionHandler('seekforward', (time) => {
			time.seekTime && PLAYER.SEEK(time.seekTime);
		});
		navigator.mediaSession.setActionHandler('seekto', (time) => {
			time.seekTime && PLAYER.SEEK(time.seekTime);
		});
		navigator.mediaSession.setActionHandler('previoustrack', () => {
			PLAYER.PREVIOUS();
		});
		navigator.mediaSession.setActionHandler('nexttrack', () => {
			PLAYER.NEXT();
		});
	}

	return () => {
		if (musicPlayer.current) {
			musicPlayer.current.pause();
		}
	};
};

/**
 *
 * @param {number} volume
 */
export function changeVolume(volume) {
	playerContext.volume = volume;

	if (musicPlayer.current) {
		musicPlayer.current.volume = volume;
	}
}

export const PLAYER = {
	PLAY: () => {
		if (!musicPlayer.current) {
			return;
		}
		musicPlayer.current.play();

		if ('audioSession' in navigator) {
			navigator.audioSession.type = 'playback';
		}
	},
	PAUSE: () => {
		if (!musicPlayer.current) {
			return;
		}
		musicPlayer.current.pause();
	},
	STOP: () => {
		if (!musicPlayer.current) {
			return;
		}
		musicPlayer.current.pause();
		musicPlayer.current.currentTime = 0;
	},
	/**
	 *
	 * @param {number} time
	 */
	SEEK: (time) => {
		if (!musicPlayer.current) {
			return;
		}
		musicPlayer.current.currentTime = time;
	},
	NEXT: () => {
		playNext();
	},
	PREVIOUS: () => {
		playPrevious();
	}
};

const playNext = () => {
	if (!currentAlbum) {
		return;
	}

	if (currentAlbum.items.length > playerQueueContext.position + 1) {
		playerQueueContext.position += 1;
		playSong(currentAlbum.items[playerQueueContext.position], currentAlbum);
	}
};

const playPrevious = () => {
	if (!currentAlbum) {
		return;
	}

	if (playerQueueContext.position > 0) {
		playerQueueContext.position -= 1;
		playSong(currentAlbum.items[playerQueueContext.position], currentAlbum);
	}
};

const onTrackEnded = () => {
	playNext();
};

/**
 *
 * @param {TrackItem} track
 * @param {AlbumItem} album
 */
const playSong = (track, album) => {
	if (!musicPlayer.current) {
		console.warn('Player was not instantiated');
		return;
	}

	playerContext.loaded = false;
	musicPlayer.current.src = track.src;
	musicPlayer.current.currentTime = 0;
	musicPlayer.current.play();
	stats.plays += 1;

	navigator.mediaSession.metadata = new MediaMetadata({
		title: track.title,
		artist: track.artist,
		album: album.title,
		artwork: [
			{
				src: album.artwork,
				sizes: '256x256',
				type: 'image/png'
			}
		]
	});
};

/**
 *
 * @param {TrackItem} song
 * @param {string} albumContext The album Id
 */
export const queueSong = (song, albumContext) => {
	const album = TRACKS.find((album) => album.id === albumContext);

	if (!album) {
		return;
	}

	playerQueueContext.id = albumContext;
	playerQueueContext.position = album.items.findIndex((track) => track.id === song.id) ?? 0;

	playSong(song, album);
};
