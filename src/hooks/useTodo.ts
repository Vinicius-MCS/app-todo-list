import { useEffect, useState, type FormEvent } from "react"

export interface Todo {
  id: number,
  text: string,
  completed: boolean
}

async function getTodos(): Promise<Todo[]> {
    await new Promise(resolve => setTimeout(resolve, 800))

    return [
        {id: 1, text: "Aprender useEffect", completed: false},
        {id: 2, text: "Aprender React", completed: false},
        {id: 3, text: "Aprender JS", completed: true},
    ]
} 

export const useTodo = () => {

    const [todoList, setTodoList] = useState<Todo[]>([])
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchTodods = async() => {
            const todos = await getTodos();

            console.log("Dados recebidos", todos);
            setTodoList(todos);
        }

        fetchTodods()
    }, [refresh])

    const addTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const todoItem = formData.get('todo') as string

        if (!todoItem.trim()) return

        setTodoList(prev => [...prev, {
            id: Date.now(),
            text: todoItem,
            completed: false
        }])

        event.currentTarget.reset()

        setFilter("all")
    }

    const removeTodo = (id: number) => {
        setTodoList(prev => prev.filter(todo => todo.id !== id))
    }

    const toggleTodoCompleted = (id: number) => {

        const newTodoList = todoList.map(todo => {
            if (id === todo.id) {

                const completed = !todo.completed

                return {
                    ...todo,
                    completed
                }
            }

            return todo
        })

        setTodoList(newTodoList)
    }

    const filteredTodos = todoList.filter(todo => {
        if (filter === "active") return !todo.completed
        if (filter === "completed") return todo.completed
        return true
    })

    const clearCompleted = () => {
        setTodoList(prev => prev.filter(todo => !todo.completed))
    }

    return {
        addTodo,
        toggleTodoCompleted,
        filteredTodos,
        clearCompleted,
        filter,
        setFilter,
        removeTodo,
        refresh,
        setRefresh
    }
}