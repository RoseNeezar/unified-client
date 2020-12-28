import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { FormEvent, useState } from 'react'
import { useAuth } from '../../lib/useAuth'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, signUp } = useAuth()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signUp!(email, password)
  }
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={onSubmit}>
          {error && <p>{error}</p>}
          <Typography variant="h4">Sign Up here</Typography>
          <Box pb={2.5} />
          <TextField
            value={email}
            className="form-control"
            label="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box pb={2.5} />
          <TextField
            type="password"
            value={password}
            className="form-control"
            label="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box pb={2.5} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default SignUp
