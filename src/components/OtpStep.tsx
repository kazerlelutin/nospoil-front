import { OtpInputs } from '@/components/OtpInputs'
import { i18n } from '@/utils/i18n'

export function OtpStep({ email, error }) {
  return (
    <div class="flex flex-col gap-3 w-full items-center sm:items-start">
      <label class="text-sm sm:self-start self-center">
        {i18n.t('otpCodeEnter')}
      </label>
      <OtpInputs email={email} />
      {error && <div class="text-dark-error">{i18n.t('AErrorHasOccured')}</div>}
    </div>
  )
}
