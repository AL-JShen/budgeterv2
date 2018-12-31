const initState = {
  user: {
    uid: '',
    displayName: ''
  }
}

// const reducer = (state = initState, action) => {
//   if (action.type === 'GET_USER') {
//     return({
//       ...state,
//       user: action.user
//     })
//   }
//   return(state)
// }

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ('GET_USER'):
      return({
        ...state,
        user: action.user
      })
    case ('SIGN_OUT'):
      console.log(action)
      return initState;
    default:
         return state
  }
}

export default reducer;
