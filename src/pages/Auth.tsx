import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { OtpInputs } from '@/components/OtpInputs'
import { Logo } from '@/components/Logo'
import { i18n } from '@/utils/i18n'
import { supabase } from '@/utils/supabase'
import { useState } from 'preact/hooks'

export function Login() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    })

    if (error) setError(true)
    else setStep(2)

    setLoading(false)
  }

  const resetEmail = () => {
    setEmail('')
  }

  return (
    <div class="flex flex-col sm:grid sm:grid-cols-[1fr_2fr] text-light-text dark:text-dark-text dark:bg-dark-bg bg-light-bg h-lvh">
      <div class="flex flex-col items-end justify-center gap-2 p-4 border-r-1 border-r-solid border-r-white/10">
        <Logo />
        <h1 class="text-xl font-bold">{i18n.t('logOtp')}</h1>
      </div>
      <div class="sm:w-sm w-full p-6 sm:p-0 sm:w-auto sm:m-auto">
        {step === 2 && (
          <div class="flex flex-col gap-3 w-full items-center sm:items-start">
            <label class="text-sm sm:self-start self-center">
              {i18n.t('otpCodeEnter')}
            </label>
            <OtpInputs email={email} />
            {error && (
              <div class="text-dark-error">{i18n.t('AErrorHasOccured')}</div>
            )}
          </div>
        )}
        {step === 1 && (
          <form
            class="flex flex-col gap-3 w-full relative"
            onSubmit={handleSubmit}
          >
            {loading && (
              <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
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
              class="flex-1 border-none bg-white/20 p-3 outline-none rounded-sm border-solid border-2 border-transparent focus:border-white/50 "
            />

            {error && (
              <div class="text-dark-error">{i18n.t('AErrorHasOccured')}</div>
            )}

            <div class="flex justify-between gap-2 mt-3">
              <Button type="reset" onClick={resetEmail}>
                {i18n.t('reset')}
              </Button>
              <Button type="submit">{i18n.t('next')}</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
