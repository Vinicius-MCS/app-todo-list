import { ThemeContext } from "../../contexts/ThemeContext"
import { useContext } from "react"
import { themeConfig } from "../../contexts/theme"
import type { Todo } from "../../hooks/useTodo"
import IconCheck from "/images/icon-check.svg"

interface TodoListProps {
    todoList: Todo[],
    toggleTodoCompleted: (id: number) => void
    setFilter: (filter: 'all' | 'active' | 'completed') => void
    filter: 'all' | 'active' | 'completed'
    clearCompleted: () => void
    removeTodo: (id: number) => void
}

const TodoList = ({ todoList, toggleTodoCompleted, setFilter, filter, clearCompleted, removeTodo }: TodoListProps) => {

    const { theme } = useContext(ThemeContext)

    // function deleteTodo(): void {
    //     throw new Error("Function not implemented.")
    // }

    return (
        <>
            <div className={`${themeConfig[theme].todo.backgroundColor} rounded-md`}>
                <ul>
                    {
                        todoList.map(todo => (
                            <li className={`group p-6 border-b ${themeConfig[theme].todo.borderColor}`} key={todo.id}>
                                <div className="flex items-center gap-4">
                                    <span className={`w-6 h-6 rounded-full hover:bg-[linear-gradient(to_right,hsl(192,100%,67%),hsl(280,87%,65%))] ${!todo.completed ? 'hover:p-[1px]' : ""}`}>
                                        <button onClick={() => toggleTodoCompleted(todo.id)} className={`w-full h-full border ${themeConfig[theme].todo.borderColor} rounded-full cursor-pointer ${themeConfig[theme].todo.backgroundColor} ${todo.completed ? 'bg-[linear-gradient(to_right,hsl(192,100%,67%),hsl(280,87%,65%))]' : ""}`}>
                                            {todo.completed && (<img src={IconCheck} alt="Ícone de marcado" className="h-2 w-2 m-auto" />)}
                                        </button>
                                    </span>
                                    <p className={`cursor-pointer ${themeConfig[theme].todo.textColor} ${todo.completed ? 'line-through opacity-50' : ""}`}>{todo.text}</p>
                                    <span onClick={() => removeTodo(todo.id)} className="ml-auto group-hover:opacity-100 opacity-0 sm:opacity-100 relative hover:inline-block w-5 h-5 cursor-pointer
                                    before:content-[''] before:absolute before:top-2.5 before:left-0 before:w-5 before:h-[2px] before:bg-gray-500 before:rotate-45
                                    after:content-[''] after:absolute after:top-2.5 after:left-0 after:w-5 after:h-[2px] after:bg-gray-500 after:-rotate-45">
                                    </span>
                                </div>
                            </li>
                        ))
                    }
                </ul>


                <div className={`text-sm flex justify-between p-4 ${themeConfig[theme].layout.textColor}`}>

                    <p className="cursor-default">{todoList.length} items total</p>

                    <div className="hidden sm:flex gap-4">
                        <button onClick={() => setFilter("all")} className={`${filter === 'all' ? 'text-bright-blue' : ''} ${theme === 'dark' ? 'hover:text-purple-100' : 'hover:text-navy-900'}`}>All</button>
                        <button onClick={() => setFilter("active")} className={`${filter === 'active' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-purple-100' : 'hover:text-navy-900'}`}>Active</button>
                        <button onClick={() => setFilter("completed")} className={`${filter === 'completed' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-purple-100' : 'hover:text-navy-900'}`}>Completed</button>
                    </div>

                    <button onClick={clearCompleted} className={`cursor-pointer ${theme === 'dark' ? 'hover:text-purple-100' : 'hover:text-navy-900'}`}>Clear Completed</button>
                </div>


            </div>


            <div className={`flex justify-center gap-5 py-4 rounded-md mt-4 ${themeConfig[theme].todo.backgroundColor} ${themeConfig[theme].layout.textColor} sm:hidden`}>
                <button onClick={() => setFilter("all")} className={`${filter === 'all' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-purple-100' : 'hover:text-navy-900'}`}>All</button>
                <button onClick={() => setFilter("active")} className={`${filter === 'active' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-purple-100' : 'hover:text-navy-900'}`}>Active</button>
                <button onClick={() => setFilter("completed")} className={`${filter === 'completed' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-purple-100' : 'hover:text-navy-900'}`}>Completed</button>
            </div>

        </>
    )
}

export default TodoList