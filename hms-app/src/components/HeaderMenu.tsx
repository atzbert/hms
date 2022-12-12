import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Image,
  Header,
  Menu,
  Group,
  Burger,
  Container,
  Avatar,
  Button,
  useMantineColorScheme,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { SwitchToggle } from './ThemeSwitchToggle'
import { styles } from '../common/styles'
import { PRIMARY_COLOR_1, TEXT_COLOR_WHITE } from '../common/colors'
import { useMsal } from '@azure/msal-react'
import { Logout } from 'tabler-icons-react'
import { getProfilePhoto } from '../common/actionAuth'
import { LOGO } from '../common/constants'

interface HeaderSearchProps {
  links: {
    link: string
    label: string
  }[]
  hackLinks: {
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
  hackLinks,
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

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const profilePhoto = await getProfilePhoto(instance)
      setProfilePhoto(URL.createObjectURL(profilePhoto))
    }
    fetchProfilePhoto()
  }, [instance])

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
    <Group spacing={1}>
      {links.map((link) => (
        <div key={link.link}>
          <Link key={link.label} to={link.link} className={classes.link}>
            {link.label}
          </Link>
        </div>
      ))}
      <Menu>
        <Menu.Target>
          <Text className={classes.link}>Hackathons</Text>
        </Menu.Target>

        <Menu.Dropdown>
          {hackLinks.map((link) => (
            <Menu.Item key={link.label} component={Link} to={link.link}>
              {link.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      {adminLinks.map((link) => (
        <div key={link.link}>
          <Link key={link.label} to={link.link} className={classes.link}>
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
          {hackLinks.map((link) => (
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
            {profilePhoto && <Avatar src={profilePhoto} radius={'xl'} />}
            {!profilePhoto && (
              <Avatar color='indigo' radius='xl'>
                {getInitials(user?.name ?? 'User User')}
              </Avatar>
            )}
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
