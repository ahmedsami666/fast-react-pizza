import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice"

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
    const dispactch = useDispatch()
    return (
        <div className="flex gap-1 items-center md:gap-3">
            <Button type='round' onClick={() =>dispactch(increaseItemQuantity(pizzaId))}>
                +
            </Button>
            <span>{currentQuantity}</span>
            <Button type='round' onClick={() => dispactch(decreaseItemQuantity(pizzaId))}>
                -
            </Button>
        </div>
    )
}
export default UpdateItemQuantity