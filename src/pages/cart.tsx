import { useQuery,useMutation, gql } from '@apollo/client';
import Product from "@/components/Product/Product";
import MYSVG from '../../public/delete-button.svg';
import Link from 'next/link';

const GET_CART_PRODUCTS = gql`
query cart {
  cart{
    id
    CartProducts{
      product_id
      Product{
        name
      }
    }
  }
}
`

const REMOVE_ONE_PRODUCT = gql`
mutation removeFromCart($id_prod: RemoveFromCartInput!){
  removeFromProductCart(RemoveFromCartInput: $id_prod){
    id
    Product{
      id
      name
    }
  }
}
`

function Cart(){
    const {loading, error, data} = useQuery(GET_CART_PRODUCTS)
    const [removeFromCart, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(REMOVE_ONE_PRODUCT)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    if (!loading) {
        console.log(data.cart.CartProducts)
    }
    return(
    <div>
      <Link href="/">К продуктам</Link>
      <Link href={'/form'}>К авторизации</Link>
      {data.cart.CartProducts.map((el:any)=>(
        <div key={el.product_id}>
          
          <Product
            name={el.Product.name}
            img={MYSVG}
            id={el.product_id}
            onClick_fn={() => removeFromCart({
              variables: {
                id_prod:{
                  product_ids: [el.product_id],
                }
              },
              refetchQueries: ['cart']           
            })}
            
          />
        </div>
      ))}
    </div>
    )
}

export default Cart