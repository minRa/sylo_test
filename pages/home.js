import React from 'react';
import { StyleSheet, View} from 'react-native';
import TextInputField from '../components/text_Input_Field';
import Header from '../components/header';
import TextDataList from '../components/text_Data_List';
import Context from'../context/text_Context'


const Home = () => {

  return (
    <View>
      <Header/>
        <View style={styles.screen}>
          <Context>
          <TextInputField />
          <TextDataList/>
          </Context>
        </View>
     </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingLeft:30,
    paddingRight:30
  },
  
  isLoading: {
    paddingTop: 20 ,
    justifyContent: 'center',
    alignItems: 'center'

  }

});

export default Home;
