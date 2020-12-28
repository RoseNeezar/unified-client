import { Container, Box, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import Posts from '../../components/Posts'
import { Stream, useStreamsQuery } from '../../lib/graphql/streams.graphql'

const index = () => {
  const { data, loading, refetch } = useStreamsQuery({ errorPolicy: 'ignore' })
  useEffect(() => {
    refetch()
  }, [])
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4">Streams</Typography>
      </Box>
      {!loading && data && data.streams && (
        <Posts streams={data.streams as Stream[]} />
      )}
    </Container>
  )
}

export default index
