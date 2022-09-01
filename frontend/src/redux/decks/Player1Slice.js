import {createSlice} from '@reduxjs/toolkit'

export const Player1Slice = createSlice({
  name: 'Player1-Deck',
  initialState: {
    deck: [],
    count: 0,
    drawnCard: '',
  },
  reducers: {
    drawP1: (state, action) => {
      const idx = Math.floor(Math.random() * state.count)
      state.drawnCard = state.deck[idx]
      state.count = state.deck.length - 1
    },
    addP1: (state, action) => {
      state.deck.push(action.payload)
      state.count = state.deck.length
    },
    removeP1: (state, action) => {
      const idx = state.deck.findIndex(card => card === action.payload)
      state.deck.splice(idx, 1)
    },
    winP1: (state, action) => {
      state.deck.push(action.payload)
      state.count = state.deck.length
    },
    resetP1: (state, action) => {
      state.deck = []
      state.count = 0
      state.drawnCard = ''
    }
  }
})

export const { drawP1, addP1, removeP1, winP1, resetP1 } = Player1Slice.actions;
export default Player1Slice.reducer;