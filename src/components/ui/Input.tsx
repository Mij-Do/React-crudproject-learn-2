import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {

}

const Input = ({...rest}: IProps) => {
    return (
        <input {...rest}/>
    )
}

export default Input;