import { useEffect, useState } from 'preact/hooks'
import { supabase } from '@/utils/supabase'
import { MEDIA_STATUS, PER_PAGE } from '@/utils/constants'

export function useFetchPosts() {
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [posts, setPosts] = useState([])
  const totalPages = Math.ceil(total / PER_PAGE)

  const fetchcount = async () => {
    setLoading(true)
    const { count } = await supabase
      .from('enriched_posts')
      .select('id', { count: 'exact', head: true })

    setLoading(false)
    setTotal(count)
  }

  const fetchPosts = async (page: number) => {
    const { data, error } = await supabase
      .from('enriched_posts') // Appelle la vue
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1)

    if (error) {
      console.error('Error fetching posts:', error.message)
      return
    }

    setPosts(
      data.map((post_) => {
        const post = { ...post_, hide: true }

        //movie
        if (!post.current_episode || !post.current_season) {
          if (
            post.media_state === MEDIA_STATUS.PLANNED ||
            post.media_state === MEDIA_STATUS.NOT_SEEN ||
            //Status is watchlist
            post?.status?.match(/completed|not_interested/)
          ) {
            post.hide = false
          }
        }

        //TV
        if (
          typeof post.current_episode === 'number' ||
          typeof post.current_season === 'number'
        ) {
          if (post.wcurrent_season > post.current_season) post.hide = false

          if (
            post.wcurrent_season === post.current_season &&
            post.wcurrent_episode > post.current_episode
          )
            post.hide = false
        }

        return post
      })
    )
  }

  useEffect(() => {
    fetchcount()
  }, [])

  return { loading, posts, fetchPosts, totalPages }
}
