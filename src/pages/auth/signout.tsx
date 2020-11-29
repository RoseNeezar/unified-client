import React, { useEffect } from 'react'
import { useAuth } from '../../lib/useAuth'

const SignOut = () => {
  const { signOut } = useAuth()
  useEffect(() => {
    signOut!()
  }, [])
  return <div>SignOut</div>
}

export default SignOut
