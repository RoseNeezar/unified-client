import React from 'react'
import Link from 'next/link'
import { Box, Button, Container, Typography } from '@material-ui/core'

const index = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          The HTML embed element embeds external content at the specified point
          in the document.
          <br />
          This app is a place to store your embed content streams in a more
          centralize way
        </Typography>
        <Link href="/streams">
          <Button variant="contained" color="primary">
            go to streams
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default index
