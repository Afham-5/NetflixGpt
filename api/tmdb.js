// Simple in-memory cache: { url: { data, timestamp } }
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method allowed" });
  }

  const { path, ...restParams } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing 'path' parameter" });
  }

  const searchParams = new URLSearchParams(restParams).toString();
  const tmdbUrl = `https://api.themoviedb.org/3/${path}${
    searchParams ? `?${searchParams}` : ""
  }`;

  // Use full URL as the cache key
  const cacheKey = tmdbUrl;

  // Check cache
  const cached = cache.get(cacheKey);
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return res.status(200).json(cached.data);
  }

  try {
    const tmdbRes = await fetch(tmdbUrl, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });
    // if (!tmdbRes.ok) {
    //   console.error("TMDB API returned error:", tmdbRes.status);
    //   return res.status(tmdbRes.status).json({ error: "TMDB API error" });
    // }
    const data = await tmdbRes.json();

    // Save to cache
    cache.set(cacheKey, { data, timestamp: now });

    res.status(200).json(data);
  } catch (error) {
    console.error("TMDB fetch error:", error);
    res.status(500).json({ error: "Failed to fetch from TMDB" });
  }
}
