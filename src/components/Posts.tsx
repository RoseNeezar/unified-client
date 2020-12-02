import React, { FC } from 'react'
import Link from 'next/link'
import { Stream } from '../lib/graphql/streams.graphql'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'

interface Props {
  streams: Stream[]
}

const Posts: FC<Props> = ({ streams }) => {
  const styles = useStyles()

  return (
    <Grid container className={styles.container} spacing={4}>
      {streams.map((post) => (
        <Grid item key={post._id} xs={12} md={6}>
          <Link href={`/streams/${post._id}`}>
            <CardActionArea component="a" href="#">
              <Card className={styles.card}>
                <div className={styles.cardDetails}>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {post.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {post.title}
                    </Typography>
                  </CardContent>
                </div>
                <Hidden xsDown>
                  <CardMedia
                    className={styles.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </Hidden>
              </Card>
            </CardActionArea>
          </Link>
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
