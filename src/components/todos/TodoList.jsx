import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const TodoList = () => {
    const todos = useSelector(state => state.todos)

    if (todos.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                No todos yet. Add one above!
            </div>
        )
    }

    return (
        <ul className="space-y-2">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul> 
    )
}

export default TodoList