import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo } from '../../stores/todoSlice'
import Button from '../common/Button'

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch()

    return (
        <li className="flex items-center mb-2 p-2 border rounded">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="mr-2"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
            </span>
            <Button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="ml-2 bg-red-500 hover:bg-red-700">
                Delete
            </Button>
        </li>
    )
}

export default TodoItem