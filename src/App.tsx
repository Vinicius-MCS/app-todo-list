import TodoForm from "./components/TodoForm"
import TodoHeader from "./components/TodoHeader"
import TodoList from "./components/TodoList"
import { TodoContainer } from "./components/TodoContainer"
import { useTodo } from './hooks/useTodo'

function App() {

  const { addTodo, toggleTodoCompleted, clearCompleted, filteredTodos, filter, setFilter, removeTodo} = useTodo()

  return (
    <TodoContainer>
      <TodoHeader></TodoHeader>

      <TodoForm addTodo={addTodo}></TodoForm>

      <TodoList todoList={filteredTodos} toggleTodoCompleted={toggleTodoCompleted} setFilter={setFilter} filter={filter} clearCompleted={clearCompleted} removeTodo={removeTodo}></TodoList>

    </TodoContainer>
  )
}

export default App