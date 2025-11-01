import TodoAdd from '../components/todos/TodoAdd'
import TodoList from '../components/todos/TodoList'

const Todos = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todos</h1>
      <TodoAdd />

      <TodoList />
    </div>
  )
}

export default Todos