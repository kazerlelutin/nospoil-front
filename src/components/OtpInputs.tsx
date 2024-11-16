import { useEffect, useRef, useState } from 'preact/hooks'
import { Loader } from './Loader'

type OtpInputsProps = {
  email: string
}

export function OtpInputs({ email }: OtpInputsProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const ctrl = useRef(new AbortController())

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
    console.log(code)
    if (ctrl.current) ctrl.current.abort()
    ctrl.current = new AbortController()
    const signal = ctrl.current.signal
    setLoading(true)

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + 'auth/verify', {
        method: 'POST',
        body: JSON.stringify({ email, otp: code }),
        signal,
      })

      if (!res.ok) throw new Error('An error has occured')
      const session = await res.json()
      console.log(session)

      //TODO Redirect to dashboard
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (ctrl.current) ctrl.current.abort()
    }
  }, [])

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
