import { Link } from "react-router-dom"

const Button = ({ children, disabled, to, type, onClick }) => {
    const base = "bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm"
    const styles = {
        primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
        small: base + ' px-4 py-2 sm:px-5 sm:py-2.5 text-xs',
        secondary: base + ' bg-transparent border-2 border-stone-300 px-4 py-2.5 sm:px-6 sm:py-3.5 text-stone-400 hover:bg-stone-300 focus:bg-stone-300 hover:text-stone-800 focus:ring-stone-200',
        round: base + ' px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm'
    }

    if (to) return <Link to={to} className={styles[type]}>{children}</Link>
    if (onClick) return (
        <button disabled={disabled} className={styles[type]} onClick={onClick}>
            {children}
        </button>
    )
    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}
export default Button