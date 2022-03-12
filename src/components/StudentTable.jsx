import { Form, Table, Button, InputNumber, Input, Typography, Popconfirm } from 'antd'
import { useState } from 'react'
import { addStudent, deleteStudent, editStudent } from '../features/Student/storeStudent.js'
import AddStudent from './AddStudent.jsx'
import { useSelector, useDispatch } from 'react-redux'


function StudentTable() {
    const [form] = Form.useForm();
    const [hidden, setHidden] = useState(false)
    const [editingKey, setEditingKey] = useState('');


    const data = useSelector((state) => state.student.value)
    const dispatch = useDispatch()

    const isEditing = (record) => record.key === editingKey;

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
      };

    const edit = (record) => {
        form.setFieldsValue({
          name: '',
          idStudent: '',
          gender: '',
          age: '',
          address: '',
          description: '',
          ...record,
        });
        setEditingKey(record.key);
        
      };
      const cancel = () => {
        setEditingKey('');
      };
    
      const save = async (key) => {
        try {
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
    
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            dispatch(editStudent(newData))
            setEditingKey('');
          } else {
            newData.push(row);
            dispatch(editStudent(newData))
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };
    

    const columns = [
            { title: 'Tên', dataIndex: 'name', key: 'name', editable: true },
            { title: 'Mã sinh viên', dataIndex: 'idStudent', key: 'idStudent', editable: true },
            { title: 'Giới tính', dataIndex: 'gender', key: 'gender', editable: true },
            { title: 'Tuổi', dataIndex: 'age', key: 'age', editable: true },
            { title: 'Địa chỉ', dataIndex: 'address', key: 'address', editable: true },
            {
                title: 'Sửa sinh viên',
                dataIndex: 'operation',
                render: (_, record) => {
                  const editable = isEditing(record);
                  return editable ? (
                    <span>
                      <Typography.Link
                        onClick={() => save(record.key)}
                        style={{
                          marginRight: 8,
                        }}
                      >
                        Save
                      </Typography.Link>
                      <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                  ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                      Edit
                    </Typography.Link>
                  );
                },
            },
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
                  onClick={(e) => dispatch(deleteStudent(record.key, e))}
                >
                  Delete
                </span>
              ),
            },
        ];   

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
              return col;
            }

            return {
              ...col,
              onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
              }),
            };
        });

    const showFormAddStudent = () => {
        setHidden(prev => !prev)
    }
    
    return (
        <>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                        cell: EditableCell,
                        },
                    }}
                    columns={mergedColumns}
                    dataSource={data}
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
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
            {hidden && <AddStudent addStudent={(values) => dispatch(addStudent(values))}/>}
        </>
    )
}

export default StudentTable;