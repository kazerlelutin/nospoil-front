import { useState } from 'preact/hooks'
import { Loader } from './Loader'
import { supabase } from '@/utils/supabase'

type OtpInputsProps = {
  email: string
}

export function OtpInputs({ email }: OtpInputsProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)

  const handleChange = (otpValue: string, startIndex: number) => {
    if (isNaN(Number(otpValue))) return

    const newOtp = [...otp]
    otpValue.split('').forEach((value, i) => {
      const index = startIndex + i
      if (index > 5) return
      newOtp.splice(index, 1, value)
    })

    setOtp(newOtp)

    if (newOtp.join('').length === 6) submitOtp(newOtp.join(''))
  }

  const submitOtp = async (code: string) => {
    setLoading(true)

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })

    // data session + user

    //TODO Redirect to dashboard

    if (error) {
      //TODO Handle error
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div class="flex gap-2 relative">
      {loading && (
        <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Array.from({ length: 6 }).map((_, i) => (
        <>
          <input
            type="text"
            key={i}
            value={otp[i]}
            class="w-12 h-12 text-center border-solid border-white/10  rounded-sm text-white text-lg"
            onInput={(e) => handleChange(e.currentTarget.value, i)}
          />
        </>
      ))}
    </div>
  )
}
