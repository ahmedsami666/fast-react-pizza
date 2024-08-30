import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispacth = useDispatch()
  const handleAddToCart = () => {
    const item = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1
    }
    dispacth(addItem(item))
  }

  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0
  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex flex-col flex-grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between ">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {isInCart &&
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity currentQuantity={currentQuantity} pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>}
          {!soldOut && !isInCart && <Button type='small' onClick={handleAddToCart}>Add to Cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
