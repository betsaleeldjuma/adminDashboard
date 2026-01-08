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
    <div className="flex flex-col gap-8">
      {data.map((product) => <div key={product.id} className="bg-[#8E1616] ">
        {product.title} - ${product.price}
      </div>)}
    </div>
  )
}

export default Products