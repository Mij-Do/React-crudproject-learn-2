interface IProps {
    colors: string;
}

const CircleColors = ({ colors }: IProps) => {
    return <span className="w-5 h-5 rounded-full cursor-pointer" style={{backgroundColor: colors}} />
}

export default CircleColors;