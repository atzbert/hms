import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Avatar,
  Burger,
  Button,
  Container,
  Group,
  Header,
  Image,
  Menu,
  Text,
  useMantineColorScheme,
  Popover,
  Badge
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { SwitchToggle } from './ThemeSwitchToggle'
import { styles } from '../common/styles'
import {
  HEADER_ACTIVE_COLOR_DARK,
  HEADER_ACTIVE_COLOR_LIGHT,
  PRIMARY_COLOR_1,
  TEXT_COLOR_WHITE,
} from '../common/colors'
import { useMsal } from '@azure/msal-react'
import { Logout } from 'tabler-icons-react'
import { getProfile, getProfilePhoto } from '../common/actionAuth'
import { LOGO } from '../common/constants'
import { ActiveDirectoryUser, User, UserPreview } from '../common/types'
import { getUserDetails, getUserExists } from '../actions/UserActions'

interface HeaderSearchProps {
  links: {
    link: string
    label: string
  }[]
  hackathonLinks: {
    link: string
    label: string
  }[]
  adminLinks: {
    link: string
    label: string
  }[]
}

const AZURE_ACCOUNT_ID = process.env.REACT_APP_AZURE_ACCOUNT_ID || ''
const AZURE_REDIRECT_URL = process.env.REACT_APP_AZURE_REDIRECT_URL || ''

