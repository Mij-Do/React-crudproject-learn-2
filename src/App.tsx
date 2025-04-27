import ProductsCard from "./components/ProductsCard"
import { productsList } from "./data"

function App() {
  const renderProducts = productsList.map(product => <ProductsCard key={product.id} product={product}/>)

  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>
    </>
  )
}

export default App
