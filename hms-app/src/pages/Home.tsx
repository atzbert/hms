import React from 'react'
import IdeaCardBig from '../components/IdeaCardBig'
import ideaData from '../TestIdeaData'

function Home() {
  const ideas = ideaData.map((idea) => {
    return (
      <IdeaCardBig
        {...idea} //spreads the item in its components in 1 line of code
      />
    )
  })

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
      <h2>Idea card big:</h2>
      <div className="big-idea-list">{ideas}</div>
    </>
  )
}

export default Home
