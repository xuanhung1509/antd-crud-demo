import { useState, useRef } from 'react';
import { Input, Space, List, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Title } = Typography;
const { Search } = Input;

const initialTask = {
  id: uuidv4(),
  value: '',
};
const initialTasks = [
  {
    id: 1,
    value: 'Learn React',
  },
  {
    id: 2,
    value: 'Learn Firebase',
  },
  {
    id: 3,
    value: 'Learn GraphQL',
  },
];

function App() {
  const [task, setTask] = useState(initialTask);
  const [tasks, setTasks] = useState(initialTasks);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleSubmit = () => {
    if (task.value.length <= 0) return;

    if (!isEditing) {
      setTasks((prev) => [...prev, task]);
      setTask(initialTask);
    } else {
      setTasks((prev) =>
        prev.map((item) => (item.id === task.id ? task : item))
      );
      setTask(initialTask);
      setIsEditing(false);
    }
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setTask(task);
    inputRef.current.focus();
  };

  const handleDelete = (task) => {
    setTasks((prev) => prev.filter((item) => item.id !== task.id));
  };

  return (
    <div className='flex flex-col justify-start items-center gap-4 p-6'>
      <Title level={2}>Task Manager</Title>
      <Space direction='vertical' className='mx-auto'>
        <Search
          placeholder='Add a task'
          enterButton='Submit'
          size='large'
          value={task.value}
          onChange={handleChange}
          onSearch={handleSubmit}
          ref={inputRef}
        />
        <List
          bordered
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item className='flex justify-between'>
              {task.value}
              <Space>
                <Button
                  type='secondary'
                  shape='circle'
                  onClick={() => handleEdit(task)}
                >
                  <EditOutlined />
                </Button>
                <Button
                  type='danger'
                  shape='circle'
                  onClick={() => handleDelete(task)}
                >
                  <DeleteOutlined />
                </Button>
              </Space>
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
}
export default App;
