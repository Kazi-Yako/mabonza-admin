import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteAllLocations,
	deleteLocation,
	fetchLocations,
} from '../../store/MabonzasSlice';
import Icon from 'react-icons-kit';
import { basic_trashcan_remove } from 'react-icons-kit/linea/basic_trashcan_remove';
import { software_pencil } from 'react-icons-kit/linea/software_pencil';
import { ILocation } from '../../types/mabonzaTypes';
import { RootState, useAppDispatch, useAppSelector } from '../../store';

interface Props {
	handleEditIcon: (x: ILocation) => void;
	locationToEdit: ILocation | null;
	cancelUpdate: () => void;
}

export const ViewLocations: React.FC<Props> = ({
	handleEditIcon,
	locationToEdit,
	cancelUpdate,
}) => {
	const dispatch = useAppDispatch();

	const data = useAppSelector((state: RootState) => state.mabonzas.locations);

	// fetch locations
	useEffect(() => {
		dispatch(fetchLocations());
	}, [dispatch]);

	// delete location
	const handleDelete = (id: string) => {
		dispatch(deleteLocation(id));
	};

	// delete all books
	const deleteAll = () => {
		dispatch(deleteAllLocations());
	};

	return (
		<div className="view-books">
			{data.length > 0 ? (
				<>
					{data.map((newLocation: ILocation) => (
						<div className="book" key={newLocation.id}>
							<div className="content">
								<h6>
									{newLocation.city} ,{newLocation.state},
									{newLocation.activeFlag}
								</h6>
								<span>
									<div id={newLocation.country}></div>
								</span>
							</div>

							<div className="actions">
								<span
									className="icon red"
									onClick={() => handleDelete(newLocation.id)}
								>
									<Icon
										icon={basic_trashcan_remove}
										size={22}
									/>
								</span>
								<span
									className="icon blue"
									onClick={() => handleEditIcon(newLocation)}
								>
									<Icon icon={software_pencil} size={22} />
								</span>
							</div>
						</div>
					))}
					{locationToEdit === null ? (
						<>
							{data.length > 1 && (
								<button
									className="btn btn-danger"
									onClick={deleteAll}
								>
									Delete All
								</button>
							)}
						</>
					) : (
						<button
							className="btn btn-danger"
							onClick={cancelUpdate}
						>
							Cancel Update
						</button>
					)}
				</>
			) : (
				<div>There are no locations added yet!</div>
			)}
		</div>
	);
};
