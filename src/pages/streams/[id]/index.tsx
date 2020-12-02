import { Container } from '@material-ui/core'
import { NextPage, NextPageContext } from 'next'
import React from 'react'
import Content from '../../../components/Content'
import Hero from '../../../components/Hero'
import { Stream } from '../../../lib/graphql/createStream.graphql'
import { useStreamQuery } from '../../../lib/graphql/stream.graphql'

interface Context extends NextPageContext {
  id: string
}
interface IStreamDetails {
  id: string | string[] | undefined
}

const StreamDetail: NextPage<IStreamDetails> = ({ id }) => {
  const { data, loading } = useStreamQuery({
    variables: { streamId: id },
  })

  if (!loading && data && data.stream) {
    return (
      <Container maxWidth="lg">
        <Hero stream={data.stream as Stream} />
        <Content url={data.stream.url} />
      </Container>
    )
  }

  return null
}

export default StreamDetail

StreamDetail.getInitialProps = ({ query: { id } }: Context) => {
  return { id }
}
