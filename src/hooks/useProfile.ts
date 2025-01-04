import { useSession } from '@/providers/session'
import { Profile } from '@/types/profile'
import { supabase } from '@/utils/supabase'
import { useEffect, useRef, useState } from 'preact/hooks'

export function useProfile() {
  const session = useSession()
  const [isInit, setIsInit] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    username: undefined,
    email: undefined,
    avatar: undefined,
    updated_at: undefined,
    id: undefined,
  })

  const [alreadyExist, setAlreadyExist] = useState(false)

  const profileRef = useRef(profile)
  const avatarRef = useRef(null)
  const canvasRef = useRef(null)

  const handleFetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id)
      .maybeSingle()

    if (data) {
      setProfile(data as Profile)
      profileRef.current = data as Profile
    }
    // fetch profile
    setIsInit(true)
  }

  const updateProfile = async (profile: Profile, close: () => void) => {
    setAlreadyExist(false)
    const { data: existUserName } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', profile.username)
      .neq('id', session.user.id)
      .maybeSingle()

    if (existUserName) {
      setAlreadyExist(true)
      return
    }

    const { error } = await supabase
      .from('profiles')
      .upsert({ ...profile, id: session.user.id, updated_at: new Date() })
      .eq('id', session.user.id)

    if (error) {
      setProfile(profileRef.current)
      return
    } else {
      profileRef.current = profile as Profile
    }
    close()
  }

  const updateAvatar = async (e: any, close: () => void) => {
    const file = e.target.files[0]
    if (!file) return

    const SIZE = 64
    const imageUrl = URL.createObjectURL(file)

    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      canvas.width = SIZE
      canvas.height = SIZE

      const aspectRatio = img.width / img.height

      let drawWidth = SIZE
      let drawHeight = SIZE
      let offsetX = 0
      let offsetY = 0

      if (aspectRatio > 1) {
        drawWidth = SIZE * aspectRatio
        offsetX = (SIZE - drawWidth) / 2
      } else {
        drawHeight = SIZE / aspectRatio
        offsetY = (SIZE - drawHeight) / 2
      }
      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

      canvas.toBlob(async (blob) => {
        if (!blob) return

        avatarRef.current.src = URL.createObjectURL(blob)

        const path = `avatar/${session.user.id}`

        await supabase.storage.from('avatars').remove([path])
        const { data, error } = await supabase.storage
          .from('avatars')

          .upload(path, blob)
        if (error) {
          console.error('Error uploading avatar:', error.message)
          return
        }

        await updateProfile({ ...profile, avatar: data.path }, close)
      }, 'image/png')
    }

    img.onerror = () => {
      console.error("Impossible de charger l'image.")
    }
  }

  useEffect(() => {
    if (!session?.user?.id) return
    handleFetchProfile()
  }, [session])

  return {
    profile,
    isInit,
    alreadyExist,
    avatarRef,
    canvasRef,
    setProfile,
    updateProfile,
    updateAvatar,
  }
}
