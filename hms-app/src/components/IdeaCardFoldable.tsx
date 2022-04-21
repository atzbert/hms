import React, { useEffect, useState } from 'react'
import {
  Card,
  Text,
  Button,
  useMantineTheme,
  Group,
  Badge,
  createStyles,
  Accordion,
  Avatar,
  AvatarsGroup,
  useAccordionState,
} from '@mantine/core'
import { Idea, IdeaPreview } from '../common/types'
import { getIdeaDetails } from '../actions/GetBackendData'

type IProps = {
  ideas: Idea
  index: number
  type: string
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

export default function IdeaCardFoldable(props: IProps) {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const [accordionState, setAccordionState] = useAccordionState({
    total: 1,
    initialItem: -1,
  })
  const { ideas, type } = props
  /*const [ideaData, setIdeaData] = useState({
    errorIdeaData: false,
    isLoadingIdeaData: true,
    id: 'string',
    owner: undefined,
    hackathon: undefined,
    participants: [],
    title: 'string',
    description: 'string',
    problem: 'string',
    goal: 'string',
    requiredSkills: [],
    category: undefined,
    creationDate: 'string',
  } as Idea)*/

  /*const loadIdeaDetails = () => {
    getIdeaDetails(ideaPreview.id).then(
      (data) => {
        setIdeaData({
          id: data.id,
          owner: data.owner,
          hackathon: data.hackathon,
          participants: data.participants,
          title: data.title,
          description: data.description,
          problem: data.problem,
          goal: data.goal,
          requiredSkills: data.requiredSkills,
          category: data.category,
          creationDate: data.creationDate,
          errorIdeaData: false,
          isLoadingIdeaData: false,
        })
      },
      () => {
        setIdeaData({
          ...ideaData,
        })
      }
    )
  }*/

  const MAX_TITLE_LENGTH = 45
  const MAX_DESCRIPTION_LENGTH = type === 'voting' ? 200 : 245

  const participantData = ideas.participants?.map((participant, index) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Avatar
        color="indigo"
        radius="xl"
        size="md"
        src={
          'https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4'
        }
      />
      {participant.user.firstName} {participant.user.lastName}
    </div>
  ))

  /*useEffect(() => {
    loadIdeaDetails()
  }, [])*/

  return (
    <>
      {!ideas.isLoadingIdeaData && (
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section
            className={classes.section}
            mt="md"
            style={{ height: 180 }}
          >
            <Group noWrap>
              <Group
                direction={'column'}
                align={'center'}
                position={'center'}
                spacing={'xs'}
              >
                <Avatar
                  color="indigo"
                  radius="xl"
                  size="md"
                  src={
                    'https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4'
                  }
                />
                <Badge size="sm">
                  {ideas.owner?.user.firstName} {ideas.owner?.user.lastName}
                </Badge>
              </Group>

              <Text size="lg" weight={500}>
                {ideas.title.slice(0, MAX_TITLE_LENGTH)}
                {ideas.title.length > MAX_TITLE_LENGTH ? '...' : ''}
              </Text>
            </Group>

            <Text size="sm" mt="xs">
              {ideas.description.slice(0, MAX_DESCRIPTION_LENGTH)}
              {ideas.description.length > MAX_DESCRIPTION_LENGTH ? '...' : ''}
            </Text>
          </Card.Section>

          {type !== 'voting' && (
            <>
              <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} color="dimmed">
                  Skills required
                </Text>
                <Group spacing={7} mt={5}>
                  {ideas.requiredSkills!.map((skill) => (
                    <Badge
                      color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
                      key={skill.id}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </Group>
              </Card.Section>

              <Accordion
                state={accordionState}
                onChange={setAccordionState.setState}
              >
                <Accordion.Item
                  mt="sm"
                  style={{ border: 'none' }}
                  label={!accordionState['0'] ? 'Show details' : 'Hide details'}
                >
                  <Card.Section className={classes.section}>
                    <Text mt="md" className={classes.label} color="dimmed">
                      Problem
                    </Text>
                    <Text size="sm" mt="xs">
                      {ideas.problem}
                    </Text>
                  </Card.Section>

                  <Card.Section className={classes.section}>
                    <Text mt="md" className={classes.label} color="dimmed">
                      Goal
                    </Text>
                    <Text size="sm" mt="xs">
                      {ideas.goal}
                    </Text>
                  </Card.Section>

                  <Accordion iconPosition="right">
                    <Accordion.Item
                      label={
                        <div>
                          <Text className={classes.label} color="dimmed">
                            Current participants
                          </Text>
                          <Group spacing={7} mt={5}>
                            <AvatarsGroup limit={5}>
                              {ideas.participants?.map((participant, index) => (
                                <Avatar
                                  color="indigo"
                                  radius="xl"
                                  size="md"
                                  src={
                                    'https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4'
                                  }
                                />
                              ))}
                            </AvatarsGroup>
                          </Group>
                        </div>
                      }
                    >
                      {participantData}
                    </Accordion.Item>
                  </Accordion>

                  <Group mt="xs" position={'right'} style={{ paddingTop: 5 }}>
                    <Button variant={'outline'} color={'yellow'}>
                      Add to Favorites
                    </Button>
                    <Button>Participate</Button>
                  </Group>
                </Accordion.Item>
              </Accordion>
            </>
          )}
        </Card>
      )}
    </>
  )
}
