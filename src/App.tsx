import './index.css';
import { AddLocations } from './components/mabonza/AddLocations';
import { ViewLocations } from './components/mabonza/ViewLocations';
import { useState } from 'react';
import { ILocation } from './types/mabonzaTypes';

function App() {
	const [locationToEdit, setLocationToEdit] = useState<ILocation | null>(
		null
	);

	const handleEditIcon = (location: ILocation) => {
		setLocationToEdit(location);
	};

	const cancelUpdate = () => {
		setLocationToEdit(null);
	};

	return (
		<div className="wrapper">
			<h1> Mabonza Admin</h1>
			<div className="add-and-view-books">
				<AddLocations locationToEdit={locationToEdit} />
				<ViewLocations
					handleEditIcon={handleEditIcon}
					locationToEdit={locationToEdit}
					cancelUpdate={cancelUpdate}
				/>
			</div>
		</div>
	);
}

export default App;
