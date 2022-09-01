import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { drawP1, addP1, removeP1, winP1, resetP1 } from '../redux/decks/Player1Slice'
import { drawP2, addP2, removeP2, winP2, resetP2 } from '../redux/decks/Player2Slice'
import { RANK, createDeck } from '../components/gameLogic'
import SaveScore from '../components/SaveScore'
import Card from 'react-free-playing-cards/lib/TcB'
import '../index.css'

const GameScreen = () => {
  const [Round, setRound] = useState(false)
  const [Winner, setWinner] = useState(String)
  const [Champion, setChampion] = useState(String)
  let cardOne = []
  let cardTwo = []
  let player1Wins, tie

  const p1 = useSelector(state => state.player1)
  const p2 = useSelector(state => state.player2)
  const dispatch = useDispatch()

  const startGame = () => {
    setWinner(null)
    dispatch(resetP1())
    dispatch(resetP2())

    let freshDeck = createDeck()
    freshDeck.forEach((card, idx) => {
      if (idx % 2 === 0) {
        dispatch(addP1(card))
      }
      else {
        dispatch(addP2(card))
      }
    })
  }

  const flipCard = () => {
    if (cardOne && cardTwo) {
      if (player1Wins) {
        for (let i = 0; i < cardTwo.length; ++i) {
          dispatch(removeP2(cardTwo[i]))
          dispatch(winP1(cardTwo[i]))
        }
      }
      else {
        for (let i = 0; i < cardOne.length; ++i) {
          dispatch(removeP1(cardOne[i]))
          dispatch(winP2(cardOne[i]))
        }
      }
    }

    cardOne = []
    cardTwo = []
    player1Wins = null

    if (p1.count === 0) {
      setWinner("Player 2")
    }
    else if (p2.count === 0) {
      setWinner("Player 1")
    }

    setRound(false)
    drawCards()
    setRound(true)
  }

  const drawCards = () => {
    dispatch(drawP1())
    dispatch(drawP2())
  }

  const isWinner = (p1Card, p2Card) => {
    const p1Value = RANK.indexOf(p1Card[0])
    const p2Value = RANK.indexOf(p2Card[0])
    cardOne.push(p1Card)
    cardTwo.push(p2Card)

    if (!tie) {
      if (p1Value > p2Value) {
        return player1Win()
      }
      else if (p1Value < p2Value) {
        return player2Win()
      }
      else {
        tie = true
        return tieBreaker()
      }
    }
  }

  const player1Win = () => {
    player1Wins = true
    return (
      <h3>
        Player 1 wins the round!
      </h3>
    )
  }

  const player2Win = () => {
    player1Wins = false
    return (
      <h3>
        Player 2 wins the round!
      </h3>
    )
  }

  const showSnack = () => {
    let x = document.getElementById('snackbar')
    x.className = 'show'
    setTimeout(function() {x.className = x.className.replace('show', '')}, 3000)
  }

  const tieBreaker = () => {
    showSnack()
    if (p1.count <= 1) {
      setWinner("Player 2")
    }
    else if (p2.count <= 1) {
      setWinner("Player 1")
    }
    drawCards()
    tie = false
    drawCards()
  }

  const resetGame = () => {
    dispatch(resetP1())
    dispatch(resetP2())
    setChampion(null)
    setWinner(null)
    setRound(false)
    startGame()
  }

  const updateScores = () => {
    if(Winner === Champion){
      return(
        <>
        <h2>You Win!</h2>
        <SaveScore />
        </>
      )
    }
    else{
      return(<h2>You Lose!</h2>)
    }
  }

  useEffect(() => {
    return () => {
      startGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='center'>
      {Winner
        ?
        <>
          <h1>
            {Winner} wins!
          </h1>
          {updateScores()}
          <button onClick={() => resetGame()}>Play Again</button>
        </>
        :
        <>
          {
            (Round) ?
              <>
                <h2>Player 1 has {p1.count} cards remaining.</h2>
                <Card className='card' height='200px' back />
                <Card className='card' height='200px' card={p1.drawnCard} />
                <br />
                {isWinner(p1.drawnCard, p2.drawnCard)}
                <button onClick={() => flipCard()}>Draw </button>
                <button onClick={() => resetGame()}>New Game</button>
                <br />
                <h2>Player 2 has {p2.count} cards remaining.</h2>
                <Card className='card' height='200px' back />
                <Card className='card' height='200px' card={p2.drawnCard} />
              </>
              :
              (!Champion) ?
                <>
                  <h2>Select your Champion!</h2>
                  <p>Decide if you think Player 1 or Player 2 will win the match! If you guess correctly, then you win!</p>
                  <button onClick={() => setChampion('Player 1')}>Player 1</button>
                  <button onClick={() => setChampion('Player 2')}>Player 2</button>
                </>
                :
                <>
                  <h2>Player 1 has {p1.count} cards remaining.</h2>
                  <Card className='card' height='200px' back />
                  <Card className='card' height='200px' back />
                  <br />
                  <h3>Ready to start...</h3>
                  <button onClick={() => flipCard()}>Draw </button>
                  <br />
                  <h2>Player 2 has {p2.count} cards remaining.</h2>
                  <Card className='card' height='200px' back />
                  <Card className='card' height='200px' back />
                </>
          }
        </>
      }
      <div id='snackbar'>A War has occurred!</div>
    </div>
  )
}

export default GameScreen