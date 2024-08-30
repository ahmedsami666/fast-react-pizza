import LinkButton from '../../ui/LinkButtton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './cartSlice';
import EmptyCart from './EmptyCart'

function Cart() {
  const { cart } = useSelector(state => state.cart)
  const { userName } = useSelector(state => state.user)
  const dispacth = useDispatch()

  if (!cart.length) return <EmptyCart />
  return (
    <div className='py-3 px-4'>
      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>

      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map(item => <CartItem key={item.pizzaId} item={item}/>)}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button to="/order/new" type='primary'>
          Order pizzas
        </Button>
        <Button type='secondary' onClick={() => dispacth(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
