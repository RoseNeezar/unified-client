import App from 'next/app'
import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core'
import { themeDark, themeLight } from '../lib/theme'
import { AppProps } from 'next/dist/next-server/lib/router/router'

const Apps = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (!jssStyles && jssStyles!.parentNode) {
      jssStyles!.parentNode.removeChild(jssStyles!)
    }
  }, [])
  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Apps
