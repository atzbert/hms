export type HackathonPreview = {
  id: string
  title: string
}

export type IdeaPreview = {
  id: string
  title: string
}

export type Hackathon = {
  errorHackathonData: boolean
  isLoadingHackathonData: boolean
  title: string
  startDate: string
  endDate: string
  participants?: ParticipantPreview[]
  categories?: CategoryPreview[]
  ideas?: IdeaPreview[]
}

export type Idea = {
  errorIdeaData: boolean
  isLoadingIdeaData: boolean
  id: string
  owner?: OwnerPreview
  hackathon?: HackathonPreview
  participants?: ParticipantPreview[]
  title: string
  description: string
  problem: string
  goal: string
  requiredSkills?: SkillPreview[]
  category?: CategoryPreview
  creationDate: string
}

export type CategoryPreview = {
  id: string
  title: string
}

export type SkillPreview = {
  id: string
  name: string
}

export type OwnerPreview = {
  id: string
  user: User
}

export type ParticipantPreview = {
  id: string
  user: User
}

export type User = {
  id: string
  lastName?: string
  firstName?: string
  imageUrl?: string
}
