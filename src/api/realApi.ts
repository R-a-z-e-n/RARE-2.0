import type { Product, Service, User, LoginCredentials, SignupCredentials } from '@/types'
import client from './client'

export const realApi = {
  products: {
    list: async (category?: string): Promise<Product[]> => {
      const { data } = await client.get<Product[]>('/products', { params: { category } })
      return data
    },
    get: async (id: number): Promise<Product & { ingredients: string; usage: string; images: string[]; description: string }> => {
      const { data } = await client.get<Product & { ingredients: string; usage: string; images: string[]; description: string }>(`/products/${id}`)
      return data
    }
  },

  services: {
    list: async (category?: string): Promise<Service[]> => {
      const { data } = await client.get<Service[]>('/services', { params: { category } })
      return data
    }
  },

  auth: {
    login: async (credentials: LoginCredentials): Promise<User & { token: string }> => {
      const { data } = await client.post<{ user: User; token: string }>('/auth/login', credentials)
      return { ...data.user, token: data.token }
    },
    signup: async (credentials: SignupCredentials): Promise<User & { token: string }> => {
      const { data } = await client.post<{ user: User; token: string }>('/auth/signup', credentials)
      return { ...data.user, token: data.token }
    },
    // Mobile login is not yet implemented in the real backend, so we'll keep it as a placeholder or mock for now
    loginWithMobile: async (phone: string, otp: string): Promise<User & { token: string }> => {
      console.log('Mobile login is mocked for now:', phone, otp)
      throw new Error('Mobile login not implemented in real backend')
    }
  },

  bookings: {
    create: async (data: any): Promise<{ success: boolean; booking: any }> => {
      const { data: response } = await client.post('/bookings', data)
      return { success: true, booking: response.booking }
    },
    list: async (): Promise<any[]> => {
      const { data } = await client.get('/bookings')
      return data
    }
  },

  wishlist: {
    add: async (productId: number): Promise<any> => {
      const { data } = await client.post('/wishlist', { productId })
      return data
    },
    remove: async (productId: number): Promise<any> => {
      const { data } = await client.delete(`/wishlist/${productId}`)
      return data
    },
    list: async (): Promise<any[]> => {
      const { data } = await client.get('/wishlist')
      return data
    }
  }
}
