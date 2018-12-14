const initState = {
  user: {
    uid: '',
    displayName: ''
  }
}

const reducer = (state = initState, action) => {
  if (action.type == 'GET_USER') {
    return({
      ...state,
      user: action.user
    })
  }
  return(state)
}

export default reducer;
