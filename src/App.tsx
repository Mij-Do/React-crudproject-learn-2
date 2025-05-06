import ProductsCard from "./components/ProductsCard"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal"
import { colors, formInputList, productsList } from "./data"
import { ChangeEvent, FormEvent, useState } from 'react'
import { Iproduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColors from "./components/CircleColors";
import { uuid } from "./utils/functions";




function App() {
  const defaultProduct = {
    id: '',
    title: '',
    price: '',
    description: '',
    imageURL: '',
    category: {
      name: '',
      imageURL: '',
    },
    colors: [],
  }
  // states
  const [product, setProduct] = useState <Iproduct> (defaultProduct);
  const [products, setProducts] = useState <Iproduct[]> (productsList);
  const [isOpen, setIsOpen] = useState (false);
  const [tempColor, setTempColor] = useState<string[]> ([]);
  const [errors, setErrors] = useState ({
    title: '',
    price: '',
    description: '',
    imageURL: '',
  });

  // handellers
  function open() {
    setIsOpen(true)
}

  function close() {
    setIsOpen(false)
  }

  const onChangeHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProduct ({
      ...product,
      [name]: value,
    });
    setErrors ({
      ...errors,
      [name]: '',
    });
  }

  const onSubmitHandeler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const {title, description, imageURL, price} = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrorMsg = Object.values(errors).some(value => value === '') && Object.values(errors).every(value => value === '');
    console.log(hasErrorMsg)
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts(prev => [{...product, id: uuid (), colors: tempColor}, ...prev]);
    setProduct(defaultProduct);
    setTempColor([]);
    close();
  }

  const onCancel = () => {
    setProduct(defaultProduct);
    close();
  }

  // renders
  const renderProducts = products.map(product => <ProductsCard key={product.id} product={product}/>)
  const renderInputs = formInputList.map (input => 
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="text-indigo-500 my-2">{input.label}</label>
      <Input className="p-2 my-2 border-2 border-indigo-200 rounded-md outline-indigo-500" value={product[input.name]} onChange={onChangeHandeler} name={input.name} type={input.type} id={input.id}/>
      <ErrorMsg msg={errors[input.name]}/>
    </div>
  );

  const renderCircleColors = colors.map(colors => 
    <CircleColors key={colors} 
    colors={colors} 
    onClick={() => {
      if (tempColor.includes(colors)) {
        setTempColor(prev => prev.filter(item => item !== colors));
        return;
      }
      setTempColor((prev) => [...prev, colors])
    }}/>)

  return (
    <main className="container mx-auto">
      <div className="text-center">
        <Button className="bg-indigo-500 py-2 my-2" onClick={open}>Add New Product</Button>
        <Modal isOpen={isOpen} onClose={close} title="Add New Product"> 
          <form className="space-y-3" onSubmit={onSubmitHandeler}>
            {renderInputs}
            <div className="flex flex-wrap space-x-2 my-5">
              {tempColor.map(color => 
                <span key={color} 
                style={{backgroundColor: color}} 
                className="rounded-md text-white p-1 text-sm mb-1">{color}</span>
              )}
            </div>
            <div className="flex flex-wrap space-x-2 my-5">
              {renderCircleColors}
            </div>
            <div className="flex space-x-2">
              <Button className="bg-indigo-500 hover:bg-indigo-400 text-white"> Submit </Button>
              <Button className="bg-gray-400 hover:bg-gray-300 text-white" onClick={onCancel}> Cancel </Button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>
    </main>
  )
}

export default App
