import { useEffect, useState } from 'preact/hooks'
import { supabase } from '@/utils/supabase'

export function useUser(user_id: string) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleFetch = async () => {
      const { data } = await supabase
        .from('profiles')
        .select()
        .eq('id', user_id)
        .single()

      setUser(data)
    }

    handleFetch()
  }, [user_id])

  return user
}
