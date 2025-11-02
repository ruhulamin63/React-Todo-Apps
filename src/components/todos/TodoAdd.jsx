import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../app/todoSlice'
import Button from '../common/Button'

const TodoAdd = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleAdd = () => {
        if (text.trim()) {
            dispatch(addTodo(text))
            setText('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd()
        }
    }

    return (
        <div className="mb-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border p-2 mr-2 rounded"
                placeholder="Add a new todo"
            />
            <Button onClick={handleAdd}>Add Todo</Button>
        </div>
    )
}

export default TodoAdd