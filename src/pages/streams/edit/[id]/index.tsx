import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage, NextPageContext } from 'next'
import { useEditStreamMutation } from '../../../../lib/graphql/editStream.graphql'
import { useDeleteStreamMutation } from '../../../../lib/graphql/deleteStream.graphql'
import { initializeApollo } from '../../../../lib/apollo'
import { StreamDocument } from '../../../../lib/graphql/stream.graphql'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { getUrl } from '../../../../utils/getUrl'

interface Context extends NextPageContext {
  id: string
}
interface IEditStream {
  id: string | string[] | undefined
}

const EditStream: NextPage<IEditStream> = ({ id }) => {
  const router = useRouter()
  const [editStream] = useEditStreamMutation()
  const [deleteStream] = useDeleteStreamMutation()
  const [state, setState] = useState({
    _id: '',
    title: '',
    description: '',
    url: '',
  })
  const { _id, description, title, url } = state

  const fetchStream = async () => {
    const apollo = initializeApollo()
    const { data } = await apollo.query({
      query: StreamDocument,
      variables: { streamId: id },
    })
    setState(data.stream)
  }
  useEffect(() => {
    fetchStream()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { data } = await editStream({
        variables: { input: { id: _id, title, description, url } },
      })
      if (data?.editStream._id) {
        router.push('/streams')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onDelete = async () => {
    try {
      const { data } = await deleteStream({
        variables: { id },
      })
      if (data?.deleteStream) {
        router.push('/streams')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Edit Stream</Typography>
        <form onSubmit={(e) => onSubmit(e)}>
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Title"
            value={title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            required
          />
          <Box pb={2.5} />
          <TextField
            label="Description"
            value={description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            required
          />
          <Box pb={2.5} />
          <TextField
            label="URL"
            value={url}
            onChange={(e) =>
              setState({ ...state, url: getUrl(e.target.value) })
            }
            required
          />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
        <Box pb={2.5} />
        <Button onClick={() => onDelete()} variant="contained">
          Delete
        </Button>
      </Box>
    </Container>
  )
}

export default EditStream

EditStream.getInitialProps = ({ query: { id } }: Context) => {
  return { id }
}
