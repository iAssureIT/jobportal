const initialState = {
	openModal: false,
	message: "",
	messageType: "",
	tracking_id: "",
	longitude: "",
	latitude: "",
	user_id: "",
	selectedVehicle: "",
	tripdetilasinfo: "",
	fullName: "",
	mobile: "",
	bookingId: "",
	booking_Id: "",
	bookingid: "",
	employeeId: "",
	purposeofcar: "",
	status: "",
	vehicleCategoryId: "",
	token: "",
}

const reducer = (state = initialState, action) => {
	const newState = { ...state };
	console.log("action", action)
	if (action.type === "MODAL") {
		newState.openModal = action.openModal;
		newState.messageHead = action.messageHead;
		newState.messagesSubHead = action.messagesSubHead;
		newState.messageType = action.messageType;
	}
	if (action.type === "SET_USER_ID") {
		newState.user_id = action.user_id;
	}
	if (action.type === "SELECTED_VEHICLE") {
		newState.selectedVehicle = action.selectedVehicle;
		newState.vehicleCategoryId = action.vehicleCategoryId;
	}
	if (action.type === "TRACKING_ID") {
		newState.tracking_id = action.tracking_id;
	}
	if (action.type === "BOOKING_DETAILS") {
		newState.booking_Id = action.booking_Id;
		newState.status = action.status;
	}
	if (action.type === "MANAGER_BOOKING_DETAILS") {
		newState.bookingid = action.bookingid;
	}
	if (action.type === "BASIC_INFO_RECEIPT") {
		newState.fullName = action.fullName;
		newState.employeeId = action.employeeId;
		newState.mobile = action.mobile;
		newState.bookingId = action.bookingId;
	}
	if (action.type === "SET_STARTING_COORDINATES") {
		newState.tracking_id = action.tracking_id;
		newState.longitude = action.longitude;
		newState.latitude = action.latitude;
	}
	if (action.type === "SET_SECURITY_DETAILS") {
		newState.user_id = action.user_id;
		newState.token = action.token;
	}
	return newState;
}

export default reducer;