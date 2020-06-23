
export const ADD_TEXT = 'UPDATE_TEXT';
export const REMOVE_TEXT='REMOVE_TEXT';
export const SET_TEXTLIST = 'SET_TEXTLIST';
export const EDIT_TEXT ="EDIT_TEXT";
import Text from '../models/text'


    // text remove action
export const removeText = (textId) => {
    return async dispatch => {
    const response = await fetch(
        `https://test-28d2f.firebaseio.com/text/${textId}.json`,
        {
          method: 'DELETE'
        }
    );

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    dispatch({ type: REMOVE_TEXT, textId: textId });
 };
}



  // text add action
    export const addText = (text, date) => {
        var dateTime = date.toString();
        return async dispatch => {
            const response = await fetch(
            'https://test-28d2f.firebaseio.com/text.json',
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                text,
                dateTime ,
                })
            }
            );
            const resData = await response.json();
            dispatch({
            type: ADD_TEXT,
                textData: {
                id: resData.name,
                text,
                dateTime 
               } 
           });
      }
    }



  //  set data from db
    export  const fetchdata =()=> {
        return async dispatch => {
        try {
            const response = await fetch(
            'https://test-28d2f.firebaseio.com/text.json'
            );
    
            if (!response.ok) {
            throw new Error('Something went wrong!');
            }
    
            const resData = await response.json();
            const data = [];

            for (const key in resData) {
            data.push(
                new Text (
                 key,
                resData[key].text,
                resData[key].dateTime,
                )
            );
        }
        
        dispatch({ type: SET_TEXTLIST, textList: data });} 
        catch (err) {
            throw err;}
        };
    }

   // edit action 
    export const editText =(id, text) => {
    console.log(text)
    console.log(id)
    var dateTime = Date().toString()
    return async dispatch => {
        const response = await fetch(
        `https://test-28d2f.firebaseio.com/text/${id}.json`,
        {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            text,
            dateTime
            })
        }
        );

        if (!response.ok) {
        throw new Error('Something went wrong!');
        }

        dispatch({
        type: EDIT_TEXT,
        id: id,
            textData: {
            text,
            dateTime
          }
        });
      };
    }