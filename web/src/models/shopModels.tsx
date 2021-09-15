export interface IShopItem {
	id?: string;
	category?: string;
	name: string;
	cost: number;
	level: number;
	src: string;
}

export interface IShopList {
	category: string;
	shopArray: IShopItem[] | null;
	invArray: IInventoryItem[] | null;
}

export interface IInventoryList {
	category: string;
	array: IInventoryItem[] | null;
}

export interface IInventoryItem {
	id?: string;
	shopitemid?: string;
	userid?: string;
	category: string;
	name: string;
	level: number;
	src: string;
}
