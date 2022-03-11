import { Table, Button } from 'antd'
import { useCallback, useMemo, useRef, useState } from 'react'
import AddStudent from './AddStudent.jsx'


function StudentTable() {
    const [hidden, setHidden] = useState(false)

    const [data, setData] = useState([
        {
          key: 1,
          name: 'John Brown',
          idStudent: "SV5",
          gender: "Nam",
          age: 18,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 18 years old, living in New York No. 1 Lake Park.',
        },
        {
          key: 2,
          name: 'Jim Green',
          idStudent: "SV6",
          gender: "Nữ",
          age: 19,
          address: 'London No. 1 Lake Park',
          description: 'My name is Jim Green, I am 19 years old, living in London No. 1 Lake Park.',
        },
        {
          key: 3,
          name: 'Not Expandable',
          idStudent: "SV7",
          gender: "Nam",
          age: 20,
          address: 'Jiangsu No. 1 Lake Park',
          description: 'This not expandable',
        },
        {
          key: 4,
          name: 'Joe Black',
          idStudent: "SV8",
          gender: "Nữ",
          age: 20,
          address: 'Sidney No. 1 Lake Park',
          description: 'My name is Joe Black, I am 20 years old, living in Sidney No. 1 Lake Park.',
        },
      ])

    const onDelete = useCallback((key, e) => {
        const newData = data.filter((item) => item?.key !== key);
        console.log('data')
        setData(newData);
    }, [data]);

    const columns = useMemo(() => {
        return [
            { title: 'Tên', dataIndex: 'name', key: 'name' },
            { title: 'Mã sinh viên', dataIndex: 'idStudent', key: 'idStudent' },
            { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
            { title: 'Tuổi', dataIndex: 'age', key: 'age' },
            { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
            {
              title: 'Xóa sinh viên',
              dataIndex: '',
              key: 'x',
              render: (text, record) => (
                <span
                  className='delete'
                  style={{
                      cursor: "pointer",
                      border: "1px solid gray",
                      padding: "5px"
                  }}
                  onClick={(e) => { onDelete(record.key, e) }}
                >
                  Delete
                </span>
              ),
            },
        ];
    }, [onDelete]);

    console.log(data)

    const addStudent = ({name, idStudent, gender, age, address, description}) => {
        let student = {
            key: data.length+1,
            name,
            idStudent,
            gender,
            age,
            address,
            description
        }

        setData(prev => [...prev, student])
    }
    

    const showFormAddStudent = () => {
        setHidden(prev => !prev)
    }
    
    return (
        <>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                }}
                dataSource={data}
            />
            <Button 
                type="primary"
                ghost
                onClick={showFormAddStudent}
                style={{
                    marginLeft: "10px"
                }}
            >
                Thêm sinh viên
            </Button>
            {hidden && <AddStudent addStudent={addStudent}/>}
        </>
    )
}

export default StudentTable;