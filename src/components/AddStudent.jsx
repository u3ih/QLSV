import React, {useRef} from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const AddStudent = ({addStudent}) => {
  const [form] = Form.useForm();
  const refForm = useRef();

  const formItemLayout = {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
  const buttonItemLayout ={
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      
  const onFinish = (values) => {
    addStudent(values)
    refForm.current.setFieldsValue({
      name:"",
      idStudent:"",
      age:"",
      address:"",
      description:"",
      gender: "seclect your gender"
    })
    console.log("thêm oke")
  }      


  const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
  };

  return (
    <Form
      ref={refForm}
      {...formItemLayout}
      form={form}
      style={{
        margin: "30px 0"
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item 
        label="Tên sinh viên" 
        name="name"
        rules={[
          {
            required: true, 
            message: "Vui lòng nhập tên"
          }
        ]}
      >
        <Input placeholder="Nhập tên sinh viên" />
      </Form.Item>
      <Form.Item 
        label="Mã sinh viên" 
        name="idStudent"
        rules={[{ required: true, message: "Vui lòng nhập mã sinh viên"}
        ]}
      >
        <Input placeholder="Nhập mã sinh viên" />
      </Form.Item>
      <Form.Item 
        label="Tuổi" 
        name="age"
        rules={[{ required: true, message: "Vui lòng nhập tuổi"}
        ]}
      >
        <Input placeholder="Nhập mã sinh viên" />
      </Form.Item>
      <Form.Item 
        label="Địa chỉ" 
        name="address"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>
      <Form.Item 
        label="Miêu tả" 
        name="description"
        rules={[{ required: true, message: 'Nhập thông tin' }]}
      >
        <Input placeholder="Nhập miêu tả" />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Giới tính"
        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
      >
        <Select placeholder="select your gender">
          <Option value="Nam">Nam</Option>
          <Option value="Nữ">Nữ</Option>
          <Option value="Khác">Khác</Option>
        </Select>
      </Form.Item>

      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default AddStudent;