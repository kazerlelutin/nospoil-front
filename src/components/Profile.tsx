import { useEffect, useRef, useState } from 'preact/hooks'
import { Modal } from './Modal'
import { supabase } from '@/utils/supabase'

import { EditIcon } from './EditIcon'
import { i18n } from '@/utils/i18n'
import { Button } from './Button'
import { useSession } from '@/providers/session'
import { Avatar } from './Avatar'

type Profile = {
  username: string | undefined
  email: string | undefined
  avatar: string | undefined
  updated_at?: Date | undefined
  id?: string | undefined
}
export function Profile() {
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
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id)
      .maybeSingle()

    if (error) {
      console.error('Error fetching profile:', error.message)
      return
    }
    if (data) {
      setProfile(data as Profile)
      profileRef.current = data as Profile
    }
    // fetch profile
    setIsInit(true)
  }

  const handleUpdateProfile = async (profile: Profile, close: () => void) => {
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

  const handleUpdateAvatar = async (e: any, close: () => void) => {
    const file = e.target.files[0]
    if (!file) return

    const SIZE = 64 // Taille souhaitée pour l'avatar
    const imageUrl = URL.createObjectURL(file)

    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      // Dimensions du canvas (carré)
      canvas.width = SIZE
      canvas.height = SIZE

      // Obtenir les dimensions et rapport d'aspect de l'image
      const aspectRatio = img.width / img.height

      // Calcul pour centrer l'image
      let drawWidth = SIZE
      let drawHeight = SIZE
      let offsetX = 0
      let offsetY = 0

      if (aspectRatio > 1) {
        // Image paysage : réduire la largeur pour qu'elle s'adapte
        drawWidth = SIZE * aspectRatio
        offsetX = (SIZE - drawWidth) / 2
      } else {
        // Image portrait : réduire la hauteur pour qu'elle s'adapte
        drawHeight = SIZE / aspectRatio
        offsetY = (SIZE - drawHeight) / 2
      }

      // Efface le canvas et dessine l'image centrée
      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

      // Convertir en blob pour l'upload ou affichage
      canvas.toBlob(async (blob) => {
        if (!blob) return

        // Injecte le blob dans l'avatarRef pour prévisualisation
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

        await handleUpdateProfile({ ...profile, avatar: data.path }, close)
      }, 'image/png') // Format PNG pour conserver la transparence si nécessaire
    }

    img.onerror = () => {
      console.error("Impossible de charger l'image.")
    }
  }

  useEffect(() => {
    if (!session?.user?.id) return
    handleFetchProfile()
  }, [session])

  if (!isInit) return null

  return (
    <Modal
      defaultOpen={isInit && !profile?.username}
      button={(open) => (
        <button class="text-xs gap-2 items-center flex" onClick={open}>
          <span>{profile?.username}</span>
          <Avatar src={profile?.avatar} alt="avatar" size="sm" />
        </button>
      )}
    >
      {(close) => (
        <div class="flex flex-col gap-4">
          <h2>{i18n.t('profile')}</h2>
          <div class="relative p-2 ">
            <div class="flex items-center justify-center">
              <Avatar src={profile?.avatar} alt="avatar" ref={avatarRef} />
              <canvas ref={canvasRef} class="hidden" />
            </div>

            <label
              class="fill-dark-text w-4 absolute top-0 right-0 cursor-pointer"
              for="avatar"
            >
              <EditIcon />
            </label>
            <input
              type="file"
              id="avatar"
              class="hidden"
              onInput={(e) => handleUpdateAvatar(e, close)}
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="block" for="username">
              {i18n.t('username')}
            </label>
            <input
              type="text"
              id="username"
              class="bg-black border-solid border-1 border-white/10 p-2 rounded-md w-full placeholder-white/50 placeholder-italic"
              placeholder={i18n.t('username')}
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.currentTarget.value })
              }
            />
            {alreadyExist && (
              <span class="text-red-500">
                {i18n.t('usernameAlreadyExists')}
              </span>
            )}
          </div>
          <div class="flex justify-between items-center flex-wrap gap-3">
            <Button onClick={() => close()} type="reset">
              {i18n.t('cancel')}
            </Button>
            <Button
              onClick={() => handleUpdateProfile(profile, close)}
              type="button"
              disabled={!profile.username}
            >
              {i18n.t('save')}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
