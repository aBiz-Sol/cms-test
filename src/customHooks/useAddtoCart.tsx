import { toast } from "react-toastify";
import {
  useAppDispatch,
  useAppSelector,
} from "../customHooks/useTypedSelector";
import { addToCart, selectCartItems } from "../redux/slices/cartSlice";

const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const handleAddToCart = (item: any) => {
    const isItemInCart = cartItems?.find(
      (cartItem: any) => cartItem?.id === item?.id
    );

    if (isItemInCart) {
      toast.warning("This item is already in your cart.");
    } else {
      dispatch(addToCart(item));
      toast.success("Item added to cart!");
    }
  };

  return { handleAddToCart };
};

export default useAddToCart;

