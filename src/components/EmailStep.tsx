import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { i18n } from '@/utils/i18n'

export function EmailStep({
  email,
  setEmail,
  handleSubmit,
  resetEmail,
  loading,
  error,
}) {
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <form
      class="flex flex-col gap-3 w-full relative"
      onSubmit={(e) => {
        e?.preventDefault()
        if (isValidEmail(email)) handleSubmit()
      }}
      role="form"
    >
      {loading && (
        <div class="top-3 right-3 absolute z-10">
          <Loader />
        </div>
      )}
      <label for="email" class="text-sm self-start">
        {i18n.t('email')}
      </label>

      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder={i18n.t('emailPlaceholder')}
        disabled={loading}
        aria-invalid={!!error}
        class="flex-1 border-none bg-white/20 p-3 outline-none rounded-sm border-solid border-2 border-transparent focus:border-white/50 "
      />

      {error && (
        <div class="text-dark-error" aria-live="assertive">
          {i18n.t('AErrorHasOccured')}
        </div>
      )}

      <div class="flex justify-between gap-2 mt-3">
        <Button type="reset" onClick={resetEmail} disabled={loading}>
          {i18n.t('reset')}
        </Button>
        <Button type="submit" disabled={loading}>
          {i18n.t('next')}
        </Button>
      </div>
    </form>
  )
}
