import {
  Textarea,
  Group,
  Button,
  CheckboxGroup,
  Checkbox,
  createStyles,
  Card,
  Text,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {
  CategoryPreview,
  HackathonPreview,
  SkillPreview,
} from '../../common/types'
import { getListOfSkills } from '../../actions/SkillActions'
import { getListOfCategories } from '../../actions/CategoryActions'
import { showNotification, updateNotification } from '@mantine/notifications'
import { CheckIcon } from '@modulz/radix-icons'
import { createIdea, editIdea, getIdeaDetails } from '../../actions/IdeaActions'

type IProps = {
  hackathon: HackathonPreview
  participantID: string
  context: string
  ideaID: string | null
  setOpened?: (boolean: boolean) => void
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
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
  },
}))

function IdeaForm(props: IProps) {
  const { hackathon, participantID, context, ideaID, setOpened } = props
  const { classes } = useStyles()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)
  const [availableSkills, setAvailableSkills] = useState({
    skills: [] as SkillPreview[],
  })
  const [skills, setSkills] = useState<string[]>([])
  const [availableCategories, setAvailableCategories] = useState({
    categories: [] as CategoryPreview[],
  })
  const [categories, setCategories] = useState<string[]>([])
  const [ideaText, setIdeaText] = useState({
    ownerId: participantID.toString(),
    hackathonId: hackathon.id,
    title: '',
    description: '',
    problem: '',
    goal: '',
    creationDate: new Date(),
  })

  const loadSelectedIdea = () => {
    getIdeaDetails(ideaID!).then(
      (data) => {
        setIsError(false)
        setIsLoading(false)
        setIdeaText({
          ...ideaText,
          title: data.title,
          description: data.description,
          problem: data.problem,
          goal: data.goal,
        })
      },
      () => {
        setIsError(true)
        setIsLoading(false)
      }
    )
  }

  const loadAvailableSkills = () => {
    getListOfSkills().then((data) => {
      setAvailableSkills({
        ...availableSkills,
        skills: data.skills,
      })
    })
  }

  const loadAvailableCategories = () => {
    getListOfCategories(hackathon.id).then((data) => {
      setAvailableCategories({
        ...availableCategories,
        categories: data.categories,
      })
    })
  }

  const skillsList = availableSkills.skills.map((skill, index) => [
    <Checkbox value={skill.id} label={skill.name} />,
  ])

  const categoriesList = availableCategories?.categories?.map(
    (category, index) => [
      <Checkbox value={category.id} label={category.title} />,
    ]
  )

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setIdeaText((prevIdeaText) => ({
      ...prevIdeaText,
      hackathonId: hackathon.id,
      [event.target.name]: event.target.value,
    }))
  }

  function createThisIdea(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setButtonIsDisabled(true)
    showNotification({
      id: 'idea-load',
      loading: true,
      title: 'Create idea',
      message: 'this can take a second',
      autoClose: false,
      disallowClose: true,
    })
    createIdea(ideaText, skills, categories).then((r) =>
      setTimeout(() => {
        console.log('r', r)
        setButtonIsDisabled(false)
        setCategories([])
        setSkills([])
        setIdeaText((prevState) => ({
          ...prevState,
          title: '',
          description: '',
          problem: '',
          goal: '',
        }))
        updateNotification({
          id: 'idea-load',
          color: 'teal',
          title: 'Idea was created',
          message: 'Notification will close in 2 seconds',
          icon: <CheckIcon />,
          autoClose: 2000,
        })
      }, 3000)
    )
  }

  function editThisIdea(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setButtonIsDisabled(true)
    showNotification({
      id: 'idea-load',
      loading: true,
      title: 'Edit idea',
      message: 'this can take a second',
      autoClose: false,
      disallowClose: true,
    })
    editIdea(ideaID!, ideaText, skills, categories).then((r) =>
      setTimeout(() => {
        setButtonIsDisabled(false)
        if (setOpened) {
          setOpened(false)
        }
        console.log(r)
        updateNotification({
          id: 'idea-load',
          color: 'teal',
          title: 'Idea was Edited',
          message: 'Notification will close in 2 seconds',
          icon: <CheckIcon />,
          autoClose: 2000,
        })
      }, 3000)
    )
  }

  useEffect(() => {
    loadAvailableSkills()
    loadAvailableCategories()
    loadSelectedIdea()
    setIsLoading(true)
    setCategories([])
    setSkills([])
  }, [])

  useEffect(() => {
    setIdeaText((prevIdeaText) => ({
      ...prevIdeaText,
      ownerId: participantID.toString(),
    }))
  }, [participantID])

  useEffect(() => {
    loadAvailableCategories()
  }, [hackathon])

  return (
    <>
      {isLoading && (
        <div>
          <h3>Idea details are loading...</h3>
        </div>
      )}
      {!isLoading && (
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section className={classes.section}>
            <Text mt="sm">hackathon: {hackathon.title}</Text>
          </Card.Section>
          <Card.Section className={classes.section}>
            <Textarea
              label="Title"
              mt="sm"
              required
              placeholder="Title"
              maxRows={1}
              autosize
              onChange={handleChange}
              name="title"
              value={ideaText.title}
            />
          </Card.Section>
          <Card.Section className={classes.section}>
            <Textarea
              mt="sm"
              label="Description"
              required
              placeholder="Description"
              minRows={2}
              maxRows={3}
              autosize
              onChange={handleChange}
              name="description"
              value={ideaText.description}
            />
          </Card.Section>
          <Card.Section className={classes.section}>
            <Textarea
              label="Problem"
              mt="sm"
              placeholder="which problelm does it solve (optional)"
              minRows={2}
              maxRows={3}
              autosize
              onChange={handleChange}
              name="problem"
              value={ideaText.problem}
            />
          </Card.Section>
          <Card.Section className={classes.section}>
            <Textarea
              label="Goal"
              mt="sm"
              placeholder="the goal for the hackweek is... (optional)"
              minRows={2}
              maxRows={3}
              autosize
              onChange={handleChange}
              name="goal"
              value={ideaText.goal}
            />
          </Card.Section>
          <Card.Section className={classes.section}>
            <CheckboxGroup
              mt="sm"
              color="gray"
              label="Required skills"
              description="chose one or more required skills"
              spacing="md"
              onChange={setSkills}
              required
              value={skills}
            >
              {skillsList}
            </CheckboxGroup>
          </Card.Section>
          <Card.Section className={classes.section}>
            <CheckboxGroup
              mt="sm"
              color="gray"
              label="Category"
              description="chose one or more categories"
              spacing="md"
              onChange={setCategories}
              required
              value={categories}
            >
              {categoriesList}
            </CheckboxGroup>
          </Card.Section>

          <Group position="right" mt="xl">
            {context === 'edit' && (
              <Button disabled={buttonIsDisabled} onClick={editThisIdea}>
                Edit
              </Button>
            )}
            {context === 'new' && (
              <Button disabled={buttonIsDisabled} onClick={createThisIdea}>
                Create
              </Button>
            )}
          </Group>
        </Card>
      )}
    </>
  )
}

export default IdeaForm
