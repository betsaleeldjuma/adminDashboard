import { useQuery } from "@tanstack/react-query"
import { fetchProducts, type Products } from "../hooks/useFetch"
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const Products = () => {
  const {data, isLoading, error} = useQuery<Products[]>({queryKey: ['products'], queryFn: fetchProducts})

  if(isLoading) return <div className="flex justify-center items-center w-screen h-screen"><Loading /></div>;
  if(error) return <div className="flex justify-center items-center w-screen h-screen"><ErrorState /></div>;
  if(!data) return <div className="flex justify-center items-center w-screen h-screen"><EmptyState /></div>;

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="font-extrabold text-2xl lg:text-4xl">PRODUCTS</h1>
      <div className="flex flex-col gap-4">
        {data.map((product) => <div key={product.id} className="bg-[#8E1616] flex justify-evenly rounded-lg p-4">
          <h1 className="font-bold lg:text-2xl">{product.title}</h1> 
          <p className="lg:text-2xl">${product.price}</p>
        </div>)}
      </div>
    </div>
  )
}

export default Products