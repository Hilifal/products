import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useQuery,useMutation, gql } from '@apollo/client';
import Product from "@/components/Product/Product";
import SVG from '../../public/plus-add.svg'
import Link from 'next/link';

//const inter = Inter({ subsets: ["latin"] });
const GET_PRODUCTS = gql`
query products{
  products(FilterProductsInput:{search:"",only_original:false},SortProductsInput:{}){
    totalCount
    products{
      id
      name
    }
  }
}
`
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

export default function Home() {
  
  const {loading: queryLoading, error: queryError, data: queryData} = useQuery(GET_PRODUCTS)
  const [addToCart, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(ADD_ONE_PRODUCT)

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error : {queryError.message}</p>;
  return (
    <div>
      <Link href="/cart">В корзину</Link>
      <Link href={'/form'}>Авторизация</Link>
      {queryData.products.products.map((el:any)=>(
        <div key={el.id}>
          <Product
            name={el.name}
            img={SVG}
            id={el.id}
            // onClick_fn={addToCart({
            //     variables: {
            //       id_prod:{
            //         product_id: el.id,
            //         quantity: 1
            //       }
            //     }
            //   })}
            onClick_fn={() => addToCart({
              variables: {
                id_prod:{
                  product_id: el.id,
                  quantity: 1
                }
              }
            }
          )}

          />
        </div>
      ))}
    </div>
  )
  
}
