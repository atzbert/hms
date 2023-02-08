import {
  HackathonPreview,
  Idea,
  IdeaCardType,
  IdeaFormType,
  IdeaPreview,
} from '../common/types'
import IdeaCardList from '../components/lists/IdeaCardList'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Group, Title, Checkbox } from '@mantine/core'
import { getIdeaDetails, getIdeaList } from '../actions/IdeaActions'
import { useMsal } from '@azure/msal-react'
import { UserContext } from './Layout'
import { getListOfHackathons } from '../actions/HackathonActions'
import IdeaForm from '../components/input-forms/IdeaForm'
import { MIN_DATE } from '../common/constants'

function IdeationPortal() {
  const { instance } = useMsal()
  const user = useContext(UserContext)
  const [allIdeaPreviews, setAllIdeaPreviews] = useState<IdeaPreview[]>([])
  const [ideaData, setIdeaData] = useState<Idea>()
  const [relevantIdeaList, setRelevantIdeaList] = useState<Idea[]>([])
  const [opened, setOpened] = useState(false)
  const [hackathon, setHackathon] = useState<HackathonPreview>(
    {} as HackathonPreview
  )
  const [showUserIdeas, setShowUserIdeas] = useState(false)

  const loadHackathons = () => {
    getListOfHackathons(instance).then((data) => {
      const upcomingHackathon = data.find(
        (hackathon) => hackathon.startDate < MIN_DATE
      )
      if (upcomingHackathon) {
        setHackathon(upcomingHackathon)
      }
    })
  }

  const loadHackathonIdeas = () => {
    if (hackathon.id !== undefined) {
      getIdeaList(instance, hackathon.id).then((data) => {
        setAllIdeaPreviews(data.ideas)
      })
    }
  }

  const loadIdeaDetails = () => {
    if (allIdeaPreviews?.length > 0) {
      allIdeaPreviews.map((ideaPreview) => {
        getIdeaDetails(instance, ideaPreview.id).then((ideaDetails) => {
          setIdeaData(ideaDetails)
        })
      })
    }
  }

  const filteredIdeas = relevantIdeaList.filter((item) => {
    const userId = user?.id || ''
    return item.owner?.id.includes(userId)
  })

  useEffect(() => {
    loadHackathons()
  }, [])

  useEffect(() => {
    loadHackathonIdeas()
  }, [hackathon])

  useEffect(() => {
    loadIdeaDetails()
  }, [allIdeaPreviews])

  useEffect(() => {
    if (ideaData)
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

  return (
    <>
      <Title order={1}>Ideation Portal</Title>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={'70%'}
        title='Create New Idea!'
      >
        <IdeaForm
          ideaId={'null'}
          hackathon={hackathon}
          ownerId={user?.id}
          context={IdeaFormType.New}
          reload={loadHackathonIdeas}
        />
      </Modal>

      <Group position='center'>
        <Button onClick={() => setOpened(true)}>New Idea</Button>

        <Checkbox
          label={'Show my ideas'}
          checked={showUserIdeas}
          onChange={(event) => setShowUserIdeas(event.currentTarget.checked)}
        />
      </Group>

      {relevantIdeaList.length != null && (
        <div>
          {showUserIdeas ? (
            <Title order={2} mt={50} mb={30}>
              your submitted ideas: {filteredIdeas.length}
            </Title>
          ) : (
            <Title order={2} mt={50} mb={30}>
              all submitted ideas: {relevantIdeaList.length}
            </Title>
          )}

          <IdeaCardList
            ideas={showUserIdeas ? filteredIdeas : relevantIdeaList}
            columnSize={6}
            type={IdeaCardType.IdeaPortal}
            isLoading={false}
          />
        </div>
      )}
    </>
  )
}

export default IdeationPortal
