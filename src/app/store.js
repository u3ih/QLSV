import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/Student/storeStudent'

export default configureStore({
    reducer: {
        student: counterReducer,
    },
})