import Image from 'next/image'
import { useMutation, gql } from '@apollo/client';


type ProductProps = {
  name: string,
  img: string,
  //действие
  id: number,
  //onClick_fn?: () => void, 
  onClick_params?: object,
  onClick_fn?: any, 
}

function Product({name, id, img, onClick_fn, onClick_params}:ProductProps){
  // !!!!!! ДЛЯ ЛАЗИ КВЕРИ !!!!!!
  // const [getOne, {loading, data}] = useLazyQuery(GET_ONE_PRODUCT, {
  //   onCompleted: (data) => console.log(data),
  // }) 
  //const [addToCart, {data,loading,error}] = useMutation(ADD_ONE_PRODUCT)
  return(
    <>
      <h2>{name}</h2>
      <Image 
        src={img}
        width={45}
        height={45}
        alt='404'
        onClick={() => {onClick_fn()}}
      />
    </>
  )
}
export default Product
