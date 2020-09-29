const express 	= require("express");
const router 	= express.Router();
const checkAuth = require('../middlerware/check-auth.js');

const bookingMaster = require('./ControllerBookingMaster.js');

router.post('/post', bookingMaster.insertBooking);
router.post('/get/list', bookingMaster.fetchBookings);
router.post('/get/getBookingList', bookingMaster.getAdminBookingList);
router.post('/get/getcorporateBookingList', bookingMaster.getcorporateBookingList);
router.post('/getStatistics', bookingMaster.getStatistics);
router.get('/get/allList', bookingMaster.getAllBookings);
router.post('/get/getAllBookingListForGenerateBill', bookingMaster.getAllBookingListForGenerateBill);
router.get('/get/allListForAdmin', bookingMaster.getAllBookingsForAdmin);
router.get('/get/getBookingsByStatus/:status', bookingMaster.getBookings_By_status);
router.get('/get/getAllBookingsByStatus/:status', bookingMaster.getAllBookingsForAdmin_ByStatus);
router.post('/get/bookingList', bookingMaster.getBookings_User_status);
router.get('/get/count/:createdBy', bookingMaster.countBookings);
router.get('/get/countOfAllBookings', bookingMaster.countAllBookings);
router.get('/get/count/approvalReqBooking/:managerId', bookingMaster.countApprovalReqBookings);
router.get('/get/getAllApprovedBookings/:managerId', bookingMaster.getAllApprovedBookings);
router.get('/get/getAllRejectedBookings/:managerId', bookingMaster.getAllRejectedBookings);
router.get('/get/booking/:bookingID', bookingMaster.getBookingByID);
router.get('/get/AllocateToVendor/:bookingID/:city/:district/:user', bookingMaster.AllocateToVendor);
router.get('/get/bookingData/:bookingID', bookingMaster.getBookingByID_empDetails);
router.get('/get/getBookingsOfUser/:userID', bookingMaster.getBookings_User);
router.get('/get/getSingleBookingListForGenerateBill/:id', bookingMaster.getSingleBookingListForGenerateBill);
router.get('/get/allBooking/:managerId', bookingMaster.getAllApprovalReqBookings);
router.post('/get/allBookingForManager', bookingMaster.getAllBookingsForManager);
router.post('/get/allCRBookingForManager', bookingMaster.getAllCRBookingsForManager);
router.post('/get/allCRBookingForAdmin', bookingMaster.getAllCRBookingsForAdmin);
router.patch('/patch', bookingMaster.updateBooking);
router.delete('/delete/:bookingID', bookingMaster.deleteBooking);
router.get('/get/matchStatus/:bookingID',bookingMaster.matchBookingStatus);
router.get('/get/matchCRStatus/:bookingID',bookingMaster.matchCRBookingStatus);
router.get('/get/vendor/:bookingID',bookingMaster.getVendorDetail_ByBookingID);
router.get('/get/manager/:bookingID/:status',bookingMaster.managerDetail_ByID);
router.post('/bulkUploadbooking',bookingMaster.bulkUploadBooking);
router.get('/get/filedetails/:fileName', bookingMaster.filedetails);
router.post('/get/filter',bookingMaster.filterBookings);
router.post('/getparameterdata',bookingMaster.getparameterdata);
router.post('/get/AdminBookingfilter',bookingMaster.getAdminfilterBookings);
router.post('/get/corporateBookingfilter',bookingMaster.getcorporatefilterBookings);
router.get('/get/getManagerBookingStatus/:bookingID',bookingMaster.getManagerBookingStatus);
router.post('/get/getAdminSearchBookings',bookingMaster.getAdminSearchBookings);
router.post('/get/getcorporateSearchBookings',bookingMaster.getcorporateSearchBookings);
router.get('/get/countDateRangeBookings/:startDate/:endDate',bookingMaster.countDateRangeBookings);
router.get('/get/countCorporateDateRangeBookings/:startDate/:endDate/:company',bookingMaster.countCorporateDateRangeBookings);
router.get('/get/countUserDateRangeBookings/:startDate/:endDate/:company/:user',bookingMaster.countUserDateRangeBookings);
router.get('/get/countCorporateApprovalDateRangeBookings/:startDate/:endDate/:company/:user/:status',bookingMaster.countCorporateApprovalDateRangeBookings);
router.get('/get/TravelCount/:startDate/:endDate/:company/:type',bookingMaster.TravelCount);
router.get('/get/categorywiseBooking/:startDate/:endDate',bookingMaster.categorywiseBooking);
router.get('/get/categorywiseBookingForVendor/:startDate/:endDate/:company',bookingMaster.categorywiseBooking_vendor);
router.get('/get/corporatewiseBooking/:startDate/:endDate',bookingMaster.corporatewiseBooking);
router.get('/get/corporatewiseBookingForvendor/:startDate/:endDate/:company',bookingMaster.corporatewiseBooking_vendor);
router.get('/get/monthwiseBooking/:startDate/:endDate',bookingMaster.monthwiseBooking);
router.get('/get/latestAllocatedToVendorBookings',bookingMaster.latestAllocatedToVendorBookings);
router.get('/get/latestReadyToBillBookings',bookingMaster.latestReadyToBillBookings);
router.get('/get/getCompanyMonthwiseBooking/:startDate/:endDate/:company',bookingMaster.getCompanyMonthwiseBooking);
router.get('/get/getUserMonthwiseBooking/:startDate/:endDate/:company/:user',bookingMaster.getUserMonthwiseBooking);
router.get('/get/getCompanyMonthlyBooking/:startDate/:endDate/:company',bookingMaster.CompanyMonthlyBooking);
router.get('/get/getUserMonthlyBooking/:startDate/:endDate/:company/:user',bookingMaster.UserMonthlyBooking);
router.get('/get/EmployeeTravelled_Company/:company',bookingMaster.EmployeeTravelled_Company);
router.get('/get/LatestbookingListForVendor/:startDate/:endDate/:company',bookingMaster.LatestbookingListForVendor);
router.get('/get/RejectedByDriverBookings/:startDate/:endDate/:company',bookingMaster.RejectedByDriverBookings);
router.get('/get/countbookingListForVendor/:startDate/:endDate/:company',bookingMaster.countbookingListForVendor);
router.get('/get/getCancelledbookingCountForVendor/:startDate/:endDate/:company',bookingMaster.getCancelledbookingCountForVendor);
router.get('/get/getAcceptedbookingCountForVendor/:startDate/:endDate/:company',bookingMaster.getAcceptedbookingCountForVendor);
router.get('/get/pendingStatusCount/:status/:company/:manager',bookingMaster.pendingStatusCount);
router.get('/get/getDriverUnassigned/:company',bookingMaster.getDriverUnassigned);
router.get('/get/getPendingTrip/:status/:company',bookingMaster.getPendingTrip);
router.get('/get/getCurrentTripEvent/:status/:company',bookingMaster.getCurrentTripEvent);
router.get('/get/EmployeePendingApprovalCount/:status/:company/:user',bookingMaster.EmployeePendingApprovalCount);
router.get('/get/EmployeeUpcomingTripCount/:company/:user',bookingMaster.EmployeeUpcomingTripCount);
router.get('/get/EmployeeRecentBookings/:company/:user',bookingMaster.EmployeeRecentBookings);
router.patch('/allPastBookings',bookingMaster.cancelAllPastBookings);
router.patch('/updatetripexpenses',bookingMaster.update_trip_expenses);
router.patch('/updateCancelStatus',bookingMaster.updateCancelStatus);


