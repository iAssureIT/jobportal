const initialState = {
	bookingList : [1,2,3],
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false
}

const reducer = (state = initialState,action) => {
const newState = {...state};
	if(action.type === "FETCH_ROLEWISE_ACCESS"){
		newState.rolewiseAccessToModule 	= action.rolewiseAccessToModule;
	}
	if(action.type === "FETCH_ACCESS_FACILITY"){
		newState.accessToFacility 	= action.accessToFacility;
	}

	if(action.type === "BOOKING_LIST"){
		newState.bookingList = action.bookingList;
	}

return newState;
}

export default reducer;

