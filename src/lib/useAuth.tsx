import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { useCurrentUserQuery } from './graphql/currentUser.graphql'
import { useSignInMutation } from './graphql/signin.graphql'
import { useSignUpMutation } from './graphql/signup.graphql'

type AuthProps = {
  user: any
  error: string
  signIn: (email: any, password: any) => Promise<void>
  signUp: (email: any, password: any) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<Partial<AuthProps>>({})

function useProvideAuth(): AuthProps {
  const client = useApolloClient()
  const router = useRouter()

  const [error, setError] = useState('')
  const { data } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  })

  const user = data && data.currentUser

  const [signInMutation] = useSignInMutation()
  const [signUpMutation] = useSignUpMutation()

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await signInMutation({
        variables: { input: { email, password } },
      })
      if (data?.login.token && data.login.user) {
        localStorage.setItem('token', data.login.token)
        client.resetStore().then(() => {
          router.push('/')
        })
      } else {
        setError('Invalid login')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data } = await signUpMutation({
        variables: { email, password },
      })
      if (data?.register.token && data.register.user) {
        localStorage.setItem('token', data.register.token)
        client.resetStore().then(() => {
          router.push('/')
        })
      } else {
        setError('Invalid signout')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const signOut = () => {
    localStorage.removeItem('token')
    client.resetStore().then(() => {
      router.push('/')
    })
  }
  return {
    user,
    signIn,
    error,
    signOut,
    signUp,
  }
}

export const AuthProvider = ({ children }: any) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
