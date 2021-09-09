export interface IShopItem {
	title: string;
	description: string;
	price: number;
	level: number;
	src: string;
}

export interface IShopList {
	category: string;
	array: IShopItem[];
}
