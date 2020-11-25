import { Container, Box, Typography, Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

const about = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          about here
        </Typography>
        <Link href="/">
          <Button variant="contained" color="primary">
            go to home
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default about
