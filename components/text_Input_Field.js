import React, {useState, useContext, useEffect} from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Keyboard, 
  TouchableWithoutFeedback } from 'react-native';
import {addText, editText} from '../reducers/actions';
import { useDispatch } from 'react-redux';
import { TextContext } from'../context/text_Context';

const TextInputField = (props) => {
  
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const {id, textEdit, editText_context} = useContext(TextContext);



  const handleCreate = async () => {
   try {
      //  date edit 
      if(id != null) {
    
         await dispatch(editText(id, text));
         editText_context(null, '')

        } else {
          //   data create
          await dispatch(addText(text, Date()));
        }          
    } catch (err) {
      console.log(err.toString())
   }

    setText('')

  };
  
  const InputHandler =(input) => {
    setText(input);
  }

  useEffect(() => {
    if(textEdit !=''){
      setText(textEdit)
    }
   },[textEdit])


  return (
    <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Text"
          multiline={true}
          style={styles.Input}
          onChangeText={InputHandler}
          value={text}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Create" onPress={handleCreate} />
          </View>
        </View>
      </View>
   </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 20 ,
    justifyContent: 'center',
    alignItems: 'center'
  },

  Input: {
    width: '100%',
    height: 150,
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10

  },

  button: {
    width: '40%',
  }
});

export default TextInputField; 