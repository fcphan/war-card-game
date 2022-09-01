import { React, useState } from 'react'

const SaveScore = () => {
  const [Name, setName] = useState("");
  const [Saved, setSaved] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaved(true)

    const updateResponse = await fetch(`http://localhost:5000/scoreboard/update/${Name}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: Name, wins: 1 })
    })

    if (updateResponse.status === 404) {
      fetch(`http://localhost:5000/scoreboard/add/${Name}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: Name, wins: 1 })
      })
    }
  }

  return (
    <>
      {
        !Saved ?
          <form onSubmit={handleSubmit}>
            <label>Enter your name to save your score!:
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <input type="submit" />
          </form>
          :
          <h3>Your score has been saved!</h3>
      }
    </>
  )
}

export default SaveScore