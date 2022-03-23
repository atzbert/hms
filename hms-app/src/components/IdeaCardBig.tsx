import React from 'react'
import favIcon from '../images/favIcon.png'

function IdeaCardBig(idea: any) {
  function addFavorite() {
    //TODO add a favorite flag that connect user and idea
    alert('added to favorites')
  }

  function addParticipant() {
    //TODO if number of max participants is not reached add user to participants, otherwise add user to waitlist
    alert('you are now a participant')
  }

  return (
    <div style={{ border: '2px solid #00FFD0' }}>
      <div style={{ display: 'flex', gap: '5px' }}>
        <h3>{idea.title}</h3>
        <h3>( {idea.favNumber} )</h3>
        <img
          src={favIcon}
          style={{ width: '20px', height: '20px', paddingTop: '20px' }}
        />
      </div>
      <div>
        <h4>Idea description:</h4>
        <p>{idea.description}</p>
      </div>
      <div>
        <h4>why did you chose it?</h4>
        <p>{idea.reason}</p>
      </div>
      <div>
        <h4>what problem does it solve?</h4>
        <p>{idea.problem}</p>
      </div>
      <div>
        <h4>goal for hackathon?</h4>
        <p>{idea.goal}</p>
      </div>
      <div>
        <h4>useful skills:</h4>
        <p>{idea.skills}</p>
      </div>
      <div>
        <h4>categorie:</h4>
        <p>{idea.categorie}</p>
      </div>
      <div>
        <h4>participants</h4>
        <p>{idea.participants}</p>
      </div>
      <div className="big-card-buttons">
        <button onClick={addFavorite}>add favorite</button>
        <button onClick={addParticipant}>participate</button>
      </div>
    </div>
  )
}

export default IdeaCardBig
