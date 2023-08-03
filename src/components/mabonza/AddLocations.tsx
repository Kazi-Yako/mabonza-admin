import React, { useEffect, useState } from 'react';
import {
	addLocationToFirestore,
	updateLocation,
} from '../../store/MabonzasSlice';
import { ILocation } from '../../types/mabonzaTypes';
import { useAppDispatch } from '../../store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
	locationToEdit: ILocation | null;
}

export const AddLocations: React.FC<Props> = (location) => {
	const dispatch = useAppDispatch();

	const options = ['Active', 'Not Active'];

	// add location states
	//const [id, setId] = useState(null);
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [activeFlag, setActiveFlag] = useState(options[0]);

	// update location states
	const [editedId, setEditedId] = useState('');
	const [editedCity, setEditedCity] = useState('');
	const [editedState, setEditedState] = useState('');
	const [editedCountry, setEditedCountry] = useState('');
	const [editedActiveFlag, setEditedActiveFlag] = useState(options[0]);

	// updating update location states
	useEffect(() => {
		if (location !== null && location.locationToEdit !== null) {
			setEditedId(location.locationToEdit.id ?? '');
			setEditedCity(location.locationToEdit.city);
			setEditedState(location.locationToEdit.state);
			setEditedCountry(location.locationToEdit.country);
			setEditedActiveFlag(location.locationToEdit.activeFlag);
		}
	}, [location]);

	// add location
	const handleAddLocation = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		let location: ILocation = {
			//id,
			city,
			state,
			country,
			activeFlag,
		};

		if (activeFlag === '') {
			toast('Please select Status');
			return;
		}

		// dispatch function
		dispatch(addLocationToFirestore(location));

		// clearing the form fields
		setCity('');
		setState('');
		setCountry('');
		setActiveFlag('');
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
		setActiveFlag(event.target.value);
	};

	// update the active flag value in the drop down
	const onChangeUpdate = (event: { target: { value: any } }) => {
		setEditedActiveFlag(event.target.value);
	};

	return (
		<>
			{location && location.locationToEdit === null ? (
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
					<select
						value={activeFlag}
						onChange={onChange}
						className="form-select"
					>
						{options.map((value) => (
							<option value={value} key={value}>
								{value}
							</option>
						))}
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
					<select
						value={editedActiveFlag}
						onChange={onChangeUpdate}
						className="form-select"
					>
						{options.map((value) => (
							<option value={value} key={value}>
								{value}
							</option>
						))}
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
