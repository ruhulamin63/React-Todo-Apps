import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, editTodo, deleteTodo } from '../../app/todoSlice'
import Button from '../common/Button'

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)

    const handleEdit = () => {
        if (isEditing) {
            dispatch(editTodo({ id: todo.id, text: editText }))
        }
        setIsEditing(!isEditing)
    }

    const handleCancel = () => {
        setEditText(todo.text)
        setIsEditing(false)
    }

    return (
        <li className="flex items-center mb-2 p-2 border rounded">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="mr-2"
            />
            
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow mr-2 px-2 py-1 border rounded"
                    autoFocus
                />
            ) : (
                <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.text}
                </span>
            )}

            {isEditing ? (
                <>
                    <Button
                        onClick={handleEdit}
                        className="ml-2 bg-green-500 hover:bg-green-700">
                        Save
                    </Button>
                    <Button
                        onClick={handleCancel}
                        className="ml-2 bg-gray-500 hover:bg-gray-700">
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="ml-2 bg-blue-500 hover:bg-blue-700">
                        Edit
                    </Button>
                    
                    <Button
                        onClick={() => dispatch(deleteTodo(todo.id))}
                        className="ml-2 bg-red-500 hover:bg-red-700">
                        Delete
                    </Button>
                </>
            )}
        </li>
    )
}

export default TodoItem