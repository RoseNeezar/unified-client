import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core'
import { themeDark, themeLight } from '../lib/theme'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useApollo } from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from '../lib/useAuth'
import Header from '../components/Header'

const Apps = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const [darkState, setDarkState] = useState(false)

  const handleThemeChange = () => {
    setDarkState(!darkState)
  }

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (!jssStyles && jssStyles!.parentNode) {
      jssStyles!.parentNode.removeChild(jssStyles!)
    }
  }, [])
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkState ? themeDark : themeLight}>
        <CssBaseline />
        <AuthProvider>
          <Header darkState={darkState} handleThemeChange={handleThemeChange} />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default Apps