export default function HeaderMenu({
  links,
  hackathonLinks,
  adminLinks,
}: HeaderSearchProps) {
  const theme = useMantineColorScheme()
  const [profilePhoto, setProfilePhoto] = useState('')
  const [opened, handlers] = useDisclosure(false)
  const { classes } = styles()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const location = useLocation()
  const { instance, accounts } = useMsal()
  const user = accounts.length > 0 ? accounts[0] : null
  const [userId, setUserId] = useState('')
  const [userDetails, setUserDetails] = useState({
    id: 'string',
    lastName: 'string',
    firstName: 'string',
    emailAddress: 'string',
    roles: [],
    skills: [],
    imageUrl: 'string',
    creationDate: new Date(),
  } as User)

  const loadSelectedUser = () => {
    getUserDetails(instance, userId).then(
      (data) => {
        setUserDetails(data)
      },
    )
  }

  useEffect(() => {
    loadSelectedUser()
  }, [userId])

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const profilePhoto = await getProfilePhoto(instance)
      setProfilePhoto(URL.createObjectURL(profilePhoto))
    }
    fetchProfilePhoto()
  }, [instance])

  useEffect(() => {
    const getProfileDetails = async () => {
      const profile = await getProfile(instance)
      const userExists = await userExistsInDb(profile)
      setUserId(userExists.id)

    } 
    getProfileDetails()
  }, [])
  
  const userExistsInDb = async (user: ActiveDirectoryUser) => {
    try {
      const userExistsResponse = await getUserExists(instance, user)
      if (userExistsResponse) return userExistsResponse
    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {
    const logoutRequest = {
      account: instance.getAccountByHomeId(AZURE_ACCOUNT_ID),
      postLogoutRedirectUri: AZURE_REDIRECT_URL,
    }
    instance.logoutRedirect(logoutRequest)
  }

  function getInitials(name: string) {
    const names = name.split(' ')
    const initials = names.map((name) => name[0]).join('')
    return initials
  }

  const fullscreenMenu = (
    <Group spacing={5}>
      {links.map((link) => (
        <div key={link.link}>
          <Link
            key={link.label}
            to={link.link}
            className={classes.link}
            style={{
              backgroundColor:
                location.pathname.slice(1) === link.link
                  ? theme.colorScheme === 'light'
                    ? HEADER_ACTIVE_COLOR_LIGHT
                    : HEADER_ACTIVE_COLOR_DARK
                  : undefined,
            }}
          >
            {link.label}
          </Link>
        </div>
      ))}
      <Menu>
        <Menu.Target>
          <Text className={classes.link}>Hackathons</Text>
        </Menu.Target>

        <Menu.Dropdown
          style={{
            backgroundColor:
              theme.colorScheme === 'light' ? PRIMARY_COLOR_1 : PRIMARY_COLOR_1,
          }}
        >
          {hackathonLinks.map((link) => (
            <Menu.Item
              key={link.label}
              component={Link}
              to={link.link}
              className={classes.link}
              style={{
                backgroundColor:
                  location.pathname.slice(1) === link.link
                    ? theme.colorScheme === 'light'
                      ? HEADER_ACTIVE_COLOR_LIGHT
                      : HEADER_ACTIVE_COLOR_DARK
                    : undefined,
              }}
            >
              {link.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      {adminLinks.map((link) => (
        <div key={link.link}>
          <Link
            key={link.label}
            to={link.link}
            className={classes.link}
            style={{
              backgroundColor:
                location.pathname.slice(1) === link.link
                  ? theme.colorScheme === 'light'
                    ? HEADER_ACTIVE_COLOR_LIGHT
                    : HEADER_ACTIVE_COLOR_DARK
                  : undefined,
            }}
          >
            {link.label}
          </Link>
        </div>
      ))}
    </Group>
  )

  const smallScreenMenu = (
    <div className={classes.headerBurger}>
      <Menu opened={opened}>
        <Menu.Target>
          <Burger opened={opened} onClick={() => handlers.toggle()} size='sm' />
        </Menu.Target>
        <Menu.Dropdown>
          {links.map((link) => (
            <Menu.Item key={link.label} component={Link} to={link.link}>
              {link.label}
            </Menu.Item>
          ))}
          <Menu.Divider />
          {hackathonLinks.map((link) => (
            <Menu.Item key={link.label} component={Link} to={link.link}>
              {link.label}
            </Menu.Item>
          ))}
          <Menu.Divider />
          {adminLinks.map((link) => (
            <div key={link.link}>
              <Link key={link.label} to={link.link} className={classes.link}>
                {link.label}
              </Link>
            </div>
          ))}
          <SwitchToggle />
        </Menu.Dropdown>
      </Menu>
    </div>
  )

  function PopoverProfile() {
    return (
      <Popover width='200' position='bottom' withArrow shadow='md'>
        <Popover.Target>
          <Button>
          {userAvatar(profilePhoto)}
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size='sm'>
            Name: {user?.name}
          </Text>

          <Text size='sm'>
          Email: {user?.username}
          </Text>

          <Text size='sm'>Roles: {userDetails.roles?.map((role, index) => (
            <Badge
              color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
              key={index}
            >
              {role}
            </Badge>
          ))}
          </Text>

          <Text size='sm'>Skills: {userDetails.skills?.map((skill, index) => (
                <Badge
                  color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
                  key={index}
                >
                  {skill.name}
                </Badge>
              ))}
          </Text>
        </Popover.Dropdown>
      </Popover>
    )
  }

  function userAvatar(profilePhoto: string | null | undefined) {
   if(profilePhoto){
      return <Avatar src={profilePhoto} radius={'xl'} />
   }
   if(!profilePhoto){
      return <Avatar color='indigo' radius='xl'>
      {getInitials(user?.name ?? 'User User')}
    </Avatar>
   }
  }

  return (
    <Header
      height={56}
      style={{
        backgroundColor:
          theme.colorScheme === 'light' ? PRIMARY_COLOR_1 : PRIMARY_COLOR_1,
      }}
    >
      <Container size={1300}>
        <div className={classes.header}>
          <Group spacing={1}>
            <Image height={40} width={120} src={LOGO} />{' '}
            <h1 style={{ color: TEXT_COLOR_WHITE }}>Ideation Portal</h1>
          </Group>
          <Group spacing={5} className={classes.headerLinks}>
            <SwitchToggle />
            {fullscreenMenu}
            {PopoverProfile()}
            <Button onClick={logout} variant={'subtle'}>
              <Logout />
            </Button>
            <p></p>
          </Group>
          {smallScreenMenu}
        </div>
      </Container>
    </Header>
  )
}
