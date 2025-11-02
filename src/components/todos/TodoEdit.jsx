import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTodo } from '../../stores/todoSlice'
import Button from '../common/Button'

const TodoEdit = ({ todo, onClose }) => {
    const [text, setText] = useState(todo.text)
    const dispatch = useDispatch()

    const handleSave = () => {
        if (text.trim()) {
            dispatch(editTodo({ id: todo.id, text }))
            onClose()
        }
    }

    return (
        <div className="mb-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border p-2 mr-2 rounded"
                placeholder="Edit todo"
            />
            <Button onClick={handleSave}>Edit</Button>
        </div>
    )
}

export default TodoEdit