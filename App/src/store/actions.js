import axios from 'axios';

const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    ''
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

export function fetchBoard(level) {
  return async (dispatch, getState) => {
    try {
      console.log(level);
      const { data } = await axios({
        url: `https://sugoku.herokuapp.com/board?difficulty=${level}`,
      });
      dispatch({
        type: 'FETCH_BOARD',
        payload: data.board,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function validate(board) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`https://sugoku.herokuapp.com/validate`, {
        method: 'POST',
        body: encodeParams({ board: board }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const { status } = await response.json();
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          status,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function solve(board) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`https://sugoku.herokuapp.com/solve`, {
        method: 'POST',
        body: encodeParams({ board: board }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const { solution, status } = await response.json();
      // console.log(solution);
      dispatch({
        type: 'SET_SOLVED_BOARD',
        payload: {
          solution,
          status,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setRecord(payload) {
  return async (dispatch, getState) => {
    try {
      // console.log(payload);
      dispatch({
        type: 'SET_RECORD',
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
