import { useQuery, gql } from '@apollo/client';
import Product from "@/components/Product/Product";
import MYSVG from '../../public/delete-button.svg';

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

function Cart(){
    const {loading, error, data} = useQuery(GET_CART_PRODUCTS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    if (!loading) {
        console.log(data.cart.CartProducts)
    }
    return(
    <div>
      {data.cart.CartProducts.map((el:any)=>(
        <div key={el.product_id}>
          <Product
            name={el.Product.name}
            img={MYSVG}
            id={el.id}
          />
        </div>
      ))}
    </div>
    )
}

export default Cart