import React from 'react'
import { Idea, IdeaPreview } from '../common/types'
import { Grid } from '@mantine/core'
import IdeaCardFoldable from './IdeaCardFoldable'

type IProps = {
  ideas: Idea[]
  columnSize: number
  type: string
}

export default function IdeaCardList(props: IProps) {
  const { ideas, columnSize, type } = props

  const IdeasList = ideas.map((idea, index) => {
    return (
      <Grid.Col sm={columnSize} lg={columnSize}>
        <div style={{ border: '1px solid red', padding: 10 }}>
          <IdeaCardFoldable
            ideas={idea}
            index={index}
            key={idea.id}
            type={type}
          />
        </div>
      </Grid.Col>
    )
  })

  return (
    <>
      <Grid gutter={'lg'}>
        <Grid gutter={'lg'}>{IdeasList}</Grid>
      </Grid>
    </>
  )
}
