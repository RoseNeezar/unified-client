import { makeStyles } from '@material-ui/core'
import React, { FC } from 'react'

interface IContent {
  url: string
}

const Content: FC<IContent> = ({ url }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <iframe
        className={classes.iframe}
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

export default Content

const useStyles = makeStyles(() => ({
  container: {
    // overflow: 'hidden',
    /* 16:9 aspect ratio */
    paddingTop: '56.25%',
    position: 'relative',
  },
  iframe: {
    border: '0',
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
  },
}))
