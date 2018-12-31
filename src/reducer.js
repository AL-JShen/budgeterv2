const initState = {
  user: {
    uid: '',
    displayName: ''
  },
  transactions: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ('GET_USER'):
      return({
        ...state,
        user: action.user
      })
    case ('SIGN_OUT'):
      return initState;
    case ('GET_TRANSACTIONS'):
      return({
        ...state,
        transactions: action.transactions
      })
    default:
       return state
  }
}

export default reducer;
