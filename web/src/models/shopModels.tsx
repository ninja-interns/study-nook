import exampleBackground from "../assets/exampleBackground.jpg";
import pastelBookShelf from "../assets/pastelBookShelf.jpg";

export interface IShopItem {
	title: string;
	price: number;
	level: number;
	src: string;
}

export interface IShopList {
	category: string;
	array: IShopItem[];
}

export const ShopItemArray: IShopItem[] = [
	{ title: "Cool Orange", level: 3, price: 25, src: exampleBackground },
	{ title: "Minimalist", level: 4, price: 30, src: pastelBookShelf },
	{ title: "Cool Orange", level: 3, price: 25, src: exampleBackground },
	{ title: "Minimalist", level: 4, price: 30, src: pastelBookShelf },
];
