
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text,ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import TextItem from'./text_Item';
import {fetchdata} from '../reducers/actions';
import { useSelector, useDispatch } from 'react-redux';

const TextDataList = (props) => {

const [isLoading, setIsLoading] = useState(false);
const [isRefreshing, setIsRefreshing] = useState(false);
const [error, setError] = useState();
const textList = useSelector(state => state.texts.textData);
const dispatch = useDispatch();

 // to get data from db
const loadText = useCallback(async () => {
   setError(null);
   setIsRefreshing(true);
   try {
     await dispatch(fetchdata());
   } catch (err) {
     setError(err.message);
   }
   setIsRefreshing(false);
 }, [dispatch, setIsLoading, setError]);
 


   useEffect(() => {
      setIsLoading(true);
      loadText().then(() => {
      setIsLoading(false);
      });
   }, [dispatch, loadText]);


   if (error) {
      return (
      <View style={styles.centered}>
         <Text>An error occurred!</Text>
         <Button
            title="Try again"
            onPress={loadText}
         />
      </View>
      );
   } 

   
   if (isLoading) {
      return (
      <View style={styles.centered}>
         <ActivityIndicator size="large" 
         />
      </View>
      );
   }

   if (!isLoading && textList.length === 0) {
      return (
      <View style={styles.centered}>
         <Text>No text data found. feel free to add some text</Text>
      </View>
      );
   }
  return (
   <FlatList
    onRefresh ={loadText}
    refreshing ={isRefreshing}
    inverted
    keyExtractor={(item) => item.id}
    data={textList}
    renderItem={data => (
    <TextItem
        id={data.item.id}
        index={data.index + 1}
        text={data.item.text}
        setId ={props.setId}
        date={data.item.dateTime}
        />
       )}
      />
    );
  };

  const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' , paddingTop: 50}
  });

export default TextDataList;


