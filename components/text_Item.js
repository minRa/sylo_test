import React, {useContext} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {useSelector, useDispatch } from 'react-redux';
import {removeText} from '../reducers/actions';
import { TextContext } from'../context/text_Context';

const TextItem = props => {
  const textList = useSelector(state => state.texts.textData);
  const dispatch = useDispatch();
  const {editText_context} = useContext(TextContext);

  const handleDelete = () => {
    try {
      dispatch(removeText(props.id))
    } catch (err) {
       console.log(err.toString())
    }
  }
 
   
  const handleEdit = () => {
    var TextData = textList.find(text => text.id == props.id);
    editText_context(props.id, TextData.text)
  }

  return (
    <View style={styles.listItem}>
      <View style={styles.textItem}>
         <Text >{props.index}. {props.text}</Text>
          <Text>{props.date}</Text>
      </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Edit" color="green" onPress={handleEdit} />
          </View>
          <View style={styles.button}>
            <Button title="Remove" color="red" onPress={handleDelete}/>
          </View>
        </View>   
      </View>
  );
};

const styles = StyleSheet.create({
  textItem: {
    borderColor: 'black', 
    borderWidth: 1,
    backgroundColor:'#cccccc',
    padding: 10
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default TextItem;
