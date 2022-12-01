import {createContext} from 'react';

const taskContext = createContext({
    name: String,
    email: String,
    tasks: [],
    newTaskClicked: Boolean,
})

export default taskContext;