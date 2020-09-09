import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoard, validate, solve , setRecord} from '../store/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styleSheet from '../assets/styleSheet';

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

export default ({ navigation, route }) => {
  const { username, level } = route.params;
  const boardDefault = useSelector((state) => state.boardDefault);
  const solvedBoard = useSelector((state) => state.solvedBoard);
  const [editableBoard, setEditableBoard] = useState([]);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  useEffect(() => {
    dispatch(fetchBoard(level));
    setIsActive(!isActive);
  }, []);

  useEffect(() => {
    setEditableBoard(boardDefault);
  }, [boardDefault]);

  useEffect(() => {
    setEditableBoard(solvedBoard);
  }, [solvedBoard]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  function editBoard(rowIdx, colIdx, text) {
    const newBoard = JSON.parse(JSON.stringify(editableBoard));
    newBoard[rowIdx][colIdx] = Number(text);
    setEditableBoard(newBoard);
  }

  function validateHandler() {
    dispatch(validate(editableBoard));
    if (message == 'solved') {
      Alert.alert('Congratulations!', `Your time is ${mins}:${secs}`);
      const time = { mins, secs };
      const payload = { username, time, level}
      dispatch(setRecord(payload));
      navigation.navigate('Records', {
        username,
      });
    } else {
      Alert.alert('Sorry :(', 'Try Again!');
    }
  }

  function solveBoardHandler() {
    dispatch(solve(boardDefault));
  }

  function resetBoardHandler() {
    setEditableBoard(boardDefault);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'stretch',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Text>{username}</Text>
        <Text style={{ fontSize: 30 }}>{`${mins}:${secs}`}</Text>
        <Text style={{ textTransform: 'capitalize' }}>{level}</Text>
      </View>
      {/* {console.log(board)} */}
      {editableBoard.map((row, rowIdx) => {
        return (
          <View key={rowIdx} style={styles.row}>
            {row.map((column, colIdx) => {
              return (
                <TextInput
                  key={colIdx}
                  editable={boardDefault[rowIdx][colIdx] ? false : true}
                  maxLength={1}
                  keyboardType="number-pad"
                  // value={boardDefault[rowIdx][colIdx] ? String(column) : ''}
                  onChangeText={(text) => editBoard(rowIdx, colIdx, text)}
                  style={styles.col}
                >
                  {editableBoard[rowIdx][colIdx] ? String(column) : ''}
                </TextInput>
              );
            })}
          </View>
        );
      })}
      <View
        style={{
          alignSelf: 'stretch',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={solveBoardHandler}
          style={styleSheet.buttonPrimary}
        >
          <Text style={styleSheet.buttonPrimaryText}>Solve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resetBoardHandler}
          style={styleSheet.buttonPrimary}
        >
          <Text style={styleSheet.buttonPrimaryText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={validateHandler}
          style={styleSheet.buttonPrimary}
        >
          <Text style={styleSheet.buttonPrimaryText}>Validate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const dimension = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimension / 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    width: dimension / 10,
    height: dimension / 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: 'black',
    textAlign: 'center',
  },
});
