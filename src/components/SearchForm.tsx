import ErrorMessage from "./ErrorMessage";
import { useForm } from "react-hook-form";
import slug from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";
import slugify from "react-slugify";

export default function SearchForm() {

    const {register, handleSubmit, watch,formState:{errors}} = useForm({defaultValues:{
        handle:''
    }})

    const handle = watch('handle');

    const handleSearch = () => {
        const handleSlug = slug(handle);
        mutation.mutate(handleSlug);
    }

    const mutation = useMutation({
      mutationFn: searchByHandle,
    })

  return (
    <form
    onSubmit={handleSubmit(handleSearch)}
    className="space-y-5">
    <div className="relative flex items-center text-center justify-center bg-white  px-2">
      <label
        htmlFor="handle"
      >devtree.com/</label>
      <input
        type="text"
        id="handle"
        className="border-none bg-transparent p-2 focus:ring-0 flex-1 max-w-100"
        placeholder="elonmusk, zuck, jeffbezos"
        {...register("handle", {
          required: "Un Nombre de Usuario es obligatorio",
        })}
      />
  
    </div>
    {errors.handle && (
      <ErrorMessage>{errors.handle.message}</ErrorMessage>
    )}
  
    <div className="mt-10">
      {mutation.isPending && <p className="text-center">Cargando...</p>}
      {mutation.error && <p className="text-center text-red-600 font-black">{mutation.error.message}</p>}
      {mutation.data && <p className="text-center text-cyan-500 font-black">{mutation.data} ir a <Link to={`/auth/register`} state={slugify(handle)} className="text-cyan-800">Registro</Link></p>}
    </div>
  
    <input
      type="submit"
      className="bg-cyan-400 p-3 text-lg w-1/4 uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
      value='Obtener mi DevTree'
    />
  </form>
  )
}
