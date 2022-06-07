import React, { useEffect, useState } from 'react'
import {
  deleteHackathon,
  getHackathonDetails,
} from '../../actions/HackathonActions'
import IdeaCardList from '../lists/IdeaCardList'
import {
  Hackathon,
  HackathonDetailsType,
  Idea,
  IdeaCardType,
} from '../../common/types'
import { getIdeaDetails } from '../../actions/IdeaActions'
import {
  Accordion,
  Button,
  Card,
  Group,
  Modal,
  SimpleGrid,
  Text,
} from '@mantine/core'
import ParticipantDetails from './ParticipantDetails'
import IdeaDetails from './IdeaDetails'
import CategoryForm from '../input-forms/CategoryForm'
import HackathonForm from '../input-forms/HackathonForm'
import CategoryDetails from './CategoryDetails'
import { Link } from 'react-router-dom'
import { styles } from '../../common/styles'

type IProps = {
  hackathonId: string
  type: HackathonDetailsType
}

export default function HackathonDetails(props: IProps) {
  const { classes } = styles()
  const { hackathonId, type } = props
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [editModalOpened, setEditModalOpened] = useState(false)
  const [isHackathonError, setIsHackathonError] = useState(false)
  const [isHackathonLoading, setIsHackathonLoading] = useState(true)
  const [isIdeaError, setIsIdeaError] = useState(false)
  const [isIdeaLoading, setIsIdeaLoading] = useState(true)
  const [hackathonData, setHackathonData] = useState({
    id: 'string',
    title: 'string',
    startDate: new Date(),
    endDate: new Date(),
    participants: [],
    categories: [],
    ideas: [],
  } as Hackathon)
  const [ideaData, setIdeaData] = useState({
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
    creationDate: new Date(),
  } as Idea)
  const [relevantIdeaList, setRelevantIdeaList] = useState([] as Idea[])

  const loadSelectedHackathon = () => {
    getHackathonDetails(hackathonId).then(
      (data) => {
        setHackathonData({
          id: hackathonId,
          title: data.title,
          startDate: data.startDate,
          endDate: data.endDate,
          participants: data.participants,
          categories: data.categories,
          ideas: data.ideas,
        })
        setIsHackathonLoading(false)
        setIsHackathonError(false)
      },
      () => {
        setIsHackathonLoading(false)
        setIsHackathonError(true)
      }
    )
  }

  const loadRelevantIdeaDetails = () => {
    hackathonData.ideas?.map((ideaPreviews) => {
      getIdeaDetails(ideaPreviews.id).then(
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
          })
          setIsIdeaLoading(false)
          setIsIdeaError(false)
        },
        () => {
          setIdeaData({
            ...ideaData,
          })
        }
      )
    })
  }

  const deleteSelectedHackathon = () => {
    deleteHackathon(hackathonId).then((data) => {
      setDeleteModalOpened(false)
    })
  }

  useEffect(() => {
    loadSelectedHackathon()
    setRelevantIdeaList([])
    setIsHackathonLoading(true)
  }, [hackathonId])

  useEffect(() => {
    loadRelevantIdeaDetails()
  }, [hackathonData])

  useEffect(() => {
    if (
      !relevantIdeaList
        .map((relevant) => {
          return relevant.id
        })
        .includes(ideaData.id)
    ) {
      setRelevantIdeaList((relevantIdeaList) => {
        return [...relevantIdeaList, ideaData]
      })
    }
  }, [ideaData])

  const allParticipants = hackathonData.participants?.map(
    (participant, index) => (
      <Accordion.Item
        key={index}
        label={
          <div>
            {index + 1}. {participant.user.firstName}{' '}
            {participant.user.lastName}
          </div>
        }
      >
        <ParticipantDetails
          participantId={participant.id}
          user={participant.user}
        />
      </Accordion.Item>
    )
  )

  const allCategories = hackathonData.categories?.map((category, index) => (
    <Accordion.Item
      key={index}
      label={
        <div>
          {index + 1}. {category.title}
        </div>
      }
    >
      <CategoryDetails categoryId={category.id.toString()} />
    </Accordion.Item>
  ))

  const allIdeas = relevantIdeaList.map((idea, index) => (
    <Accordion.Item
      key={index}
      label={
        <div>
          {index + 1}. {idea.title}
        </div>
      }
    >
      <IdeaDetails
        idea={idea}
        type={IdeaCardType.Admin}
        isLoading={isIdeaLoading}
      />
    </Accordion.Item>
  ))

  function refreshList() {
    setIsHackathonLoading(true)
    loadSelectedHackathon()
  }

  const deleteModal = (
    <Modal
      centered
      opened={deleteModalOpened}
      onClose={() => setDeleteModalOpened(false)}
      withCloseButton={false}
    >
      <Text className={classes.text}>
        Are you sure you want to delete this hackathon?
      </Text>
      <Text className={classes.title}>Title: {hackathonData.title}</Text>
      <Text className={classes.title}>
        Start Date:
        {new Date(hackathonData.startDate).toDateString()}
      </Text>
      <Text className={classes.title}>
        End Date:
        {new Date(hackathonData.endDate).toDateString()}
      </Text>
      <Button color={'red'} onClick={() => deleteSelectedHackathon()}>
        Yes delete this hackathon
      </Button>
      <Text className={classes.text}>
        (This window will automatically closed as soon as the hackathon is
        deleted)
      </Text>
    </Modal>
  )

  const editModal = (
    <Modal
      centered
      opened={editModalOpened}
      onClose={() => setEditModalOpened(false)}
      withCloseButton={false}
    >
      <Text className={classes.title}>Edit Hackathon</Text>
      <HackathonForm context={'edit'} hackathonId={hackathonData.id} />
      {isHackathonLoading && <div>Loading...</div>}
      <Text className={classes.text}>
        (This window will automatically closed as soon as the hackathon is
        changed)
      </Text>
    </Modal>
  )

  return (
    <>
      {isHackathonError && (
        <div>
          <Text className={classes.title}>Error loading hackathons</Text>
          <Text className={classes.text}>something went wrong.</Text>
        </div>
      )}
      {isHackathonLoading && (
        <div>
          <Text className={classes.text}>Hackathon details are loading...</Text>
        </div>
      )}

      {hackathonData.startDate &&
        !isHackathonLoading &&
        !isHackathonError &&
        type === HackathonDetailsType.Header && (
          <div>
            <h2>Title: {hackathonData.title}</h2>
            <h2>
              Start Date: {new Date(hackathonData.startDate).toDateString()} End
              Date: {new Date(hackathonData.endDate).toDateString()}
            </h2>
            <h2>All Ideas ({hackathonData.ideas?.length})</h2>

            <IdeaCardList
              ideas={relevantIdeaList}
              columnSize={6}
              type={IdeaCardType.HackathonDetails}
              isLoading={isIdeaLoading}
            />
          </div>
        )}

      {hackathonData.startDate &&
        !isHackathonLoading &&
        !isHackathonError &&
        type === HackathonDetailsType.FullInfo && (
          <Card withBorder className={classes.card}>
            <Card.Section className={classes.borderSection}>
              <Text className={classes.title}>{hackathonData.title}</Text>
              <Text className={classes.text}>ID: {hackathonData.id}</Text>
            </Card.Section>

            <Card.Section className={classes.borderSection}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Card.Section>
                  <Text className={classes.title}>
                    Start Date:{' '}
                    {new Date(hackathonData.startDate).toDateString()}
                  </Text>
                </Card.Section>
                <Card.Section>
                  <Text className={classes.title}>
                    End Date: {new Date(hackathonData.endDate).toDateString()}
                  </Text>
                </Card.Section>
              </SimpleGrid>
            </Card.Section>

            <Accordion iconPosition="left" offsetIcon={false}>
              <Accordion.Item
                label={
                  <Text className={classes.label}>
                    Categories ( {allCategories?.length} )
                  </Text>
                }
              >
                <Accordion iconPosition="right">
                  <Accordion.Item
                    className={classes.borderAccordion}
                    label={'Add Category'}
                  >
                    <CategoryForm
                      hackathonId={hackathonData.id}
                      context={'new'}
                      categoryId={''}
                    />
                  </Accordion.Item>
                  {allCategories}
                </Accordion>
              </Accordion.Item>
            </Accordion>

            <Accordion iconPosition="left" offsetIcon={false}>
              <Accordion.Item
                label={
                  <Text className={classes.label}>
                    Participants ( {allParticipants?.length} )
                  </Text>
                }
              >
                <Accordion iconPosition="right">{allParticipants}</Accordion>
              </Accordion.Item>
            </Accordion>

            <Accordion iconPosition="left" offsetIcon={false}>
              <Accordion.Item
                label={
                  <Text className={classes.label}>
                    Ideas ( {allIdeas?.length} )
                  </Text>
                }
              >
                <Button
                  mb={20}
                  onClick={() =>
                    localStorage.setItem(
                      'ideas',
                      JSON.stringify(relevantIdeaList)
                    )
                  }
                  component={Link}
                  to="/presentations"
                >
                  Presentations
                </Button>
                <Accordion iconPosition="right">{allIdeas}</Accordion>
              </Accordion.Item>
            </Accordion>

            <Card.Section className={classes.borderSection}>
              <Group position="left" mt="xl">
                {deleteModal}
                <Button
                  color={'red'}
                  onClick={() => setDeleteModalOpened(true)}
                >
                  Delete
                </Button>
                {editModal}
                <Button onClick={() => setEditModalOpened(true)}>Edit</Button>
                {!isHackathonLoading && (
                  <Button color={'green'} onClick={() => refreshList()}>
                    Reload
                  </Button>
                )}
                {isHackathonLoading && <div>Loading...</div>}
              </Group>
            </Card.Section>
          </Card>
        )}
    </>
  )
}
