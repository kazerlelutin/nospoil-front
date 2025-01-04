import { Logo } from '@/components/Logo'
import { i18n } from '@/utils/i18n'
import { useAuth } from '@/hooks/useAuth'
import { EmailStep } from '@/components/EmailStep'
import { OtpStep } from '@/components/OtpStep'

export function Login() {
  const { step, email, setEmail, error, loading, handleSubmit, resetEmail } =
    useAuth()

  return (
    <div class="flex flex-col sm:grid sm:grid-cols-[1fr_2fr] text-light-text dark:text-dark-text dark:bg-dark-bg bg-light-bg h-lvh">
      <div class="flex flex-col items-end justify-center gap-2 p-4 border-r-1 border-r-solid border-r-white/10">
        <Logo />
        <h1 class="text-xl font-bold">{i18n.t('logOtp')}</h1>
      </div>
      <div class="sm:w-sm w-full p-6 sm:p-0 sm:w-auto sm:m-auto">
        {step === 2 && <OtpStep email={email} error={error} />}
        {step === 1 && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            resetEmail={resetEmail}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  )
}
