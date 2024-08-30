import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from './../cart/EmptyCart'
import store from '../../store'
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(state => state.cart.cart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totatlPrice = totalCartPrice + priorityPrice
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const formErrors = useActionData()
  const { userName, status: addressStatus, position, address, error: errorAddress } = useSelector(state => state.user)
  const isLoadingAddress = addressStatus === 'loading'
  const dispatch = useDispatch()

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required className="input grow" defaultValue={userName}/>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full"/>
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formErrors.phone}</p> }
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required className="input w-full" disabled={isLoadingAddress} defaultValue={address}/>
            {addressStatus === 'error' && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{errorAddress}</p> }
          </div>
          {!position.latitude && !position.longitude && <span className="absolute right-0 z-50">
            <Button disabled={isLoadingAddress} type='small' onClick={(e) => {
              e.preventDefault()
              dispatch(fetchAddress())
              }}>
              Get Position
            </Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ''}/>
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting ? 'submitting...' : `Order now for ${formatCurrency(totatlPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action ({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }
  console.log(order)
  const errors = {}
  if (!isValidPhone(order.phone)) errors.phone = 'pleasse give us valid phone number'
  if (Object.keys(errors).length > 0) return errors

  const newOrder = await createOrder(order)
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`)
}
export default CreateOrder;
