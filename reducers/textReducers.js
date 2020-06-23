import {
  ADD_TEXT,
  REMOVE_TEXT,
  SET_TEXTLIST,
  EDIT_TEXT
} from'./actions';
import Text from '../models/text'

//reducer for data management

const initialState = {
  textData:[],
};

export default (state= initialState, action) => {
    switch (action.type) {
        case SET_TEXTLIST :
            return {
               textData : action.textList
            };
        case EDIT_TEXT:
            const textIndex = state.textData.findIndex((text)=> text.id == action.id);       
            const updateText = new Text (
              action.id,
              action.textData.text,
              action.textData.dateTime
            );
            const updatedTextData = [...state.textData];
            updatedTextData[textIndex] = updateText;
            return {
              ...state,
              textData : updatedTextData
            };
          case ADD_TEXT :
            const newText = new Text (
              action.textData.id,
              action.textData.text,
              action.textData.dateTime
            );
            return {
              ...state,
              textData : state.textData.concat(newText)
            };
         case REMOVE_TEXT :    
            return {
              ...state,
               textData : state.textData.filter((text)=> text.id !== action.textId)};
        default:
            return state;               
    }
};