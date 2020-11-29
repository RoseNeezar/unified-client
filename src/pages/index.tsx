import React from 'react'
import Link from 'next/link'
import { Box, Button, Container, Typography } from '@material-ui/core'

const index = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hellow world
        </Typography>
        <Link href="/about">
          <Button variant="contained" color="primary">
            go to about
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default index
