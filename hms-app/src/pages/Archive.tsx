import React, { useEffect, useState, useContext } from 'react'
import HackathonSelectDropdown from '../components/HackathonSelectDropdown'
import { Group, Text, Checkbox, Title } from '@mantine/core'
import {
  Hackathon,
  HackathonDropdownMode,
  Idea,
  IdeaCardType,
} from '../common/types'
import { ArrowUp } from 'tabler-icons-react'
import { NULL_DATE } from '../common/constants'
import { getHackathonDetails } from '../actions/HackathonActions'
import { useMsal } from '@azure/msal-react'
import HackathonHeader from '../components/HackathonHeader'
import IdeaCardList from '../components/lists/IdeaCardList'
import { getIdeaDetails } from '../actions/IdeaActions'
import { UserContext } from './Layout'

export default function Archive() {
  const { instance } = useMsal()
  const user = useContext(UserContext)
  const [hackathonData, setHackathonData] = useState({} as Hackathon)
  const [selectedHackathonId, setSelectedHackathonId] = useState('')
  const [isHackathonError, setIsHackathonError] = useState(false)
  const [isHackathonLoading, setIsHackathonLoading] = useState(true)
  const [isIdeaLoading, setIsIdeaLoading] = useState(true)
  const [ideaData, setIdeaData] = useState<Idea>()
  const [relevantIdeaList, setRelevantIdeaList] = useState([] as Idea[])
  const [userIdeaList, setUserIdeaList] = useState<Idea[]>([])
  const [showUserIdeas, setShowUserIdeas] = useState(false)

  const loadSelectedHackathon = () => {
    getHackathonDetails(instance, selectedHackathonId).then(
      (data) => {
        setHackathonData(data)
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
      getIdeaDetails(instance, ideaPreviews.id).then((data) => {
        setIdeaData(data)
        setIsIdeaLoading(false)
      })
    })
  }

  const userIdea = relevantIdeaList.filter((item) => {
    const userId = user?.id
    return item.owner?.id === userId
  })

  useEffect(() => {
    loadSelectedHackathon()
    setRelevantIdeaList([])
    setIsHackathonLoading(true)
  }, [selectedHackathonId])

  useEffect(() => {
    loadRelevantIdeaDetails()
    setUserIdeaList(userIdea)
  }, [hackathonData])

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

  function validHackathon() {
    return (
      hackathonData.startDate !== NULL_DATE &&
      hackathonData.startDate?.toString() !== 'Invalid Date' &&
      !isHackathonLoading &&
      !isHackathonError
    )
  }

  return (
    <>
      <Group position={'apart'} my={20}>
        <HackathonSelectDropdown
          setHackathonId={setSelectedHackathonId}
          context={HackathonDropdownMode.Archive}
        />
      </Group>

      {selectedHackathonId === '' && (
        <>
          <ArrowUp size={'70px'} />
          <Text size={'lg'}>Select a hackathon here</Text>
        </>
      )}

      {validHackathon() && (
        <div>
          <HackathonHeader hackathonData={hackathonData} />
          <Group position={'apart'} my={20}>
            {showUserIdeas ? (
              <Title order={2} mt={50} mb={30}>
                Your submission
              </Title>
            ) : (
              <Title order={2} mt={50} mb={30}>
                Ideas submitted
              </Title>
            )}
            <Checkbox
              label={'Show my ideas only'}
              checked={showUserIdeas}
              onChange={(event) =>
                setShowUserIdeas(event.currentTarget.checked)
              }
            />
          </Group>

          <IdeaCardList
            ideas={showUserIdeas ? userIdeaList : relevantIdeaList}
            columnSize={6}
            type={IdeaCardType.Archive}
            isLoading={isIdeaLoading}
            onSuccess={loadSelectedHackathon}
          />
        </div>
      )}
    </>
  )
}
