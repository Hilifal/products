import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useQuery, gql } from '@apollo/client';
import Product from "@/components/Product/Product";
import SVG from '../../public/plus-add.svg'

//const inter = Inter({ subsets: ["latin"] });
const GET_LOCATIONS = gql`
query GetLocations {
  locations {
    id
    name
    description
    photo
  }
}
`
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

export default function Home() {
  const {loading, error, data} = useQuery(GET_PRODUCTS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data.products.products.map((el:any)=>(
        <div key={el.id}>
          <Product
            name={el.name}
            img={SVG}
            id={el.id}
          />
        </div>
      ))}
    </div>
  )
  
}
