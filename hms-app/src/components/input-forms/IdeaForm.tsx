import {
  Textarea,
  Group,
  Button,
  Checkbox,
  Card,
  Text,
  Radio,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {
  CategoryPreview,
  HackathonPreview,
  Idea,
  IdeaFormType,
  SkillPreview,
} from '../../common/types'
import { getListOfSkills } from '../../actions/SkillActions'
import { getListOfCategories } from '../../actions/CategoryActions'
import { showNotification, updateNotification } from '@mantine/notifications'
import { Check, X } from 'tabler-icons-react'
import { createIdea, editIdea } from '../../actions/IdeaActions'
import { styles } from '../../common/styles'
import { useMsal } from '@azure/msal-react'
import { dark2, JOIN_BUTTON_COLOR } from '../../common/colors'
import { createIdeaParticipant } from '../../actions/ParticipantActions'

type IProps = {
  hackathon: HackathonPreview
  ownerId?: string
  context: string
  ideaId: string | null
  setOpened?: (boolean: boolean) => void
  idea?: Idea
  reload?: () => void
}

function IdeaForm(props: IProps) {
  const { instance } = useMsal()
  const { hackathon, ownerId, context, ideaId, setOpened, idea, reload } = props
  const { classes } = styles()
  const [isLoading, setIsLoading] = useState(true)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)
  const [availableSkills, setAvailableSkills] = useState({
    skills: [] as SkillPreview[],
  })
  const [skills, setSkills] = useState<string[]>(
    idea?.requiredSkills?.map((skill) => skill.id) || []
  )
  const [availableCategories, setAvailableCategories] = useState({
    categories: [] as CategoryPreview[],
  })
  const [category, setCategory] = useState<string>(idea?.category?.id || '')
  const [ideaText, setIdeaText] = useState({
    ownerId: ownerId || '',
    hackathonId: hackathon.id,
    title: '',
    description: '',
    problem: '',
    goal: '',
    creationDate: new Date(),
  })
  const maxIdeaTitleLength = 100

  const setIdea = () => {
    if (idea) {
      setIdeaText({
        ...ideaText,
        title: idea.title,
        description: idea.description,
        problem: idea.problem,
        goal: idea.goal,
      })
    }
  }

  const loadAvailableSkills = () => {
    getListOfSkills(instance).then((data) => {
      let skills = [] as SkillPreview[]
      if (data && data.skills) {
        skills = data.skills
      }
      setAvailableSkills({
        ...availableSkills,
        skills,
      })
    })
  }

  const loadAvailableCategories = () => {
    getListOfCategories(instance, hackathon.id).then((data) => {
      setAvailableCategories({
        ...availableCategories,
        categories: data.categories,
      })
      setIsLoading(false)
    })
  }

  const skillsList = availableSkills.skills.map((skill) => [
    <Checkbox value={skill.id} label={skill.name} key={skill.id} />,
  ])

  const categoriesList = availableCategories?.categories?.map((category) => [
    <Radio value={category.id} label={category.title} key={category.id} />,
  ])

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setIdeaText((prevIdeaText) => ({
      ...prevIdeaText,
      hackathonId: hackathon.id,
      [event.target.name]: event.target.value,
    }))
  }

  async function createThisIdea(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setButtonIsDisabled(true)
    showNotification({
      id: 'idea-load',
      loading: true,
      title: `Creating "${ideaText.title}"`,
      message: undefined,
      autoClose: false,
      // disallowClose: true,
    })
    createIdea(instance, ideaText, skills, [category]).then(
      async (response) => {
        setButtonIsDisabled(false)
        setCategory('')
        setSkills([])
        if (reload) {
          reload()
        }
        setIdeaText((prevState) => ({
          ...prevState,
          title: '',
          description: '',
          problem: '',
          goal: '',
        }))
        if (JSON.stringify(response).toString().includes('error')) {
          updateNotification({
            id: 'idea-load',
            color: 'red',
            title: 'Failed to create idea',
            message: undefined,
            icon: <X />,
            autoClose: 2000,
          })
        } else {
          updateNotification({
            id: 'idea-load',
            color: 'teal',
            title: `Created "${ideaText.title}"`,
            message: undefined,
            icon: <Check />,
            autoClose: 2000,
          })
        }
      }
    )
  }

  function editThisIdea(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setButtonIsDisabled(true)
    showNotification({
      id: 'idea-load',
      loading: true,
      title: `Editing "${ideaText.title}"`,
      message: undefined,
      autoClose: false,
      // disallowClose: true,
    })
    editIdea(instance, ideaId!, ideaText, skills, [category]).then(
      (response) => {
        setButtonIsDisabled(false)
        if (setOpened) {
          setOpened(false)
        }
        if (reload) {
          reload()
        }
        if (JSON.stringify(response).toString().includes('error')) {
          updateNotification({
            id: 'idea-load',
            color: 'red',
            title: 'Failed to Edit idea',
            message: undefined,
            icon: <X />,
            autoClose: 2000,
          })
        } else {
          updateNotification({
            id: 'idea-load',
            color: 'teal',
            title: `Edited "${ideaText.title}"`,
            message: undefined,
            icon: <Check />,
            autoClose: 2000,
          })
        }
      }
    )
  }

  useEffect(() => {
    loadAvailableSkills()
    loadAvailableCategories()
    setIdea()
    setCategory('')
    setSkills([])
  }, [])

  useEffect(() => {
    setCategory(availableCategories.categories[0]?.id || '')
    setSkills([])
  }, [availableCategories])

  useEffect(() => {
    if (
      ideaText.description.length > 1 &&
      ideaText.title.length < maxIdeaTitleLength &&
      ideaText.title.length > 1
    ) {
      setButtonIsDisabled(false)
    } else {
      setButtonIsDisabled(true)
    }
  }, [ideaText, category, skills])

  useEffect(() => {
    if (ownerId) {
      setIdeaText((prevIdeaText) => ({
        ...prevIdeaText,
        ownerId: ownerId.toString(),
      }))
    }
  }, [ownerId])

  useEffect(() => {
    loadAvailableCategories()
  }, [hackathon])

  return (
    <>
      <Card withBorder className={classes.card}>
        {isLoading && <div>Loading relevant data...</div>}
        {!isLoading && (
          <div>
            <Card.Section className={classes.borderSection}>
              <Text className={classes.title}>Create New Idea</Text>
            </Card.Section>
            <Card.Section className={classes.borderSection}>
              <Textarea
                label='Title'
                required
                error={
                  ideaText.title.length > maxIdeaTitleLength
                    ? 'max ' + maxIdeaTitleLength + ' chars'
                    : false
                }
                placeholder='Title'
                maxRows={1}
                autosize
                onChange={handleChange}
                name='title'
                value={ideaText.title}
                className={classes.label}
              />
            </Card.Section>
            <Card.Section className={classes.borderSection}>
              <Textarea
                label='Description'
                required
                placeholder='Description'
                minRows={2}
                maxRows={3}
                autosize
                onChange={handleChange}
                name='description'
                value={ideaText.description}
                className={classes.label}
              />
            </Card.Section>
            <Card.Section className={classes.borderSection}>
              <Textarea
                label='Problem'
                placeholder='which problelm does it solve (optional)'
                minRows={2}
                maxRows={3}
                autosize
                onChange={handleChange}
                name='problem'
                value={ideaText.problem}
                className={classes.label}
              />
            </Card.Section>
            <Card.Section className={classes.borderSection}>
              <Textarea
                label='Goal'
                placeholder='the goal for the hackweek is... (optional)'
                minRows={2}
                maxRows={3}
                autosize
                onChange={handleChange}
                name='goal'
                value={ideaText.goal}
                className={classes.label}
              />
            </Card.Section>

            {context !== IdeaFormType.IdeaPortal_New && (
              <>
                <Card.Section className={classes.borderSection}>
                  <Checkbox.Group
                    label='Required skills'
                    description='chose one or more required skills'
                    onChange={setSkills}
                    required
                    defaultValue={idea?.requiredSkills?.map(
                      (skill) => skill.id
                    )}
                    value={skills}
                    className={classes.label}
                  >
                    {skillsList}
                  </Checkbox.Group>
                </Card.Section>
                <Card.Section className={classes.borderSection}>
                  <Radio.Group
                    label='Category'
                    description='chose one or more categories'
                    onChange={setCategory}
                    required
                    defaultValue={idea?.category?.id}
                    value={category}
                    className={classes.label}
                  >
                    {categoriesList}
                  </Radio.Group>
                </Card.Section>
              </>
            )}

            <Group position='right' mt='xl'>
              {context === 'edit' && (
                <Button
                  style={{
                    backgroundColor: !buttonIsDisabled
                      ? JOIN_BUTTON_COLOR
                      : dark2,
                  }}
                  disabled={buttonIsDisabled}
                  onClick={editThisIdea}
                >
                  Edit
                </Button>
              )}
              {(context === 'new' ||
                context === IdeaFormType.IdeaPortal_New) && (
                <Button
                  style={{
                    backgroundColor: !buttonIsDisabled
                      ? JOIN_BUTTON_COLOR
                      : dark2,
                  }}
                  disabled={buttonIsDisabled}
                  onClick={createThisIdea}
                >
                  Create
                </Button>
              )}
            </Group>
          </div>
        )}
      </Card>
    </>
  )
}

export default IdeaForm
