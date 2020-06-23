import React, {createContext, useState} from 'react';

export const TextContext = createContext();

// context for edit text
const Context = props => {
    const [id, setId] = useState(null); // set for text id
    const [text , setText] = useState(''); // set for text


    const editText = (id, text) => {
        setId(id)
        setText(text)
     }

    return (
        <TextContext.Provider
         value = {{
            textEdit : text,
            id: id,
            editText_context : editText,
         }}
        >
           {props.children}
        </TextContext.Provider>
    );
}

export default Context