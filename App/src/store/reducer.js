const initialState = {
  boardDefault: [],
  solvedBoard: [],
  message: '',
  records: [],
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_BOARD':
      return { ...state, boardDefault: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload.status };
    case 'SET_SOLVED_BOARD':
      return { ...state, solvedBoard: action.payload.solution, message: action.payload.status };
    case 'SET_RECORD':
      return { ...state, records: state.records.concat(action.payload)};
    default:
      return state;
  }
}
export default reducer;
