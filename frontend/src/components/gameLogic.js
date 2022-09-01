export const RANK = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const SUIT = ['c', 'd', 'h', 's']

export const createDeck = () => {
  let deck = RANK.flatMap(rank => {
    return SUIT.map(suit => {
      return rank.concat(suit)
    })
  })

  const len = deck.length
  for (let i = len - 1; i > 0; i--) {
    const newIdx = Math.floor(Math.random() * (i + 1))
    const oldVal = deck[newIdx]
    deck[newIdx] = deck[i]
    deck[i] = oldVal
  }

  return deck
}