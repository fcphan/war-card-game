import {createSlice} from '@reduxjs/toolkit'

export const Player2Slice = createSlice({
  name: 'Player2-Deck',
  initialState: {
    deck: [],
    count: 0,
    drawnCard: '',
  },
  reducers: {
    drawP2: (state, action) => {
      const idx = Math.floor(Math.random() * state.count)
      state.drawnCard = state.deck[idx]
      state.count = state.deck.length - 1
    },
    addP2: (state, action) => {
      state.deck.push(action.payload)
      state.count = state.deck.length
    },
    removeP2: (state, action) => {
      const idx = state.deck.findIndex(card => card === action.payload)
      state.deck.splice(idx, 1)
    },
    winP2: (state, action) => {
      state.deck.push(action.payload)
      state.count = state.deck.length
    },
    resetP2: (state, action) => {
      state.deck = []
      state.count = 0
      state.drawnCard = ''
    }
  }
})

export const { drawP2, addP2, removeP2, winP2, resetP2 } = Player2Slice.actions;
export default Player2Slice.reducer;