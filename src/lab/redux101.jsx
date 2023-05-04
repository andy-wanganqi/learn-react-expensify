import { configureStore } from '@reduxjs/toolkit'

const increment = ({ n = 1 } = {}) => ({
  type: 'INCREMENT_N',
  n,
})

const decrement = ({ n = 1 } = {}) => ({
  type: 'DECREMENT_N',
  n,
})

const reset = () => ({
  type: 'RESET',
})

const reducer = (state = {
  count: 0
}, action) => {
  console.log('CALL createStore')

  if (action.type === 'INCREMENT_N') {
    return {
      count: state.count + action.n
    }
  } else if (action.type === 'DECREMENT_N') {
    return {
      count: state.count - action.n
    }
  } else if (action.type === 'RESET') {
    return {
      count: 0
    }
  } else {
    return state
  }
}

const store = configureStore({ reducer })

const toUnsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

// Increment
store.dispatch(increment({n: 2}))
store.dispatch(increment())

// Decrement
store.dispatch(decrement({n: 3}))

// Reset
store.dispatch(reset())

toUnsubscribe();

store.dispatch(reset())
