import React, { FC } from 'react'
import Link from 'next/link'
import { Stream } from '../lib/graphql/streams.graphql'
import { Grid, makeStyles, Theme } from '@material-ui/core'

interface Props {
  streams: Stream[]
}

const Posts: FC<Props> = ({ streams }) => {
  const styles = useStyles()

  return (
    <Grid container className={styles.container} spacing={4}>
      {streams.map((post) => (
        <Grid item key={post._id} xs={12} md={6}>
          <Link href={`/streams/${post._id}`}></Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}))
