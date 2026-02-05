import IconSun from "../assets/images/icon-sun.svg"
import MoonIcon from "../assets/images/icon-moon.svg"

export const themeConfig = {
    light: {
        name: "light",
        layout: {
            heroClass: 'theme-light',
            backgroundColor: 'bg-purple-100',
            textColor: 'text-navy-850'
        },
        todo: {
            backgroundColor: 'bg-grayish-50',
            borderColor: 'border-purple-100',
            textColor: 'text-navy-850'
        },
        icon: MoonIcon
    },
    dark: {
        name: "dark",
        layout: {
            heroClass: 'theme-dark',
            backgroundColor: 'bg-navy-950',
            textColor: 'text-gayish-300'
        },
        todo: {
            backgroundColor: 'bg-navy-900',
            borderColor: 'border-purple-700',
            textColor: 'text-grayish-600'
        },
        icon: IconSun
    }
}