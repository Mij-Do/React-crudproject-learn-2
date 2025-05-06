import { Iproduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import CircleColors from "./CircleColors";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: Iproduct;
}

const ProductsCard = ({product}: IProps) => {
    const {title, imageURL, price, description, colors,category} = product;

    const renderCircleColors = colors.map(colors => 
        <CircleColors 
            key={colors} 
            colors={colors} />);
    return (
        <>
            <div className="flex flex-col justify-between max-w-sm mx-auto md:max-w-lg border border-gray-200 rounded-md p-2">
                <Image imageURL={imageURL}
                        className="rounded-md w-50 h-50 object-center mx-auto"
                        alt={category.name}
                />
                <h2>{title}</h2>
                <p>{txtSlicer(description)}</p>
                
                <div className="flex flex-wrap space-x-2 my-5">
                    {renderCircleColors}
                </div>

                <div className="flex items-center justify-between">
                    <span>${price}</span>
                    <Image imageURL={imageURL}
                        className="rounded-full w-10 h-10 object-contain"
                        alt={category.name}
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