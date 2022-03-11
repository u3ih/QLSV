import StudentTable from "./components/StudentTable.jsx"
import { Layout} from 'antd';

const { Header, Content } = Layout;



function App() {
  return (
    <>
        <Content>
          <StudentTable />
        </Content>
    </>
  );
}

export default App;
