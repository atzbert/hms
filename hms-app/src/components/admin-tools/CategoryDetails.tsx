import React, { useEffect, useState } from 'react'
import { Category } from '../../common/types'
import { Button, Card, createStyles, Group, Modal, Text } from '@mantine/core'
import {
  deleteCategory,
  editCategory,
  getCategoryDetails,
} from '../../actions/CategoryActions'
import CategoryForm from './CategoryForm'

type IProps = {
  categoryID: string
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
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

export default function CategoryDetails(props: IProps) {
  const { classes } = useStyles()
  const { categoryID } = props
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [editModalOpened, setEditModalOpened] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [categoryData, setCategoryData] = useState({
    id: 'string',
    title: 'string',
    description: 'string',
    hackathonId: 'string',
  } as Category)

  const loadSelectedCategory = () => {
    getCategoryDetails(categoryID).then(
      (data) => {
        setIsError(false)
        setIsLoading(false)
        setCategoryData({
          id: data.id,
          title: data.title,
          description: data.description,
          hackathonId: data.hackathonId,
        })
      },
      () => {
        setIsError(true)
        setIsLoading(false)
      }
    )
  }

  const deleteSelectedCategory = () => {
    deleteCategory(categoryData.id).then((data) => {
      setDeleteModalOpened(false)
    })
  }

  useEffect(() => {
    loadSelectedCategory()
    setIsLoading(true)
  }, [])

  const deleteModal = (
    <Modal
      centered
      opened={deleteModalOpened}
      onClose={() => setDeleteModalOpened(false)}
      withCloseButton={false}
    >
      Are you sure you want to delete this category?
      <h4>Title: {categoryData.title}</h4>
      {!isLoading && (
        <Button color={'red'} onClick={() => deleteSelectedCategory()}>
          Yes delete this category
        </Button>
      )}
      <p>
        (This window will automatically close as soon as the category is
        deleted)
      </p>
    </Modal>
  )

  const editModal = (
    <Modal
      centered
      opened={editModalOpened}
      onClose={() => setEditModalOpened(false)}
      withCloseButton={false}
    >
      Edit Category
      <CategoryForm contextID={categoryData.id} context={'edit'} />
      {isLoading && <div>Loading...</div>}
      <p>
        (This window will automatically close as soon as the category is
        deleted)
      </p>
    </Modal>
  )

  return (
    <>
      {isError && (
        <div>
          <h3>Error loading hackathons</h3>
          <p>something went wrong.</p>
        </div>
      )}
      {isLoading && (
        <div>
          <h3>Category details are loading...</h3>
        </div>
      )}

      {!isLoading && !isError && (
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section className={classes.section}>
            <Text size="md" mt="xs">
              {categoryData.title}
            </Text>
            <Text size={'xs'}>ID: {categoryData.id}</Text>
          </Card.Section>
          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} color="dimmed">
              Description:
            </Text>
            <Text size="md" mt="xs">
              {categoryData.description}
            </Text>
          </Card.Section>
          <Card.Section className={classes.section}>
            <Group position="left" mt="xl">
              {deleteModal}
              <Button color={'red'} onClick={() => setDeleteModalOpened(true)}>
                Delete
              </Button>
              {editModal}
              <Button onClick={() => setEditModalOpened(true)}>Edit</Button>
            </Group>
          </Card.Section>
        </Card>
      )}
    </>
  )
}
