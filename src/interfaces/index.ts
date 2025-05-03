export interface Iproduct {
    id: string | undefined;
    title: string;
    price: string;
    description: string;
    imageURL: string;
    category: {
        name: string,
        imageURL: string,
    };
    colors: string[];
}

export interface IFormList {
    id: string;
    name: string;
    label: string;
    type: string
}