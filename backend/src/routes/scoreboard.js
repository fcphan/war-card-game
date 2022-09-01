const e = require('express')
const express = require('express')
const router = express.Router()
const Players = require('./../models/scores')

//Get all scores
router.get('/', async (req, res) => {
  try {
    const players = await Players.find()
    res.json(players)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

//Create user
router.post('/add/:name', async (req, res) => {
  const player = new Players({
    name: req.body.name,
    wins: req.body.wins
  })

  try {
    const newPlayer = await player.save()
    res.status(201).json(newPlayer)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

//Update user
router.patch('/update/:name', getPlayer, async (req, res) => {
  if(req.body.name != null) {
    res.player.name = req.body.name
  }
  if(req.body.wins != null) {
    res.player.wins += req.body.wins
  }
  try {
    const updatedPlayer = await res.player.save()
    res.json(updatedPlayer)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


async function getPlayer(req, res, next) {
  let player
  try {
    player = await Players.findOne({name: req.body.name})
    if(player === null) {
      // Add player if they are not found in the db
      const player = new Players({
        name: req.body.name,
        wins: req.body.wins
      })
    
      try {
        const newPlayer = await player.save()
        return res.status(201).json(newPlayer)
      } catch (error) {
        return res.status(400).json({message: error.message})
      }
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

  res.player = player
  next()
}

module.exports = router