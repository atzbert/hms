import { MultiSelect } from '@mantine/core'
import { getListOfCategories } from '../actions/CategoryActions'
import { useMsal } from '@azure/msal-react'
import { CategoryPreview } from '../common/types'
import { useEffect, useState } from 'react'

type IProps = {
  hackathonId: string
  onSelectedCategory: (category: React.SetStateAction<string[]>) => void
}

export default function CategorySelector(props: IProps) {
  const { hackathonId } = props
  const { instance } = useMsal()
  const [selectedHackathonId, setSelectedHackathonId] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [availableCategories, setAvailableCategories] = useState({
    categories: [] as CategoryPreview[],
  })

  const loadAvailableCategories = () => {
    if (selectedHackathonId !== '') {
      getListOfCategories(instance, selectedHackathonId).then((data) => {
        setAvailableCategories({
          ...availableCategories,
          categories: data.categories,
        })
      })
    }
  }

  const handleCategorySelected = (event: {
    target: { value: React.SetStateAction<string[]> }
  }) => {
    setSelectedCategory(event.target.value)
    props.onSelectedCategory(event.target.value)
  }

  const categories = availableCategories.categories.map((category) => ({
    value: category.id,
    label: category.title,
  }))

  useEffect(() => {
    loadAvailableCategories()
  }, [selectedHackathonId])

  useEffect(() => {
    console.log(selectedCategory)
    handleCategorySelected({ target: { value: selectedCategory } })
  }, [selectedCategory])

  useEffect(() => {
    setSelectedHackathonId(hackathonId)
  }, [hackathonId])

  return (
    console.log('available categories: ', availableCategories),
    console.log('selected hackathon id: ', selectedHackathonId),
    (
      <MultiSelect
        clearable
        p={5}
        data={categories}
        label='Select categories'
        placeholder='Pick all that apply'
        maxDropdownHeight={150}
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
      />
    )
  )
}
