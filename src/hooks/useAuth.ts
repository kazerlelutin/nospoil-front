import { useState } from 'preact/hooks'
import { supabase } from '@/utils/supabase'

export function useAuth() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e?.preventDefault()

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

  return {
    step,
    email,
    setEmail,
    error,
    loading,
    handleSubmit,
    resetEmail,
  }
}
