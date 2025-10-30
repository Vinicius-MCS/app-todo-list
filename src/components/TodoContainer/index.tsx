import { useContext } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { themeConfig } from "../../contexts/theme"

interface TodoContainerProps {
    children: React.ReactNode
}

export const TodoContainer = ({children}: TodoContainerProps) => {

    const {theme} = useContext(ThemeContext)

    return (
        <main className={`${themeConfig[theme].layout.backgroundColor} h-screen`}>
            <div className={`${themeConfig[theme].layout.heroClass} h-80 bg-cover bg-center`}>
                <div className="max-w-[43.75rem] m-auto p-8">{children}</div>
            </div>
        </main>
    )
}