import ProductsCard from "./components/ProductsCard"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal"
import { categories, colors, formInputList, productsList } from "./data"
import { ChangeEvent, FormEvent, useState } from 'react'
import { Iproduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColors from "./components/CircleColors";
import { uuid } from "./utils/functions";
import Select from "./components/ui/Select";
import { TProductName } from "./types";
import toast, { Toaster } from "react-hot-toast";




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
  const [productToEdit, setProductToEdit] = useState <Iproduct> (defaultProduct);
  const [productToEditIdx, setProductToEditIdx] = useState <number> (0);
  const [products, setProducts] = useState <Iproduct[]> (productsList);
  const [isOpen, setIsOpen] = useState (false);
  const [isOpenEdit, setIsOpenEdit] = useState (false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState (false);
  const [tempColor, setTempColor] = useState<string[]> ([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [errors, setErrors] = useState ({
    title: '',
    price: '',
    description: '',
    imageURL: '',
    colors: '',
  });

  // handellers

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const openEditModal = () => setIsOpenEdit(true);
  const closeEditModal = () => setIsOpenEdit(false);

  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);


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

  const onChangeEditHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProductToEdit ({
      ...productToEdit,
      [name]: value,
    });
    setErrors ({
      ...errors,
      [name]: '',
    });
  }

  const onSubmitHandeler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const {title, description, imageURL, price, colors} = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors,
    });
    const hasErrorMsg = Object.values(errors).some(value => value === '') ;
    
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    
    setProducts(prev => [{...product, id: uuid (), colors: tempColor, category: selectedCategory}, ...prev]);
    setProduct(defaultProduct);
    setTempColor([]);
    close();
    toast.success('Product have been Added!');
  }

  const onSubmitEditHandeler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const {title, description, imageURL, price, colors} = productToEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors,
    });
    const hasErrorMsg = Object.values(errors).some(value => value === '') && Object.values(errors).every(value => value === '');
    console.log(hasErrorMsg)
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    
    // for updating product
    const updatedProduct = [...products];
    updatedProduct[productToEditIdx] = {...productToEdit, colors: tempColor.concat(productToEdit.colors)};
    setProducts(updatedProduct);

    setProductToEdit(defaultProduct);
    setTempColor([]);
    closeEditModal();
    toast.success('Product have been Updated!');
  }
  const onCancel = () => {
    setProduct(defaultProduct);
    close();
  }

  const onRemoveHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast.success('Product have been deleted!');
  } 

  // renders
  const renderProducts = products.map((product, idx) => <ProductsCard idx={idx} setProductToEditIdx={setProductToEditIdx} openEditModal={openEditModal} openConfirmModal={openConfirmModal} key={product.id} product={product} setProductToEdit={setProductToEdit}/>)
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
      if (productToEdit.colors.includes(colors)) {
        setTempColor(prev => prev.filter(item => item !== colors));
        return;
      }
      setTempColor((prev) => [...prev, colors]);
    }}/>);
    
    const renderProductToEditWithMsg = (id: string, label: string, name: TProductName) => {
      return (
        <div className="flex flex-col">
          <label htmlFor={id} className="text-indigo-500 my-2">{label}</label>
          <Input className="p-2 my-2 border-2 border-indigo-200 rounded-md outline-indigo-500" 
          value={productToEdit[name]} onChange={onChangeEditHandeler} 
          name={name} type={'text'} id={id}/>
          <ErrorMsg msg={''}/>
        </div>
      )
    }

  return (
    <main className="container mx-auto">
    <div><Toaster toastOptions={{
      style: {
        border: 'none',
        backgroundColor: 'black',
        color: 'white',
      },
    }}/></div>
      <div className="text-center">
        <Button className="bg-indigo-500 py-2 my-2" onClick={open}>Add New Product</Button>


        {/* {add new product} */}
        <Modal isOpen={isOpen} onClose={close} title="Add New Product"> 
          <form className="space-y-3" onSubmit={onSubmitHandeler}>
            {renderInputs}
            <Select selected={selectedCategory} setSelected={setSelectedCategory}/>
            <div className="flex flex-wrap space-x-2 my-5">
              {tempColor.map(color => 
                <span key={color} 
                style={{backgroundColor: color}} 
                className="rounded-md text-white p-1 text-sm mb-1"
                
                >{color}</span>
              )}
            </div>
            {tempColor.length === 0 ? <ErrorMsg msg={errors.colors}/> : null}
            <div className="flex flex-wrap space-x-2 my-5">
              {renderCircleColors}
            </div>
            <div className="flex space-x-2">
              <Button className="bg-indigo-500 hover:bg-indigo-400 text-white"> Submit </Button>
              <Button className="bg-gray-400 hover:bg-gray-300 text-white" onClick={onCancel}> Cancel </Button>
            </div>
          </form>
        </Modal>


        {/* edit product */}
        <Modal isOpen={isOpenEdit} onClose={closeEditModal} title="Edit Product"> 
          <form className="space-y-3" onSubmit={onSubmitEditHandeler}>
            {renderProductToEditWithMsg('title', 'Product Title', 'title')}
            {renderProductToEditWithMsg('description', 'Product Description', 'description')}
            {renderProductToEditWithMsg('imageURL', 'Product ImageURL', 'imageURL')}
            {renderProductToEditWithMsg('price', 'Product Price', 'price')}

            <Select selected={productToEdit.category} setSelected={value => setProductToEdit({...productToEdit, category: value})}/>

            <div className="flex flex-wrap space-x-2 my-5">
              {tempColor.concat(productToEdit.colors).map(color => 
                <span key={color} 
                style={{backgroundColor: color}} 
                className="rounded-md text-white p-1 text-sm mb-1">{color}</span>
              )}
            </div>
            {tempColor.length === 0 ? <ErrorMsg msg={errors.colors}/> : null}
            <div className="flex flex-wrap space-x-2 my-5">
              {renderCircleColors}
            </div> 
            <div className="flex space-x-2">
              <Button className="bg-indigo-500 hover:bg-indigo-400 text-white"> Submit </Button>
              <Button className="bg-gray-400 hover:bg-gray-300 text-white" onClick={onCancel}> Cancel </Button>
            </div>
          </form>
        </Modal>

        {/* confirm modal */}
        {/* edit product */}
        <Modal 
          isOpen={isOpenConfirmModal} 
          onClose={closeConfirmModal} 
          title="Are You sure that you want remove this product ?"
        > 
            <div className="flex space-x-2">
              <Button className="bg-red-500 hover:bg-red-400 text-white" onClick={onRemoveHandler}> Yes, Remove </Button>
              <Button className="bg-gray-300 hover:bg-gray-400 text-white" onClick={closeConfirmModal}> Cancel </Button>
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