//Driver App API  - Rushikesh Salunkhe
router.get('/get/list/:status/:personId', bookingMaster.getBookings);

router.get('/get/one/bookingfordriver/:bookingID', bookingMaster.singleBookingForDriver);

router.patch('/patch/status', bookingMaster.updateStatus);

router.patch('/patch/change_driver', bookingMaster.changeDriver);

router.get('/get/status/:bookingID', bookingMaster.getStatus);

router.patch('/patch/tripExpenses', bookingMaster.insert_trip_expenses);

router.patch('/patch/ratingToPassenger', bookingMaster.ratingToPassenger);

router.patch('/patch/updateRouteCoordinates', bookingMaster.update_routeCoordinates);

router.get('/get/routeCoordinates/:booking_id', bookingMaster.get_routeCoordinates);

router.post('/post/trip_otp_verification', bookingMaster.trip_otp_verification);

router.post('/post/start_trip', bookingMaster.start_trip);

router.post('/post/send_push_notification', bookingMaster.send_push_notification);

//Vendor APP API - Rushikesh Salunkhe
router.post('/post/bookingListForVendor', bookingMaster.getbookingListForVendor);

router.get('/get/one/bookingforvendor/:bookingID', bookingMaster.singleBookingForVendor);

router.patch('/patch/change_vehicle', bookingMaster.changeVehicle);

/*Filtered Bookings for Billing*/
router.post('/get/filteredBookingList', bookingMaster.getFilteredBookingList);

module.exports = router;