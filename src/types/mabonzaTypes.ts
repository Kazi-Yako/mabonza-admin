export interface MabonzaState {
	churches: IChurch[];
	locations: ILocation[];
	loading: boolean;
	error: boolean;
}

export interface IChurch {
	id?: string;
	activeFlag: boolean;
	address: string;
	city: string;
	country: string;
	name: string;
	pastor: string;
	phone: string;
	pictureUrl: string;
	state: string;
	zipCode: string;
}

export interface ILocation {
	id: string;
	activeFlag: boolean;
	city: string;
	country: string;
	state: string;
}
