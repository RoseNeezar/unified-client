import React, { FC } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Button,
  Link as LinkText,
  makeStyles,
  Switch,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useAuth } from '../lib/useAuth'

interface IHeader {
  handleThemeChange: () => void
  darkState: boolean
}

const Header: FC<IHeader> = ({ darkState, handleThemeChange }) => {
  const classes = useStyles()
  const { user } = useAuth()
  const links = [
    !user && { label: 'Sign Up', href: '/auth/signUp' },
    !user && { label: 'Sign In', href: '/auth/signin' },
    user && { label: 'Create', href: '/streams/new' },
    user && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((link) => link)
    .map(({ label, href }: any) => {
      return (
        <Link href={href} key={href}>
          <Button color="inherit">{label}</Button>
        </Link>
      )
    })
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <LinkText href="" color="inherit">
                Centralize
              </LinkText>
            </Link>
          </Typography>
          <Switch checked={darkState} onChange={handleThemeChange} />
          {links}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  lists: {
    width: 250,
  },
}))
