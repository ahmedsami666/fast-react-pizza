import { useSelector } from "react-redux"

const UserName = () => {
    const { userName } = useSelector(state => state.user)
    if (!userName) return null
    return (
        <div className="text-sm font-semibold hidden md:block">{userName}</div>
    )
}
export default UserName