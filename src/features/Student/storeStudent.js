import { createSlice } from '@reduxjs/toolkit'

export const storeStudent = createSlice({
    name: "Student",
    initialState: {
        value: [{
            key: 1,
            name: 'John Brown',
            idStudent: "SV5",
            gender: "Nam",
            age: 18,
            address: 'New York No. 1 Lake Park',
          },
          {
            key: 2,
            name: 'Jim Green',
            idStudent: "SV6",
            gender: "Nữ",
            age: 19,
            address: 'London No. 1 Lake Park',
          },]
    },
    reducers: {
        addStudent: (state, values) => {
            let student = {
                key: state.value.length+1,
                name: values.payload.name,
                idStudent: values.payload.idStudent,
                gender: values.payload.gender,
                age: values.payload.age,
                address: values.payload.address,
            }
            state.value = [...state.value, student]
        },
        deleteStudent: (state, key, e) => {
            const newData = state.value.filter((item) => item?.key !== key.payload);
            state.value = newData
        },
        editStudent: (state, values) => {
            state.value = [...values.payload]
        },
    }
})

export const { addStudent, deleteStudent, editStudent } = storeStudent.actions

export default storeStudent.reducer