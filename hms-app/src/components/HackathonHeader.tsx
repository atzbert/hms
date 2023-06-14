import {
  Badge,
  Center,
  Container,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import React from 'react'
import { Hackathon } from '../common/types'
import { MAX_DATE } from '../common/constants'
import { RichTextEditor } from '@mantine/rte'

type IProps = {
  hackathonData: Hackathon
}

export default function HackathonHeader(props: IProps) {
  const theme = useMantineColorScheme()
  const { hackathonData } = props
  const isHackathonWithoutDate = () =>
    new Date(hackathonData.startDate) > MAX_DATE

  return (
    <Container my={30}>
      <div>
        <Center>
          <Title>{hackathonData.title}</Title>
        </Center>
        {hackathonData.description && (
          <Center>
            <RichTextEditor
              readOnly
              value={hackathonData.description || ''}
              id='hackathonDescriptionEditor'
              style={{ color: 'gray', backgroundColor: 'transparent', border: 'none', textAlign: 'center' }}
            />
          </Center>
        )}
        <Center mt={10}>
          <Badge
            size={'lg'}
            variant={'gradient'}
            gradient={
              theme.colorScheme === 'dark'
                ? { from: 'teal', to: 'blue', deg: 60 }
                : { from: '#ed6ea0', to: '#ec8c69', deg: 35 }
            }
            radius={'xs'}
          >
            {isHackathonWithoutDate()
              ? 'To be announced'
              : `${new Date(
                  hackathonData.startDate
                ).toLocaleDateString()} - ${new Date(
                  hackathonData.endDate
                ).toLocaleDateString()}`}
          </Badge>
        </Center>
      </div>
    </Container>
  )
}
