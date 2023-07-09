import { createSlice } from '@reduxjs/toolkit';
import db from '../firebase/config';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILocation, MabonzaState } from '../types/mabonzaTypes';
import { SetStateAction } from 'react';

const initialState: MabonzaState = {
	churches: [],
	locations: [],
	loading: false,
	error: false,
};

// add location to firestore
export const addLocationToFirestore = createAsyncThunk(
	'locations/addLocationToFirestore',
	async (location: ILocation) => {
		const addLocationRef = await addDoc(collection(db, 'locations'), {
			location,
		});
		const newLocation = { id: addLocationRef.id, location };
		return newLocation;
	}
);

// fetch locations
export const fetchLocations = createAsyncThunk<{ locations: ILocation[] }>(
	'locations/fetchLocations',
	async () => {
		const querySnapshot = await getDocs(collection(db, 'locations'));

		const locationResults: SetStateAction<ILocation[]> = [];

		if (querySnapshot != null) {
			querySnapshot.forEach((documentSnapshot) => {
				const { activeFlag, city, country, state } =
					documentSnapshot.data();

				locationResults.push({
					id: documentSnapshot.id,
					activeFlag,
					city,
					country,
					state,
				});
			});
		}

		// const locations = querySnapshot.docs.map((doc) => ({
		// 	id: doc.id,
		// 	location: doc.data(),
		// }));

		return {
			locations: locationResults,
		};
	}
);

// delete book
export const deleteLocation = createAsyncThunk(
	'locations/deleteLocation',
	async (id: string) => {
		const locations = await getDocs(collection(db, 'locations'));
		for (var snap of locations.docs) {
			if (snap.id === id) {
				await deleteDoc(doc(db, 'locations', snap.id));
			}
		}
		return id;
	}
);

// delete all books
export const deleteAllLocations = createAsyncThunk(
	'locations/deleteAllLocations',
	async () => {
		const locations = await getDocs(collection(db, 'locations'));
		for (var snap of locations.docs) {
			await deleteDoc(doc(db, 'Books', snap.id));
		}
		return [];
	}
);

// update location
export const updateLocation = createAsyncThunk(
	'locations/updateLocation',
	async (editedLocation: ILocation) => {
		const locations = await getDocs(collection(db, 'locations'));
		for (var snap of locations.docs) {
			if (snap.id === editedLocation.id) {
				const locationRef = doc(db, 'locations', snap.id);
				await updateDoc(locationRef, { editedLocation });
			}
		}
		return editedLocation;
	}
);

const mabonzasSlice = createSlice({
	name: 'mabonzas',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLocations.fulfilled, (state, action) => {
				state.locations.concat(action.payload.locations);
			})
			.addCase(fetchLocations.rejected, (state) => {
				state.error = true;
				state.loading = false;
			})
			.addCase(addLocationToFirestore.fulfilled, (state, action) => {
				state.locations.push(action.payload.location);
			})
			.addCase(addLocationToFirestore.rejected, (state, action) => {
				state.error = true;
				state.loading = false;
			})
			.addCase(deleteLocation.fulfilled, (state, action) => {
				state.locations = state.locations.filter(
					(location) => location.id !== action.payload
				);
			})
			.addCase(deleteAllLocations.fulfilled, (state, action) => {
				state.locations = action.payload;
			})
			.addCase(updateLocation.fulfilled, (s, action) => {
				const { id, city, state, country, activeFlag } = action.payload;
				const locationIndex = s.locations.findIndex(
					(location) => location.id === location.id
				);
				if (locationIndex !== -1) {
					s.locations[locationIndex] = {
						id: id,
						city,
						state,
						country,
						activeFlag,
					};
				}
			});
	},
});

export default mabonzasSlice.reducer;
