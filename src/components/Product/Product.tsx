import Image from 'next/image'
import { useMutation, gql } from '@apollo/client';


type ProductProps = {
  //id: string,
  name: string,
  img: string,
  //действие
  id: number
}

const ADD_ONE_PRODUCT = gql`
mutation addToCart($id_prod: AddToCartInput!) {
  addToProductCart(AddToCartInput: $id_prod){
    id
    Product{
      id 
      name
    }
  }
}
`

function Product({name, id, img}:ProductProps){
  // !!!!!! ДЛЯ ЛАЗИ КВЕРИ !!!!!!
  // const [getOne, {loading, data}] = useLazyQuery(GET_ONE_PRODUCT, {
  //   onCompleted: (data) => console.log(data),
  // }) 
  const [addToCart, {data,loading,error}] = useMutation(ADD_ONE_PRODUCT)
  return(
    <>
      <h2>{name}</h2>
      <Image 
        src={img}
        width={45}
        height={45}
        alt='404'
        //!!!!! onClick={()=>{getOne()}}
        onClick={()=>{addToCart({
          variables: {
            id_prod:{
              product_id: id,
              quantity: 1
            }
          }
        })}}
      />
    </>
  )
}
export default Product
