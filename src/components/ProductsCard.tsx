import { Iproduct } from "../interfaces";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: Iproduct;
}

const ProductsCard = ({product}: IProps) => {
    const {title, imageURL, price, description} = product
    return (
        <>
            <div className="flex flex-col border border-gray-200 rounded-md p-2">
                <Image imageUrl={imageURL}
                        className="rounded-md w-50 h-50 object-center"
                        alt="Green Image"
                />
                <h2>{title}</h2>
                <p>{description}</p>

                <div className="flex space-x-2 my-5">
                    <span className="w-5 h-5 bg-indigo-500 rounded-full cursor-pointer" />
                    <span className="w-5 h-5 bg-black rounded-full cursor-pointer" />
                    <span className="w-5 h-5 bg-red-500 rounded-full cursor-pointer" />
                </div>

                <div className="flex items-center justify-between">
                    <span>${price}</span>
                    <Image imageUrl={imageURL}
                        className="rounded-full w-10 h-10 object-contain"
                        alt="Green Image"
                    />
                </div>
                <div className="mt-5 flex space-x-2">
                    <Button className="bg-indigo-600" width="w-full" onClick={() => {console.log('Clicked!')}}>EDIT</Button>
                    <Button className="bg-red-600" width="w-full">DELETE</Button>
                </div>
            </div>
        </>
    )
}

export default ProductsCard;