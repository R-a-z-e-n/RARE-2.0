import { useMutation } from '@tanstack/react-query'
import { api } from '@/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

export function useLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()

  return useMutation({
    mutationFn: api.auth.login,
    onSuccess: (user) => {
      toast.success(`Welcome back, ${user.name}`)
      login(user)
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed')
    }
  })
}

export function useSignup() {
  const navigate = useNavigate()
  const { login } = useAuth()

  return useMutation({
    mutationFn: api.auth.signup,
    onSuccess: (user) => {
      toast.success('Membership created successfully')
      login(user)
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Signup failed')
    }
  })
}

export function useMobileLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()

  return useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) => api.auth.loginWithMobile(phone, otp),
    onSuccess: (user) => {
      toast.success(`Welcome back, ${user.name}`)
      login(user)
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Mobile login failed')
    }
  })
}
