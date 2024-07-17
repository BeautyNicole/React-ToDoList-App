import { ReactNode, useRef, useState } from 'react'
import './ToDoList.scss'
import { ToDoItem, ToDoList } from './ToDoList.type'
import avater from '../../assets/cat.jpg'
import classNames from 'classnames'
import Modal from '../../components/Modal/Modal'


const data: ToDoList = {
    todoList: [
        {
            id: 2,
            item: 'Learn new React learning material',
            priority: 3,
            finished: false
        },
        {
            id: 0,
            item: 'Finish React document learning',
            priority: 1,
            finished: true
        },
        {
            id: 3,
            item: 'Create one nodejs project with koa',
            priority: 4,
            finished: false
        },
        {
            id: 4,
            item: 'Create one mock server using nodejs koa or express',
            priority: 4,
            finished: false
        },
        {
            id: 1,
            item: 'Finish ReactNatice project development',
            priority: 2,
            finished: false
        },
    ]
}

type ItemProps = {
    item: ToDoItem,
    onToggle: (id: number, checked: boolean) => void,
    onAddedDone?: (id: number, content: string) => void,
    children?: ReactNode,
}

type HeaderProps = {
    total: number,
    finished: number,
    handleAddItem: () => void,
    handleDeleteItems: () => void
}

const Header = (props: HeaderProps) => {
    const { total, finished, handleAddItem, handleDeleteItems } = props;

    return (
        <div className='header'>
            <div className='avater'>
                <img src={avater} />
                <div className='actions-btn'>
                    <p onClick={handleAddItem}>+</p>
                    <p onClick={handleDeleteItems}>x</p>
                </div>

            </div>
            <h3>This is My ToDo List</h3>
            <p>({finished}/{total})</p>
        </div>
    )
}

const Item = (props: ItemProps) => {
    const { item, onToggle, onAddedDone } = props;
    const checkboxRef = useRef<HTMLLabelElement>(null)

    const handleAdd = (e: any) => {
        (onAddedDone && e.key === 'Enter') && onAddedDone(item.id, e.target.value)
    }

    return (
        <div className=''>
            <label
                className={classNames('checkbox-label', { 'checkbox-label-finished': item.finished })}
                htmlFor={'heart' + item.id}
                ref={checkboxRef}>

                {!item.editting && <input
                    className='checkbox-input'
                    type='checkbox'
                    id={'heart' + item.id}
                    name='todolist-checkbox'
                    checked={item.finished}
                    onChange={(e) => {
                        // if (checkboxRef.current) {
                        //     checkboxRef.current.style.color = e.target.checked ? 'salmon' : '';
                        //     checkboxRef.current.style.textDecoration = e.target.checked ? 'line-through' : ''
                        //     checkboxRef.current.style.textDecorationColor = e.target.checked ? 'salmon' : ''
                        // }
                        onToggle(item.id, e.target.checked)
                    }} />
                }
                ❤ {item.item}
                {
                    item.editting && <input type='text' autoFocus onKeyDown={handleAdd} />
                }
            </label>
        </div>
    )
}

const TodoList = () => {
    const [todoList, setTodoList] = useState(data.todoList.sort((a, b) => a.priority - b.priority))
    const totalItems = todoList.length;
    const finishedItems = todoList.filter(item => item.finished).length;
    const modalRef = useRef(null)

    const handleSubmit = () => {
        console.log('submitted data===>', JSON.stringify(data))
    }

    const handleChecked = (id: number, checked: boolean) => {
        const newToDoList = [...todoList];
        const alteredItem = newToDoList.find(item => item.id === id)
        if (alteredItem) {
            alteredItem.finished = checked
        }
        setTodoList(newToDoList)
    }

    const handleAddItem = (id?: number, content?: string) => {
        const edittedItem = id && todoList.find(item => item.id === id);
        if (edittedItem && content) {
            edittedItem.item = content
            edittedItem.editting = false

            return setTodoList(todoList => [...todoList])

        } else if (edittedItem && !content) {
            const newList = todoList.slice(0, id)
            return setTodoList(newList)
        }

        const newItem: ToDoItem = {
            id: totalItems,
            item: '',
            priority: 1,
            finished: false,
            editting: true
        }

        setTodoList(todoList => [...todoList, newItem])
    }

    const handleDeleteItems = () => {
        (modalRef.current as any).open();
    }

    const handleDelete = () => {
        (modalRef.current as any).close();
        const notFinishedItems = todoList.filter(item => !item.finished)
        setTodoList(notFinishedItems)
    }


    return (
        <>
            <div className='container'>
                <Header total={totalItems} finished={finishedItems} handleAddItem={handleAddItem} handleDeleteItems={handleDeleteItems} />
                <div className='todolist-item-wrapper'>
                    {todoList.map((item: any) => <Item key={item.id} item={item} onToggle={handleChecked} onAddedDone={handleAddItem} />)}
                </div>

                <button onClick={handleSubmit} className='submit-btn'>Submit</button>
            </div>
            <Modal ref={modalRef}>
                <div className='modal-content'>
                    <div className='modal-title'>
                        {finishedItems > 0 ? 'Are you sure to delete all finihsed items?' : 'You have no finished items...'}
                    </div>
                    <div className='modal-buttons'>
                        {finishedItems > 0 ?
                            (<>
                                <button onClick={handleDelete}>Yes</button>
                                <button onClick={() => (modalRef.current as any).close()}>No</button>
                            </>)
                            : <button onClick={() => (modalRef.current as any).close()}>Close</button>
                        }

                    </div>
                </div>

            </Modal>
        </>

    )
}

export default TodoList