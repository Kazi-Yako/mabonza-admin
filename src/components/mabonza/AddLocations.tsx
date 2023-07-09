import React, { useEffect, useState } from 'react';
import {
	addLocationToFirestore,
	updateLocation,
} from '../../store/MabonzasSlice';
import { useDispatch } from 'react-redux';
import { ILocation } from '../../types/mabonzaTypes';
import { useAppDispatch } from '../../store';

interface Props {
	locationToEdit: ILocation | null;
}

export const AddLocations: React.FC<Props> = (location) => {
	const dispatch = useAppDispatch();

	// add location states
	const [id, setId] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [activeFlag, setActiveFlag] = useState(false);

	// update location states
	const [editedId, setEditedId] = useState('');
	const [editedCity, setEditedCity] = useState('');
	const [editedState, setEditedState] = useState('');
	const [editedCountry, setEditedCountry] = useState('');
	const [editedActiveFlag, setEditedActiveFlag] = useState(false);

	// updating update location states
	useEffect(() => {
		if (location !== null && location.locationToEdit !== null) {
			setEditedCity(location.locationToEdit.city);
			setEditedState(location.locationToEdit.state);
			setEditedCountry(location.locationToEdit.country);
			setEditedActiveFlag(location.locationToEdit.activeFlag);
		}
	}, [location]);

	// add location event
	const handleAddLocation = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		let location: ILocation = {
			id,
			city,
			state,
			country,
			activeFlag,
		};

		// dispatch function
		dispatch(addLocationToFirestore(location));

		// clearing form
		setCity('');
		setState('');
		setCountry('');
		setActiveFlag(false);
	};

	//update location
	const handleUpdateLocation = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let location: ILocation = {
			id: editedId,
			city: editedCity,
			state: editedState,
			country: editedCountry,
			activeFlag: editedActiveFlag,
		};
		dispatch(updateLocation(location));
	};

	// change the active flag value in the drop down
	const onChange = (event: { target: { value: any } }) => {
		const value = event.target.value;
		setActiveFlag(value);
	};

	// update the active flag value in the drop down
	const onChangeUpdate = (event: { target: { value: any } }) => {
		const value = event.target.value;
		setActiveFlag(value);
	};

	return (
		<>
			{location === null ? (
				<form
					className="form-group custom-form"
					onSubmit={handleAddLocation}
				>
					<label>City</label>
					<input
						className="form-control"
						required
						onChange={(e) => setCity(e.target.value)}
						value={city}
					/>
					<br />

					<label>State</label>
					<input
						className="form-control"
						required
						onChange={(e) => setState(e.target.value)}
						value={state}
					/>
					<br />

					<label>Country</label>
					<input
						className="form-control"
						required
						onChange={(e) => setCountry(e.target.value)}
						value={country}
					/>
					<br />

					<label>Status</label>
					<select onChange={onChange} className="form-select">
						<option value="Select Status" disabled />
						<option value="True">True</option>
						<option value="False">False</option>
					</select>
					<br />

					<button type="submit" className="btn btn-success">
						Add
					</button>
				</form>
			) : (
				<form
					className="form-group custom-form"
					onSubmit={handleUpdateLocation}
				>
					<label>City</label>
					<input
						className="form-control"
						required
						onChange={(e) => setCity(e.target.value)}
						value={editedCity}
					/>
					<br />

					<label>State</label>
					<input
						className="form-control"
						required
						onChange={(e) => setState(e.target.value)}
						value={editedState}
					/>
					<br />

					<label>Country</label>
					<input
						className="form-control"
						required
						onChange={(e) => setCountry(e.target.value)}
						value={editedCountry}
					/>
					<br />

					<label>Status</label>
					<select onChange={onChangeUpdate} className="form-select">
						<option value="Select Status" disabled />
						<option value="True">True</option>
						<option value="False">False</option>
					</select>
					<br />

					<button type="submit" className="btn btn-success">
						Update
					</button>
				</form>
			)}
		</>
	);
};
