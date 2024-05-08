import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

function Form(){
	//const axios = require('axios')
	const [token, setToken] = useState('токена нет')
	const {
		//регистрирует поля для формы
		register,
		//позволяет реализовать валидацию и тд  (условный onSubmit не будет вызван если форма заполнена некорректно)
		handleSubmit,
		//watch,
		formState: { errors },
	} = useForm()
	const onSubmit: any = (data:any) => {
		console.log(data)
		axios.post('https://mplace-backend.dev-vt2b.ru/auth/login', {
			email: data.email,
			password: data.password
		})
		.then(response => {
			console.log('Response:', response.data)
			setToken(response.data.access_token)
		})
		.catch(error => {console.error('Error:', error)})
		
	}
	console.log(errors)
	//console.log(watch("example"))

	return (
		<>
			<Link href={'/'}>К товарам</Link>
			<Link href={'/cart'}>В корзину</Link>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Введите Email:
					<input defaultValue={"test@test.ru"} {...register("email")} />
				</label>
				{/*необходимо передать 2 параметра: 1) уникальное имя для инпута 2) объект с различными параметрами для валидации*/}
				<label>
					Введите пароль:
					<input {...register("password", {required: true})} />
				</label>
				{errors.password && <span>This field is required</span>}
				<input type="submit" />
			</form>
			<div>{token}</div>
		</>
	)

}

export default Form