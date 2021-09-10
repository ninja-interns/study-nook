export interface IShopItem {
	id?: string;
	category?: string;
	name: string;
	cost: number;
	level: number;
	src: "base64";
}

export interface IShopList {
	category: string;
	array: IShopItem[] | null;
}
