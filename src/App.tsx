import ProductsCard from "./components/ProductsCard"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal"
import { formInputList, productsList } from "./data"
import { useState } from 'react'




function App() {
  // states
  const [isOpen, setIsOpen] = useState(false);

  // handellers
  function open() {
    setIsOpen(true)
}

  function close() {
    setIsOpen(false)
  }

  // renders
  const renderProducts = productsList.map(product => <ProductsCard key={product.id} product={product}/>)
  const renderInputs = formInputList.map (input => 
    <div className="flex flex-col">
      <label htmlFor={input.id} className="text-indigo-500 my-2">{input.label}</label>
      <Input className="p-2 my-2 border-2 border-indigo-200 rounded-md outline-indigo-500" type={input.type} id={input.id}/>
    </div>
  )
  return (
    <main className="container mx-auto">
      <div className="text-center">
        <Button className="bg-indigo-500 py-2 my-2" onClick={open}>Add New Product</Button>
        <Modal isOpen={isOpen} onClose={close} title="Add New Product"> 
          {renderInputs}
          <div className="flex space-x-2">
            <Button className="bg-indigo-500 hover:bg-indigo-400 text-white"> Submit </Button>
            <Button className="bg-gray-400 hover:bg-gray-300 text-white"> Cancel </Button>
          </div>
        </Modal>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>
    </main>
  )
}

export default App
