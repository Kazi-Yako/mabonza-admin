import { useState, ChangeEvent } from 'react';

export enum HairColor {
	Black = 'Your hair is black',
	Brown = 'Your hair is brown',
	Pink = 'Your hair is pink',
}

interface Props {
	name: string;
	age: number;
	email: string;
	hairColor: HairColor;
}

export function Person(props: Props) {
	const [country, setCountry] = useState<string | null>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCountry(event.target.value);
	};

	return (
		<div>
			<h1>{props.name}</h1>
			<h1>{props.email}</h1>
			<h1>{props.age}</h1>
			<input
				placeholder="Write down your country.."
				onChange={handleChange}
			/>

			{country}
			{props.hairColor}
		</div>
	);
}
