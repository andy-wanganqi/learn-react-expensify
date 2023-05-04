import { createStore } from 'redux'

const store = createStore((state = {
  count: 0
}, action) => {
  console.log('CALL createStore')

  if (action.type === 'INCREMENT_N') {
    return {
      count: state.count + 1
    }
  } else if (action.type === 'DECREMENT_N') {
    return {
      count: state.count - 1
    }
  } else if (action.type === 'RESET') {
    return {
      count: 0
    }
  } else {
    return state
  }
})

console.log(store.getState())

// Increment
store.dispatch({
  type: 'INCREMENT_N'
})

// Decrement
store.dispatch({
  type: 'DECREMENT_N'
})

// Reset
store.dispatch({
  type: 'RESET'
})

console.log(store.getState())
