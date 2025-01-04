import { Modal } from '@/components/Modal'

import { i18n } from '@/utils/i18n'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'
import { EditIcon } from '@/components/EditIcon'
import { useProfile } from '@/hooks/useProfile'

export function Profile() {
  const {
    isInit,
    profile,
    avatarRef,
    canvasRef,
    alreadyExist,
    setProfile,
    updateAvatar,
    updateProfile,
  } = useProfile()
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
              onInput={(e) => updateAvatar(e, close)}
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
              onClick={() => updateProfile(profile, close)}
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
