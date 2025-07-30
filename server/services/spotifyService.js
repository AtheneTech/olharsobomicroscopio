import axios from "axios";

let spotifyToken = {
  value: null,
  expiresAt: null,
};

async function getAccessToken() {
  if (spotifyToken.value && spotifyToken.expiresAt > new Date()) {
    return spotifyToken.value;
  }

  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await axios({
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    data: "grant_type=client_credentials",
  });

  const tokenData = response.data;
  spotifyToken = {
    value: tokenData.access_token,
    expiresAt: new Date(new Date().getTime() + tokenData.expires_in * 1000),
  };

  return spotifyToken.value;
}

export async function searchTracks(query) {
  if (!query) {
    return [];
  }

  const token = await getAccessToken();

  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: "track",
      limit: 10,
    },
  });

  return response.data.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    albumCover: track.album.images[2]?.url,
    url: track.external_urls.spotify,
  }));
}

export async function getTrackDetails(trackId) {
  if (!trackId) {
    throw new Error("Track ID is required.");
  }

  const token = await getAccessToken();

  const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const track = response.data;
  return {
    name: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    spotifyUrl: track.external_urls.spotify,
  };
}
