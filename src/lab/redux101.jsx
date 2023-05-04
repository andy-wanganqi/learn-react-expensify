import { createStore } from 'redux'

const store = createStore((state = {
  count: 0
}, action) => {
  console.log('CALL createStore')

  if (action.type === 'INCREMENT_N') {
    const n = typeof action.n === 'number' ? action.n : 1
    return {
      count: state.count + n
    }
  } else if (action.type === 'DECREMENT_N') {
    const n = typeof action.n === 'number' ? action.n : 1
    return {
      count: state.count - n
    }
  } else if (action.type === 'RESET') {
    return {
      count: 0
    }
  } else {
    return state
  }
})

const toUnsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

// Increment
store.dispatch({
  type: 'INCREMENT_N',
  n: 2
})
store.dispatch({
  type: 'INCREMENT_N'
})

// Decrement
store.dispatch({
  type: 'DECREMENT_N',
  n: 1
})

// Reset
store.dispatch({
  type: 'RESET'
})

toUnsubscribe();

store.dispatch({
  type: 'RESET'
})
