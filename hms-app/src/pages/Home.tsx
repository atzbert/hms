import React, { useEffect, useState } from 'react'
import { HackathonPreview } from '../common/types'
import { useSelector, useDispatch } from 'react-redux'

function Home() {
  const today = new Date()
  const count = useSelector()
  const dispatch = useDispatch()
  const [nextHackathon, setNextHackathon] = useState<HackathonPreview>({
    endDate: new Date(),
    id: '',
    startDate: new Date(),
    title: '',
  })

  useEffect(() => {
    if (localStorage.getItem('nextHackathon')) {
      setNextHackathon(JSON.parse(localStorage.getItem('nextHackathon')!))
    }
  }, [])

  useEffect(() => {
    console.log('huhu')
  }, [nextHackathon])

  function timeTillNextHackathon() {
    return !!nextHackathon.id
      ? new Date(nextHackathon.startDate).getTime() - today.getTime()
      : 0
  }

  return (
    <>
      <h1>this is the Startpage</h1>
      <h2>Welcome! here we will give you a short tutorial for this site</h2>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </p>

      {!!localStorage.getItem('nextHackathon') && (
        <div>
          <h2>
            Time till next Hackathon{' '}
            {
              (timeTillNextHackathon() / (1000 * 3600 * 24))
                .toString()
                .split('.')[0]
            }{' '}
            days and{' '}
            {Math.round(timeTillNextHackathon() / (1000 * 60 * 60)) % 24} hours
          </h2>
          <div>Next Hackathon: {nextHackathon.title}</div>
          <div>
            Start Date: {new Date(nextHackathon.startDate).toLocaleDateString()}
          </div>
          <div>
            End Date: {new Date(nextHackathon.endDate).toLocaleDateString()}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
