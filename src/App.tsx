import { useEffect, useRef, useState } from 'react';
import './App.css'
import Button from './components/Button/Button';
import Son from './pages/Son/Son';
import { useNavigate, useLocation } from 'react-router-dom';
import ToDoList from './pages/ToDoList'

interface User {
  name: string,
  age?: number
}

function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  // const [user, setUsers] = useState<User | undefined>(undefined);

  // const [user, setUsers] = useState<User | undefined>({
  //   name: 'Kitty'
  // });


  const [user, setUsers] = useState<User>(() => {
    return {
      name: 'Kitty',
      age: 18
    }
  });

  const toggleShow = () => {
    setShow(!show)
  }

  const addCount = () => {
    setCount(count + 1);
  }


  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

  }, [])

  return (
    <>
      {/* {show && <Son />}
      <button onClick={toggleShow}>hide</button>
      <input type="text" ref={inputRef} />
      <button onClick={toggleShow}>toggle show</button>
      <div>
        {Object.entries(user).map(([key, value]) => (
          <>
            <p key={key}>key - {key} value - {value}</p>
          </>
        ))}
      </div>
      <p>count is {count}</p>
      <Button value={"click button to add count"}
        show={show}
        addCount={addCount}
        onGetMsg={(msg) => alert(msg)}
      >
        // <span>this is one span embeded inside Button component</span>
        Click me
      </Button> */}
      <ToDoList />
    </>
  )
}

export default App
