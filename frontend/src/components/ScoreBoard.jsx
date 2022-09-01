import { React, useState, useEffect } from 'react'
import './ScoreBoard.css'

const ScoreBoard = () => {
  const [Scores, setScores] = useState([])

  useEffect(() => {
    const getScores = async () => {
      const response = await fetch('http://localhost:5000/scoreboard')
      const json = await response.json()
      
      json.sort((a, b) => b.wins - a.wins)
      setScores(json)
    }
  
    return () => {
      getScores()
    }
  }, [])
  

  return (
    <div className='scoreboard'>
      <h1>Scoreboard</h1>
      {Scores.map((score, idx) => {
        return(
            <div className='scores' key={idx}>{score.name} - {score.wins} wins</div>
        )
      })}
    </div>
  )
}

export default ScoreBoard