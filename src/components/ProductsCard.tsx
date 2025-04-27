import Image from "./Image";

interface IProps {

}

const ProductsCard = ({}: IProps) => {
    return (
        <>
            <div className="flex flex-col border border-gray-200 rounded-md p-2">
                <Image imageUrl="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                        className="rounded-md"
                        alt="Green Image"
                />
                <h2>Green Image</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, tempora!</p>

                <div className="flex space-x-2 my-5">
                    <span className="w-5 h-5 bg-indigo-500 rounded-full cursor-pointer" />
                    <span className="w-5 h-5 bg-black rounded-full cursor-pointer" />
                    <span className="w-5 h-5 bg-red-500 rounded-full cursor-pointer" />
                </div>

                <div className="flex items-center justify-between">
                    <span>$500,000</span>
                    <Image imageUrl="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                        className="rounded-full w-10 h-10 object-contain"
                        alt="Green Image"
                    />
                </div>
                <div className="mt-5 flex space-x-2">
                    <button className="w-full p-2 text-white rounded-md cursor-pointer bg-indigo-600">EDIT</button>
                    <button className="w-full p-2 text-white rounded-md cursor-pointerinter bg-red-600">DELETE</button>
                </div>
            </div>
        </>
    )
}

export default ProductsCard;