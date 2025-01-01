import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}tv/search/:type`, (ctx) => {
    const url = new URL(ctx.request.url)
    const type = ctx.params.type
    const query = url.searchParams.get('query')

    if (type === 'movie' && query === 'test') {
      return HttpResponse.json({
        results: [{ id: 100, type: 'movie', title: 'Test Movie' }],
      })
    }

    if (type === 'tv' && query === 'test') {
      return HttpResponse.json({
        results: [{ id: 100, type: 'tv', title: 'Test TV Show' }],
      })
    }

    if (query === 'test error') {
      return new HttpResponse('Search error', {
        status: 500,
        statusText: 'Search error',
      })
    }

    return HttpResponse.json([])
  }),
  http.get(`${import.meta.env.VITE_API_URL}tv/:type/:tmdb_id`, (ctx) => {
    if (ctx.params?.tmdb_id === '1') {
      return HttpResponse.json({
        seasons: [
          { season_number: 1, episode_count: 10 },
          { season_number: 2, episode_count: 10 },
        ],
      })
    }

    if (ctx.params.type === 'movie' && ctx.params?.tmdb_id === '30') {
      return HttpResponse.json({
        id: 30,
        type: 'movie',
        title: 'Test Movie',
      })
    }

    if (ctx.params.type === 'movie' && ctx.params?.tmdb_id === '404') {
      return new HttpResponse('Not Found', {
        status: 404,
        statusText: 'Not Found',
      })
    }

    if (ctx.params.type === 'tv' && ctx.params?.tmdb_id === '1') {
      return HttpResponse.json({
        id: 1,
        type: 'tv',
        title: 'Test TV Show',
      })
    }

    // error case
    if (ctx.params?.tmdb_id === '666') {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Not Found',
      })
    }
  }),
  http.get(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/watchlist`, (req) => {
    const url = new URL(req.request.url)

    if (url.searchParams.get('tmdb_id') === 'eq.1') {
      return HttpResponse.json({ id: 1, type: 'movie', title: 'Test Movie' })
    }

    if (url.searchParams.get('tmdb_id') === 'eq.2') {
      return HttpResponse.json({
        id: 2,
        type: 'movie',
        title: 'Test Movie',
      })
    }

    if (url.searchParams.get('tmdb_id') === 'in.(100)') {
      return HttpResponse.json([
        {
          id: 100,
          type: 'movie',
          title: 'Test Movie',
        },
      ])
    }

    if (url.searchParams.get('type') === 'eq.movie') {
      return HttpResponse.json([
        { id: 1, type: 'movie', title: 'Test Movie' },
        { id: 2, type: 'tv', title: 'Test TV Show' },
      ])
    }

    return new HttpResponse('ERROR', {
      status: 500,
      statusText: 'ERROR',
    })
  }),
  http.head(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/enriched_posts`,
    () => {
      return new HttpResponse('', {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Range': '0-9/100' },
      })
    }
  ),
  http.get(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/enriched_posts`,
    () => {
      return HttpResponse.json([
        {
          id: 1,
          user_id: 'user1',
          username: 'User 1',
          avatar: '/avatar1.png',
          type: 'movie',
          media_id: 1,
          title: 'Movie 1',
          poster_path: '/poster1.jpg',
          updated_at: '2022-01-01T00:00:00Z',
          content: null,
          media_state: 'planned',
          current_episode: null,
          current_season: null,
          wcurrent_episode: null,
          wcurrent_season: null,
          rating: 5,
          status: 'completed',
        },
      ])
    }
  ),
  http.post(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/watchlist`, (req) => {
    return HttpResponse.json({})
  }),
  http.patch(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/watchlist`,
    async (req) => {
      const body = await req.request.json()
      //@ts-ignore
      if (body?.status === 'planned') {
        return HttpResponse.json({})
      }

      //@ts-ignore
      if (body.current_episode === 2 && body.current_season === 1) {
        return HttpResponse.json({})
      }

      return new HttpResponse('ERROR', {
        status: 500,
        statusText: 'ERROR',
      })
    }
  ),
  http.head(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/watchlist`, () => {
    return new HttpResponse('', {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Range': '0-9/100' },
    })
  }),
]
