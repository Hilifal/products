import Link from "next/link"
import { useForm } from "react-hook-form"

function Form(){
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()
	const onSubmit: any = (data:any) => console.log(data)

	console.log(watch("example"))

	return (
		<>
			<Link href={'/'}>К товарам</Link>
			<Link href={'/cart'}>В корзину</Link>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input defaultValue={"test"} {...register("exsmple")} />
				<input {...register("exampleRequred", {required: true})} />
				{errors.exampleRequired && <span>This field is required</span>}
				<input type="submit" />
			</form>
		</>
	)

}

export default Form