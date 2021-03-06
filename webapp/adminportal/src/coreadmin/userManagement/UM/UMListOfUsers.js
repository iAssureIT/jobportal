import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import swal from 'sweetalert';
import $ from 'jquery';
import moment from 'moment';
import CreateUser from './CreateUser.js';
import IAssureTableUM from '../../IAssureTableUM/IAssureTable.jsx';
import UMDelRolRow from './UMDelRolRow.jsx';
import UMAddRolRow from './UMAddRolRow.jsx';
import UMSelectRoleUsers from './UMSelectRoleUsers.jsx';
import './userManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';

class UMListOfUsers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allPosts: [],
			"twoLevelHeader": {
				apply: false,
			},
			"tableHeading": {
				fullName: 'User Details',
				companyDetails: 'Company Details',
				status: 'Status',

				roles: 'Role',
				createdAt: 'Registered Since',
				lastLogin: "Last Login",
				actions: 'Actions',
			},
			"tableObjects": {
				paginationArray: true
			},
			"selector" : {},
			"startRange": 0,
			"limitRange": 20,
			blockActive: "all",
			"listofRoles": "",
			adminRolesListData: [],
			checkedUser: [],
			activeswal: false,
			blockswal: false,
			Role: "",
			Status: "",
			Company: "",
			confirmDel: false,
			unCheckedUser: false,
			userTableData :"",
			username : ""
		}
		this.handleChange = this.handleChange.bind(this);

	}
	handleChange(event) {
		event.preventDefault();
		const target = event.target;
		const name = target.name;
	}
	componentWillReceiveProps(nextProps) {
			var data = {
				"startRange": nextProps.startRange,
				"limitRange": nextProps.limitRange,
				"companyID": nextProps.companyID
			}
			this.getData(data);
			console.log("data in componentWillReceiveProps= ",data);
	}

	componentDidMount() {
		const user_ID = localStorage.getItem("user_ID");
		var userDetails = localStorage.getItem('userDetails');
		var userData = JSON.parse(userDetails);
		console.log("userData = ", userData);
		const companyID = userData.companyID;
		const firstname = userData.firstName;
		const lastname = userData.lastName;
		// console.log("firstname ",firstname,lastname);
		var username = firstname + " " +lastname;
		this.setState({
			user_ID: user_ID,
			companyID: companyID,
			username : username
		}, () => {
			var data = {
				"startRange": 0,
				"limitRange": 10,
				"companyID": parseInt(this.state.companyID)
			}
			this.getData(data);
			console.log("In componentDidMount =>", data);
			this.getRole();
			this.getCompanies();
		})
	}
		getData(data) {
		axios.post('/api/users/post/list', data)
			.then((res) => {
				// console.log("res.data in getdata==>", res.data);
				if (res.data.message == "COMPANYID_NOT_AVAILABLE") {
					swal({
						title: '',
						text: "Company Id not found.",
					});
				} else {
					var tableData = res.data.filter((data, i) => {
						return (data.status !== 'deleted-active' && data.status !== 'deleted-blocked' && data.status !== 'deleted');
					});
					var tableData = tableData.map((a, i) => {
						// console.log('tableData A==>>>', a.lastLogin);
						return {
							_id: a._id,
							fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b>' + a.fullName + '</b>' +
								'<p><i class="fa fa-envelope"></i> ' +( a.email  ?  a.email :"-" )+ '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
							companyDetails: a.companyName == undefined || "" ? "-" : a.companyName + ' | ' + a.companyID,
							status: a.status === "active" ? '<span class="label label-success statusLabel">' + a.status + '</span>' : '<span class="label label-default statusLabel">' + a.status + "</span>",
							// roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
							roles:  a.role == undefined || "" || null ? "-" : a.role.map((b, j) => b ).toString(),
							createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(true),
							lastLogin:
								a.lastLogin === null
									?
									// "User Not Yet Login"
									'<p class="btn" style="font-size:13px;" title="Login Details">User not logged in yet</p>'

									:
									moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'

							// moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.myfunc() data-target=#userDetails-'+a._id+
							// ' title="Show Booking">User Login Details</div>': "-",
						}

					})

					console.log("tableData",tableData)
					this.setState({
						completeDataCount: res.data.length,
						tableData: tableData,
					})
				}
			})
			.catch((error) => {
			});
	}

	getSearchText(searchTextTable, startRange, limitRange,selector) {

		
		if (searchTextTable && searchTextTable.length !== 0) {
			var selector = {};
				 if(this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --"){
				      selector.status  = this.refs.blockActive.value; 
				  }

				  if(this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --"){
				      selector.role  = this.refs.roleListDropdown.value; 
				  }
				  if(this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --"){
				      selector.company  = this.refs.companyDropdown.value; 
				  }
				 
				  
				  if(searchTextTable){
				      selector.search  = searchTextTable; 
				  }

				  selector.companyID = parseInt(this.state.companyID);
				  selector.startRange= startRange;
				  selector.limitRange= limitRange;


			console.log("selector",selector);

			axios.post('/api/users/get/searchfilterwise', selector)
				.then((res) => {
							var tableData = res.data.filter((data, i) => {
								return (data.status !== 'deleted-active' && data.status !== 'deleted-blocked' && data.status !== 'deleted');
							});

							var tableData = res.data.map((a, i) => {
								return {
									_id: a._id,
									fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b ondblclick=window.doubleclickonname("' + a._id +'")> ' + a.fullName + '</b>' +
										'<p><i class="fa fa-envelope"></i> ' +(a.email?a.email:"-") + '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
									companyDetails: a.companyName == undefined || "" ? "-" : '<a ondblclick=window.doubleclickonCompany("' + a.companyID +'")> ' + a.companyName  + '</a>'+ ' | ' + a.companyID,
									
									status: a.status === "active" ? '<span class="label label-success statusLabel">' + a.status + '</span>' : '<span class="label label-default statusLabel">' + a.status + "</span>",

									roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
									createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(),
									lastLogin: a.lastLogin === null
												?
												'<p style="font-size:13px;" title="Login Details">User not logged in yet</p>'
												:
												// moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
												moment(a.lastLogin).format("ddd, MMM DD, YY HH:mm") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
								}
							})
							this.setState({
								completeDataCount: res.data.length,
								tableData: tableData,
							})

					/*}*/
				})
				.catch((error) => {
				})

			this.setState({
				tableData: []
			});
		} else {
			this.setState({
				tableHeading: this.state.tableHeading,
				tableData: this.state.tableData,
				completeDataCount: this.state.completeDataCount
			})
		}
	}

	Range(limitRange){
		console.log("limitRange in Range fun",limitRange);
		this.setState({
				limitRange :limitRange
			});
		if (this.refs.roleListDropdown.value == "-- Select --"  && this.refs.companyDropdown.value == "-- Select --"  &&   this.refs.blockActive.value == "-- Select --" ) {
				var data = {
					"startRange": this.state.startRange,
					"limitRange": limitRange,
					"companyID": parseInt(this.state.companyID)
				}
				this.getData(data)
		}else{
			this.setState({
				limitRange :limitRange
			},()=>{
				// this.selectedRole(event);
				// this.selectedStatus(event);
				// this.selectedCompnay(event);
			});

		}

	}
	activeSelected(checkedUsersList) {
		var username = this.state.username;
		function updateStatus(formValues) {
			return new Promise(function (resolve, reject) {
				axios
					.patch('/api/users/patch/status/' + formValues.selectedUser, formValues)
					.then((response) => {
						resolve(response);
					})
					.catch(function (error) {
					})
			})
		}
		function getUserDetails(selectedId) {
			return new Promise(function (resolve, reject) {
				axios
					.get('/api/users/get/' + selectedId)
					.then((response) => {
						resolve(response);
						// console.log("es========",response);

						
					})
					.catch(function (error) {
					})
			})
		}

		mainActive().then(response => {
			if (response) {
				this.setState({
					activeswal: true,
					checkedUser: [],
					unCheckedUser: true
				}, () => {
					$('#userListDropdownId').removeAttr('disabled');
					this.refs.userListDropdown.value = '-'
					var data = {
						"startRange": this.state.startRange,
						"limitRange": this.state.limitRange,
						"companyID": this.state.companyID
					}
					this.getData(data)
					checkedUsersList = [];
					if (this.state.activeswal == true) {
						swal(" ", "Account activated successfully");
					}
				});
			}
		});
		async function mainActive() {
			var count = 0
			for (var i = 0; i < checkedUsersList.length; i++) {
				var selectedId = checkedUsersList[i];

				var formValues = {
					selectedUser: selectedId,
					status: 'active',
					username: username,
				}
				var previousStatus = await getUserDetails(selectedId)
				if (previousStatus.data.status === 'active') {
					swal(" ", "Already Status is active");
					$('#userListDropdownId').removeAttr('disabled');
				} else {
					var response = await updateStatus(formValues)
					if (response) {
						var user = await getUserDetails(selectedId)
						if (user) {
							var currentUrl = window.location.hostname
							var url = currentUrl === 'localhost' ? 'http://localhost:3001/' : currentUrl === 'qalmiscentre.iassureit.com' ? 'http://qalmiscentre.iassureit.com/' : 'http://uatlmiscenter.iassureit.com/'
							var msgvariable = {
								'[User]': user.data.firstname + ' ' + user.data.lastname,
								'[user_email_id]': user.data.email,
								'[center_application_URL]': url
							}
							var inputObj = {
								to: user.data.email,
								templateName: 'User - Login Account Activation',
								variables: msgvariable,
							}
							while ((checkedUsersList.length - 1) === i) {
								return Promise.resolve(true);
							}

						}
					}
				}
			}
		}
	}
	blockSelected(checkedUsersList) {
		var username = this.state.username;
		// console.log('checkedUsersList', checkedUsersList);
		function updateStatus(formValues) {
			return new Promise(function (resolve, reject) {
				axios
					.patch('/api/users/patch/status/' + formValues.selectedUser, formValues)
					.then((response) => {
						resolve(response);
					})
					.catch(function (error) {
					})
			})
		}
		function getUserDetails(selectedId) {
			return new Promise(function (resolve, reject) {
				axios
					.get('/api/users/get/' + selectedId)
					.then((response) => {
						resolve(response);
					})
					.catch(function (error) {
					})
			})
		}
		function sendMail(inputObj) {
			return new Promise(function (resolve, reject) {
				axios
					.post('/api/masternotification/send-mail', inputObj)
					.then((response) => {
						resolve(response);
					})
					.catch(function (error) {
					})
			})
		}
		mainBlock().then(response => {
			console.log('res', response);
			if (response) {
				this.setState({
					blockswal: true,
					checkedUser: [],
					unCheckedUser: true
				}, () => {
					$('#userListDropdownId').removeAttr('disabled');
					this.refs.userListDropdown.value = '-'
					var data = {
						"startRange": this.state.startRange,
						"limitRange": this.state.limitRange,
						"companyID": this.state.companyID
					}
					this.getData(data)
					checkedUsersList = []
					if (this.state.blockswal === true) {
						swal(" ", "Account blocked successfully");
					}
				})
			}
			//here you can update your collection with axios call
		});
		async function mainBlock() {
			var count = 0
			for (var i = 0; i < checkedUsersList.length; i++) {
				var selectedId = checkedUsersList[i];
				var formValues = {
					selectedUser: selectedId,
					status: 'blocked',
					username: username,
				}
				var previousStatus = await getUserDetails(selectedId)
				if (previousStatus.data.status === 'blocked') {
					swal(" ", "Already Status is blocked");
					$('#userListDropdownId').removeAttr('disabled');
				} else {
					var response = await updateStatus(formValues);
					if (response) {
						var user = await getUserDetails(selectedId);
						if (user) {
							var msgvariable = {
								'[User]': user.data.firstname + ' ' + user.data.lastname,
								'[user_email_id]': user.data.email
							}
							var inputObj = {
								to: user.data.email,
								templateName: 'User - Login Account Blocked',
								variables: msgvariable,
							}
							while ((checkedUsersList.length - 1) === i) {
								return Promise.resolve(true);
							}
						}
					}
				}
			}
		}
	}
	deleteStatusSelected(checkedUsersList) {
		console.log('checkedUsersList', checkedUsersList);
		var username = this.state.username;
		var status = this.state.status;
		function updateStatus(formValues) {
			return new Promise(function (resolve, reject) {
				axios
					.patch('/api/users/patch/deletestatus', formValues)
					.then((response) => {
						console.log("response in delete status==>", response.data)
						resolve(response);
					})
					.catch(function (error) {
					})
			})
		}
		function getUserDetails(selectedId) {
			return new Promise(function (resolve, reject) {

				axios
					.get('/api/users/get/' + selectedId)
					.then((response) => {
						// console.log("response in delete user==>", response.data)
						resolve(response);
					})
					.catch(function (error) { })
			})
		}
		mainBlock().then(response => {
			// console.log('res', response);
			if (response) {
				this.setState({
					blockswal: true,
					checkedUser: [],
					unCheckedUser: true
				}, () => {
					$('#userListDropdownId').removeAttr('disabled');
					this.refs.userListDropdown.value = '-'
					var data = {
						"startRange": this.state.startRange,
						"limitRange": this.state.limitRange,
						"companyID": this.state.companyID
					}
					this.getData(data)
					checkedUsersList = []
					if (this.state.blockswal === true) {
						swal(" ", "Account deleted successfully");
					}
				})
			}
			//here you can update your collection with axios call
		});
		async function mainBlock() {

			var count = 0
			for (var i = 0; i < checkedUsersList.length; i++) {
				var selectedId = checkedUsersList[i];
				// console.log("selectedId sss===>", selectedId);
				var formValues = {
					user_id_tobedeleted: selectedId,
					updatedBy: username,
				}
				console.log("formValues in delete===>", formValues);
				var previousStatus = await getUserDetails(selectedId)
				if (previousStatus.data.status === 'deleted') {
					swal(" ", "Already Status is deleted");
					$('#userListDropdownId').removeAttr('disabled');
				} else {
					var response = await updateStatus(formValues);
					if (response) {
						var user = await getUserDetails(selectedId);
						if (user) {
							var msgvariable = {
								'[User]': user.data.firstname + ' ' + user.data.lastname,
								'[user_email_id]': user.data.email
							}
							var inputObj = {
								to: user.data.email,
								templateName: 'User - Login Account Deleted',
								variables: msgvariable,
							}
							while ((checkedUsersList.length - 1) === i) {
								return Promise.resolve(true);
							}
						}
					}
				}
			}
		}
	}
	addRoleAssigned(checkedUsersList, selectedValue) {
		var role = selectedValue.split('$')[1];
		function addRole(formValues) {
			return new Promise(function (resolve, reject) {
				if (formValues) {
					axios
						.patch('/api/users/patch/role/assign/' + formValues.userID, formValues)
						.then(
							(res) => {
								resolve(res);
							}).catch((error) => {
							});
				}
			})
		}
		function getUserDetails(selectedId) {
			return new Promise(function (resolve, reject) {
				axios
					.get('/api/users/get/' + selectedId)
					.then((response) => {
						resolve(response);
					})
					.catch(function (error) { })
			})
		}
		var changed = 0;
		mainBlock().then(response => {
			// console.log('res', response);
			if (response) {
				this.setState({
					checkedUser: [],
					unCheckedUser: true
				}, () => {

					$('#userListDropdownId').removeAttr('disabled')
					this.refs.userListDropdown.value = '-'
					var data = {
						"startRange": 0,
						"limitRange": 10,
						"companyID": this.state.companyID
					}
					this.getData(data)
					checkedUsersList = []
				})
			}
			//here you can update your collection with axios call
		});

		async function mainBlock() {
			var changed = 0;
			for (var i = 0; i < checkedUsersList.length; i++) {
				var selectedId = checkedUsersList[i];
				var formValues = {
					userID: selectedId,
					role: role,
				}

				var previousStatus = await getUserDetails(selectedId);
				var previousrole = previousStatus.data.role.map((b, j) => b);
				if (previousrole.some(prole => prole === role)) {
					swal(" ", "Already role is assigned");
					$('#userListDropdownId').removeAttr('disabled');
				} else {
					var response = await addRole(formValues);
					if (response) {
						if (response.data && response.data === 'USER_ROLE_ASSIGNED') {
							changed++
							swal(" ", changed + " Record(s) Updated Successfully");
						}
						var user = await getUserDetails(selectedId);
						if (user) {
							var msgvariable = {
								'[User]': user.data.firstname + ' ' + user.data.lastname,
								'[user_email_id]': user.data.email
							}
							var inputObj = {
								to: user.data.email,
								templateName: 'Role Assigned',
								variables: msgvariable,
							}
							while ((checkedUsersList.length - 1) === i) {
								return Promise.resolve(true);
							}
						}
						$('#userListDropdownId').removeAttr('disabled')
					}

				}
			}
		}
	}
	removeRoleAssigned(checkedUsersList, selectedValue) {
		var role = selectedValue.split('$')[1];
		function removeRole(formValues) {
			return new Promise(function (resolve, reject) {
				if (formValues) {
					console.log('formValues', formValues);
					axios.patch('/api/users/patch/role/remove/' + formValues.userID, formValues)
						.then(
							(res) => {
								console.log('res====', res);
								resolve(res);
							}).catch((error) => {
							});
				}
			})
		}

		function getUserDetails(selectedId) {
			return new Promise(function (resolve, reject) {
				axios
					.get('/api/users/get/' + selectedId)
					.then((response) => {
						resolve(response);
					})
					.catch(function (error) { })
			})
		}
		var changed = 0;
		mainBlock().then(response => {
			console.log('res', response);
			if (response) {
				this.setState({
					checkedUser: [],
					unCheckedUser: true
				}, () => {

					$('#userListDropdownId').removeAttr('disabled');
					this.refs.userListDropdown.value = '-';
					var data = {
						"startRange": this.state.startRange,
						"limitRange": this.state.limitRange,
						"companyID": this.state.companyID
					}
					this.getData(data)
					checkedUsersList = [];
				})
			}
			//here you can update your collection with axios call
		});

		async function mainBlock() {
			var changed = 0;
			for (var i = 0; i < checkedUsersList.length; i++) {
				var selectedId = checkedUsersList[i];
				var formValues = {
					userID: selectedId,
					role: role,
				}

				var previousStatus = await getUserDetails(selectedId);
				var previousrole = previousStatus.data.role.map((b, j) => b);
				console.log('previousRole', previousrole, role);
				if (previousrole.some(prole => prole === role)) {
					var response = await removeRole(formValues);
					if (response) {
						if (response.data && response.data === 'USER_ROLE_REMOVED') {
							changed++
							console.log('changed', changed);
							swal(" ", changed + " Records(s) Updated Successfully");
						}
						var user = await getUserDetails(selectedId);
						if (user) {
							var msgvariable = {
								'[User]': user.data.firstname + ' ' + user.data.lastname,
								'[user_email_id]': user.data.email
							}
							var inputObj = {
								to: user.data.email,
								templateName: 'Role Removed',
								variables: msgvariable,
							}
							while ((checkedUsersList.length - 1) === i) {
								return Promise.resolve(true);
							}
						}
						$('#userListDropdownId').removeAttr('disabled')
					}
				} else {
					swal(" ", "Already role is assigned");
					$('#userListDropdownId').removeAttr('disabled');

				}
			}
		}
	}
	adminUserActions(event) {
		event.preventDefault();
		$('#userListDropdownId').attr('disabled', 'true')
		var checkedUsersList = this.state.checkedUser;
		console.log('checkedUsersList', checkedUsersList);
		if (checkedUsersList.length > 0) {
			var selectedValue = this.refs.userListDropdown.value;
			var keywordSelectedValue = selectedValue.split('$')[0];
			var role = selectedValue.split('$')[1];

			switch (keywordSelectedValue) {
				case '-':
					$('#userListDropdownId').removeAttr('disabled')
					break;

				case 'block_selected':
					this.blockSelected(checkedUsersList);
					break;

				case 'active_selected':
					this.activeSelected(checkedUsersList)
					break;
				case 'cancel_selected':
					swal({
						text: "Are you sure you want to delete selected users ?",buttons: true,buttons: ["Cancel", "Confirm"]})
						.then((success) => {
							if (success) {
								this.deleteStatusSelected(checkedUsersList)
							} else {
								swal("Your Data is safe!");
								// window.location.reload();
							}
						});

					break;

				case 'add':
					this.addRoleAssigned(checkedUsersList, selectedValue)
					break;
				case 'remove':
					this.removeRoleAssigned(checkedUsersList, selectedValue)
					break;
			}
		} else {
			this.refs.userListDropdown.value = '-'
			$('#userListDropdownId').removeAttr('disabled');
			swal({
				title: ' ',
				text: "Please select atleast one user."
			});
		}
	}


	selectedRole(event) {
		// console.log("this.state.limitRange",this.state.limitRange);
		event.preventDefault();
		var selectedValue = this.refs.roleListDropdown.value;
		 this.setState({
		      			Role:selectedValue,
		      		
		      		});
		console.log("selectedValue",selectedValue);
		var keywordSelectedValue = selectedValue.split('$')[0];
		var role = this.refs.roleListDropdown.value;
		var status = this.refs.blockActive.value;
		var company = this.refs.companyDropdown.value;
		// console.log(" role",role);
		// console.log(" status",status);
		// console.log(" company",company);
		// console.log("keywordSelectedValue",keywordSelectedValue);
		
		// var ArrayFindRole = this.state.userTableData.find(({ role }) => role === [keywordSelectedValue] );
		// console.log("ArrayFindRole",ArrayFindRole);

		if ( selectedValue != "all"  && ( this.refs.companyDropdown.value == "-- Select --"  &&   this.refs.blockActive.value == "-- Select --" ))  {
				this.axiosSelectedRole();
		}
		else if (selectedValue == "all" ) {
				console.log("selectedValue === all",selectedValue == "all");
			if (selectedValue == "all" && this.refs.blockActive.value === "-- Select --" && this.refs.companyDropdown.value === "-- Select --") {
					console.log("===",selectedValue == "all" && this.refs.blockActive.value === "-- Select --" && this.refs.companyDropdown.value === "-- Select --")
					var data = {
					"startRange": this.state.startRange,
					"limitRange": this.state.limitRange,
					"companyID": this.state.companyID
					}
					this.getData(data)
				}
			else if (selectedValue == "all" && (this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --") && (this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --") ) {
				this.selectedstatuswithcompany();	
			}
			else if (selectedValue == "all" && this.refs.blockActive.value == "all" && (this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --") ) {
				this.axiosSelectedCompany();
			}
			else if (selectedValue == "all" && this.refs.blockActive.value === "-- Select --" && (this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --") ) {
				this.axiosSelectedCompany();
			}
			else if (selectedValue == "all" && (this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --") && this.refs.companyDropdown.value == "all") {
				this.axiosSelectedStatus();
			}
			else if (selectedValue == "all" && (this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --") && this.refs.companyDropdown.value === "-- Select --") {
				this.axiosSelectedStatus();
			}

			else{
				
				this.axiosSelectedRole();
				
			}
		}

		else if (selectedValue == "all" && this.refs.roleListDropdown.value === "all" && this.refs.blockActive.value === "all" ) {
				console.log(" all selectedValue === all");
				var data = {
				"startRange": 0,
				"limitRange": 10,
				"companyID": parseInt(this.state.companyID)
			}
			this.getData(data)
				
		}

		else{
			console.log("selectedValue In else of Selected role");
			if ( ( this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --" ) && ( this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --") ) {
				console.log("selectedValue In else of Selected role");

				if (selectedValue != "all" && selectedValue != "-- Select --"){
				this.selectedstatuswithcompanywithrole();
				}
				else if (selectedValue != "all" ) {
					// console.log("selectedValue all",selectedValue)
					this.selectedstatuswithcompany();
				}
				else if (selectedValue == "all" ) {
					// console.log("selectedValue all",selectedValue)
					this.selectedstatuswithcompany();
				}
			}
			else if ( (selectedValue != "all" &&  selectedValue != "-- Select --") && this.refs.blockActive.value === "all" && this.refs.companyDropdown.value == "all" ) {
				this.axiosSelectedRole();
			}	
			else {
				console.log("selectedValue In else of else Selected role");

					if ( (this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --") ||  (this.refs.companyDropdown.value != "all"  && this.refs.companyDropdown.value != "-- Select --")) {
							console.log("if this.refs.blockActive.value && this.refs.blockActive.value != 'all'",this.refs.blockActive.value && this.refs.blockActive.value != "all");
						if ( this.refs.blockActive.value != "all" &&  this.refs.blockActive.value != "-- Select --") {
								console.log("if this.refs.blockActive.value && this.refs.blockActive.value != 'all'",this.refs.blockActive.value && this.refs.blockActive.value != "all");
						 	if (selectedValue != "all" && this.refs.blockActive.value != "all") {
								console.log("if this.refs.blockActive.value && this.refs.blockActive.value != 'all'");						
								this.selectedStatuswithrole();
							}
							else if (selectedValue === "all" && (this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --")) {
								this.axiosSelectedStatus();	
							}
						}
						else if ( this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --") {
							if (selectedValue != "all" && (this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --" )) {
								this.selectedrolewithcompany();
							}
							else if (selectedValue === "all" && this.refs.companyDropdown.value != "all") {
								this.axiosSelectedCompany();		
							}
						}
					}
					else if (this.refs.blockActive.value === "all" || this.refs.companyDropdown.value === "all") {

						if (this.refs.blockActive.value === "all" && (selectedValue != "all" && selectedValue != "-- Select --") ) {
							this.axiosSelectedRole();

						}
						else if (this.refs.companyDropdown.value === "all" && (selectedValue != "all" && selectedValue != "-- Select --") ) {
							this.axiosSelectedRole();

						}
					}

					
				}
		}	
	}
	axiosSelectedRole(){
		// console.log("im inaxios");
		// console.log("im in axiosSelectedRole axios",selectedValue);
		console.log("this.state.limitRange",this.state.limitRange);
				var data = {
						"startRange": this.state.startRange,
						"limitRange": this.state.limitRange,
						"companyID": parseInt(this.state.companyID)
					}
		var selectedValue = this.refs.roleListDropdown.value;
		console.log("selectedValue=>",selectedValue)
				if (selectedValue === "all") {
					var data = {
						"startRange": this.state.startRange,
						"limitRange": this.state.limitRange,
						"companyID": parseInt(this.state.companyID)
					}
					this.getData(data)
				} else {
					axios.post('/api/users/get/list/role/' + selectedValue, data)
					.then((res) => {
						var tableData = res.data.filter((data, i) => {
							console.log('tableData data.status==>>>', data.role);
							return (data.status !== '<span class="label label-default statusLabel">deleted-active</span>' && data.status !== '<span class="label label-default statusLabel">deleted-blocked</span>' && data.role !== ["admin"] && data.status !== '<span class="label label-default statusLabel">Deleted-Active</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Blocked</span>' && data.status !== 'deleted');
						});
						var tableData = tableData.map((a, i) => {
							console.log('tableData A==>>>', a);
							return {
								_id: a._id,
								fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b ondblclick=window.doubleclickonname("' + a._id +'")> ' + a.fullName + '</b>' +
								'<p><i class="fa fa-envelope"></i> ' +(a.email?a.email:"-") + '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
								companyDetails: a.companyName == undefined || "" ? "-" : '<a ondblclick=window.doubleclickonCompany("' + a.companyID +'")> ' + a.companyName  + '</a>'+ ' | ' + a.companyID,
								status: a.status,
								roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
								createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(),
								lastLogin:
								a.lastLogin === null
									?
									'<p style="font-size:13px;" title="Login Details">User not logged in yet</p>'
									:
									// moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
									moment(a.lastLogin).format("ddd, MMM DD, YY HH:mm") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
							}
						})
						this.setState({
							completeDataCount: res.data.length,
							tableData: tableData,
						})
					}).catch((error) => {
						swal( "Sorry there is no data of " + selectedValue);
					});
				}

					
	}

	selectedStatus(event) {
		event.preventDefault();
		var selectedValue = this.refs.blockActive.value;
		this.setState({
		      			Status:selectedValue,
		      		
		      		});
		var keywordSelectedValue = this.refs.blockActive.value;
		console.log("selectedValue in status==>", selectedValue);
		var role = this.refs.roleListDropdown.value;
		var status = this.refs.blockActive.value;
		var company = this.refs.companyDropdown.value;
		// console.log(" role",role);
		// console.log(" status",status);
		// console.log(" company",company);

		if ( selectedValue != "all"  && (  this.refs.roleListDropdown.value === "-- Select --"  &&  this.refs.companyDropdown.value === "-- Select --" ))  {
			
				this.axiosSelectedStatus();
		}

		else if (selectedValue === "all"  ) {
				// console.log("selectedValue === all",selectedValue == "all");
				if ( selectedValue == "all" && this.refs.roleListDropdown.value == "-- Select --" && this.refs.companyDropdown.value == "-- Select --"  ) {
						var data = {
					"startRange": this.state.startRange,
					"limitRange": this.state.limitRange,
					"companyID": this.state.companyID
					}
					this.getData(data)
					
				}
				else if (selectedValue == "all" && (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --" ) && (this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --" )) {
					this.selectedrolewithcompany();	
				}
				else if ( selectedValue == "all" && this.refs.roleListDropdown.value == "all" && (this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --" )) {
						this.axiosSelectedCompany();
				}
				else if ( selectedValue == "all" && this.refs.roleListDropdown.value == "-- Select --" && (this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --" )) {
						this.axiosSelectedCompany();
				}
				else if ( selectedValue == "all" && (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --" ) && this.refs.companyDropdown.value == "all"  ) {
						this.axiosSelectedRole();
					
				}
				else if ( selectedValue == "all" && (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --" ) && this.refs.companyDropdown.value === "-- Select --"  ) {
						this.axiosSelectedRole();
					
				}
				
				else{
					
					this.axiosSelectedStatus();
				}
		}

		else if (selectedValue === "all" && this.refs.roleListDropdown.value === "all" && this.refs.blockActive.value === "all" ) {
				// console.log(" all selectedValue === all");
				var data = {
				"startRange": 0,
				"limitRange": 10,
				"companyID": this.state.companyID
			}
			this.getData(data)
				
		}
		else{

			// console.log("selectedValue In else of status role",this.refs.roleListDropdown.value != "all");
			console.log("selectedValue In else of status role",this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --");
			if ( (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --") &&  (this.refs.companyDropdown.value != "-- Select --" && this.refs.companyDropdown.value != "all") ) {
				console.log("selectedValue In else of status role");

				if (selectedValue != "all" && selectedValue != "-- Select --"){
				this.selectedstatuswithcompanywithrole();
				}
				else if(selectedValue == "all"){

					console.log("selectedValue all",selectedValue)
					this.selectedrolewithcompany();
					
				}

			}
			else if ( (selectedValue != "all" &&  selectedValue != "-- Select --") && this.refs.roleListDropdown.value === "all" && this.refs.companyDropdown.value === "all" ) {
				this.axiosSelectedStatus();
			}
			else {
				console.log("selectedValue In else if else of status role");

				if ( (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --") || ( this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --")) {
					// console.log("if this.refs.roleListDropdown.value && this.refs.roleListDropdown.value != 'all'",this.refs.roleListDropdown.value && this.refs.roleListDropdown.value != "all");
					if ( this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --") {
							// console.log("if this.refs.roleListDropdown.value && this.refs.roleListDropdown.value != 'all'",this.refs.roleListDropdown.value && this.refs.roleListDropdown.value != "all");
					 	if (selectedValue != "all" && this.refs.roleListDropdown.value != "all") {
							// console.log("if this.refs.blockActive.value && this.refs.blockActive.value != 'all'");						
							this.selectedStatuswithrole();
						}
						else if (selectedValue === "all" && this.refs.roleListDropdown.value != "all") {
							this.axiosSelectedRole();	
						}
					}
					else if ( this.refs.companyDropdown.value != "all" && this.refs.companyDropdown.value != "-- Select --") {
						if (selectedValue != "all" && this.refs.companyDropdown.value != "all") {
							this.selectedstatuswithcompany();
						}
						else if (selectedValue === "all" && this.refs.companyDropdown.value != "all") {
							this.axiosSelectedCompany();		
						}
					}
				} 
				else if (this.refs.roleListDropdown.value === "all" || this.refs.companyDropdown.value === "all") {

						if (this.refs.roleListDropdown.value === "all" && (selectedValue != "all" && selectedValue != "-- Select --") ) {
							this.axiosSelectedStatus();

						}
						else if (this.refs.companyDropdown.value === "all" && (selectedValue != "all" && selectedValue != "-- Select --") ) {
							this.axiosSelectedStatus();

						}
				}
			}
		}
			
	}

	axiosSelectedStatus(){
	   console.log("data in axiosSelectedStatus==>");
		console.log("this.state.limitRange",this.state.limitRange);

		var selectedValue = this.refs.blockActive.value;
				// console.log("selectedValue in axiosSelectedStatus==>",selectedValue);
			var data = {
						"startRange": this.state.startRange,
						"limitRange": this.state.limitRange,
						"companyID": parseInt(this.state.companyID)
					}
			if (selectedValue === "all") {
					var data = {
						"startRange": this.state.startRange,
						"limitRange": this.state.limitRange,
						"companyID": parseInt(this.state.companyID)
					}
					this.getData(data)
			}else {
				console.log("data in status==>", data);
				axios.post('/api/users/get/list/status/' + selectedValue, data)
					.then(
						(res) => {
							console.log("selectedValue in axiosSelectedStatus==>",res);

							var tableData = res.data.filter((data, i) => {
								return (data.status !== '<span class="label label-default statusLabel">deleted-active</span>' && data.status !== '<span class="label label-default statusLabel">deleted-blocked</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Active</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Blocked</span>' && data.status !== 'deleted');
							});
							var tableData = tableData.map((a, i) => {
								// console.log('tableData A==>>>', a);
								return {
									_id: a._id,
									fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b ondblclick=window.doubleclickonname("' + a._id +'")> ' + a.fullName + '</b>' +
									'<p><i class="fa fa-envelope"></i> ' + (a.email?a.email:"-") + '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
									companyDetails: a.companyName == undefined || "" ? "-" : '<a ondblclick=window.doubleclickonCompany("' + a.companyID +'")> ' + a.companyName  + '</a>'+ ' | ' + a.companyID,
									status: a.status === "active" ? '<span class="label label-success statusLabel">' + a.status + '</span>' : '<span class="label label-default statusLabel">' + a.status + "</span>",
									roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
									createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(),
									lastLogin: a.lastLogin === null
												?
												'<p style="font-size:13px;" title="Login Details">User not logged in yet</p>'
												:
												// moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
												moment(a.lastLogin).format("ddd, MMM DD, YY HH:mm") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
								}
							})
							this.setState({
								completeDataCount: res.data.length,
								tableData: tableData,
							})
						}).catch((error) => {
							swal( "Sorry there is no data of " + selectedValue);
						});
				}

	}

	selectedCompnay(event) {
		event.preventDefault();
		var selectedValue = this.refs.companyDropdown.value;
		this.setState({
		      			Company:selectedValue,
		      		
		      		});
		console.log("selectedValue",selectedValue);
		var keywordSelectedValue = selectedValue.split('$')[0];
		var role = this.refs.roleListDropdown.value;
		var status = this.refs.blockActive.value;
		var company = this.refs.companyDropdown.value;
		// console.log(" role",role);
		// console.log(" status",status);
		// console.log(" company",company);

		if ( selectedValue != "all"  && (  this.refs.roleListDropdown.value === "-- Select --"  &&  this.refs.blockActive.value === "-- Select --" ))  {
			
				this.axiosSelectedCompany();
		}

		else if (selectedValue == "all") {
				console.log("selectedValue === all",selectedValue == "all");
			if ( selectedValue == "all" && this.refs.roleListDropdown.value === "-- Select --" && this.refs.blockActive.value === "-- Select --" ) {
				console.log("selectedValue =S =R = all");

				var data = {
				"startRange": this.state.startRange,
				"limitRange": this.state.limitRange,
				"companyID": this.state.companyID
				}
				this.getData(data)
			}
			else if (selectedValue == "all" && (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --") && (this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --" )) {
				console.log("selectedValue === all w role and status");
				
				this.selectedStatuswithrole();	
			}
			else if ( selectedValue == "all" && this.refs.roleListDropdown.value == "all" && (this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --" )) {
				console.log("selectedValue === all with role all ");
				
				this.axiosSelectedStatus();
			}
			else if ( selectedValue == "all" && this.refs.roleListDropdown.value == "all" && (this.refs.blockActive.value != "-- Select --" && this.refs.blockActive.value != "-- Select --" )) {
				console.log("selectedValue === all with role all ");
				
				this.axiosSelectedStatus();
			}
			else if ( selectedValue == "all" && (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --") && this.refs.blockActive.value == "all" ) {
				this.axiosSelectedRole();
			}
			else if ( selectedValue == "all" && (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --") && this.refs.blockActive.value === "-- Select --" ) {
				this.axiosSelectedRole();
			}
			
			else{
				this.axiosSelectedCompany();
			}
		}
		else if (selectedValue == "all" && this.refs.roleListDropdown.value === "all" && this.refs.blockActive.value === "all" ) {
				console.log(" all selectedValue === all");
				var data = {
				"startRange": 0,
				"limitRange": 10,
				"companyID": this.state.companyID
			}
			this.getData(data)
				
		}
		else{

			// console.log("this.refs.roleListDropdown.value != all => Company status role",this.refs.roleListDropdown.value != "all");
			// console.log("this.refs.roleListDropdown.value != -- Select -- / Company status role",this.refs.roleListDropdown.value != "-- Select --");
			// console.log("this.refs.blockActive.value != -- Select -- else of Company status role",this.refs.blockActive.value != "-- Select --");
			console.log("this.refs.blockActive.value != all / In else of Company status role", this.refs.blockActive.value != "all");
			if ( (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --" ) &&  ( this.refs.blockActive.value != "-- Select --"  && this.refs.blockActive.value != "all" ) ) {
				console.log("selectedValue In else's if  of Company status role");

				if (selectedValue != "-- Select --" && selectedValue != "all" ){
					console.log("selectedValue != -- Select -- && selectedValue != all  of Company status role",selectedValue != "-- Select --" && selectedValue != "all" );

				this.selectedstatuswithcompanywithrole();
				}
				else {
					console.log("selectedValue all",selectedValue)
					this.selectedStatuswithrole();
				}
			}
			else if ( (selectedValue != "all" &&  selectedValue != "-- Select --") && this.refs.roleListDropdown.value === "all" && this.refs.blockActive.value === "all" ) {
				this.axiosSelectedCompany();
			}
			else {
				if ( (this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --" ) || ( this.refs.blockActive.value != "all"   && this.refs.blockActive.value != "all" )) {
					console.log("if this.refs.roleListDropdown.value || this.refs.blockActive.value != 'all'",this.refs.roleListDropdown.value != 'all' || this.refs.roleListDropdown.value != "all");
					// console.log("if this.refs.roleListDropdown.value != all '",this.refs.roleListDropdown.value!= 'all' );
					// console.log("if this.refs.blockActive.value != 'all'", this.refs.roleListDropdown.value != "all");
					if ( this.refs.roleListDropdown.value != "all" && this.refs.roleListDropdown.value != "-- Select --") {
							console.log("if this.refs.roleListDropdown.value && this.refs.roleListDropdown.value != 'all'",this.refs.roleListDropdown.value && this.refs.roleListDropdown.value != "all");
					 	if (selectedValue != "all" && this.refs.roleListDropdown.value != "all") {
							// console.log("selectedValue != all && this.refs.roleListDropdown.value != all",selectedValue != "all" && this.refs.roleListDropdown.value != "all");						
							this.selectedrolewithcompany();
						}
						else if (selectedValue === "all" && this.refs.roleListDropdown.value != "-- Select --") {
							this.axiosSelectedRole();	
						}
					}
					else if ( this.refs.blockActive.value != "all" && this.refs.blockActive.value != "-- Select --") {
							// console.log("selectedValue != all && this.refs.blockActive.value != all",selectedValue != "all" && this.refs.blockActive.value != "all");						

						if (selectedValue != "all" && this.refs.blockActive.value != "all") {
							this.selectedstatuswithcompany();
						}
						else if (selectedValue === "all" && this.refs.blockActive.value != "all") {
							this.axiosSelectedStatus();		
						}
					}
				}
				else if (this.refs.roleListDropdown.value === "all" || this.refs.blockActive.value === "all") {

						if (this.refs.roleListDropdown.value === "all" && (selectedValue != "all" && selectedValue != "-- Select --") ) {
							this.axiosSelectedCompany();

						}
						else if (this.refs.blockActive.value === "all" && (selectedValue != "all" && selectedValue != "-- Select --") ) {
							this.axiosSelectedCompany();

						}
				}
			}
		}
		
	}

	axiosSelectedCompany(selectedValue){
		var selectedValue = this.refs.companyDropdown.value;

				var data = {
					"startRange": this.state.startRange,
					"limitRange": this.state.limitRange,
					"companyID": parseInt(this.state.companyID)
				}
				console.log("keywordSelectedValue",selectedValue ,data);
				axios.post('/api/users/get/list/companies/' + selectedValue, data)
					.then((res) => {
						var tableData = res.data.filter((data, i) => {
							// console.log('tableData data.status==>>>', data.role);
							return (data.status !== '<span class="label label-default statusLabel">deleted-active</span>' && data.status !== '<span class="label label-default statusLabel">deleted-blocked</span>' && data.role !== ["admin"] && data.status !== '<span class="label label-default statusLabel">Deleted-Active</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Blocked</span>' && data.status !== 'deleted');
						});
						var tableData = tableData.map((a, i) => {
							// console.log('tableData A==>>>', a);
							return {
								_id: a._id,
								fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b ondblclick=window.doubleclickonname("' + a._id +'")> ' + a.fullName + '</b>' +
								'<p><i class="fa fa-envelope"></i> ' + (a.email?a.email:"-") + '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
								companyDetails: a.companyName == undefined || "" ? "-" : '<a ondblclick=window.doubleclickonCompany("' + a.companyID +'")> ' + a.companyName  + '</a>'+ ' | ' + a.companyID,
								status: a.status,
								roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
								createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(),
								lastLogin:
								a.lastLogin === null
									?
									'<p style="font-size:13px;" title="Login Details">User not logged in yet</p>'
									:
									// moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
									moment(a.lastLogin).format("ddd, MMM DD, YY HH:mm") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
							}
						})
						this.setState({
							completeDataCount: res.data.length,
							tableData: tableData,
						})
					}).catch((error) => {
						swal("Sorry there is no data of " + selectedValue);
					});
	}


	selectedstatuswithcompany() {
		var data = {
			"startRange": this.state.startRange,
			"limitRange": this.state.limitRange,
			"companyID": parseInt(this.state.companyID)
		}
		var company = this.refs.companyDropdown.value
		var status = this.refs.blockActive.value
		if (company && status === "all") {
			var data = {
				"startRange": this.state.startRange,
				"limitRange": this.state.limitRange,
				"companyID": parseInt(this.state.companyID)
			}
			this.getData(data)
		} else {
				console.log("keywordSelectedValue" ,data);

			axios.post('/api/users/get/list/statuscompany/' + company + '/' + status, data)
				.then(
					(res) => {
						var tableData = res.data.filter((data, i) => {
							// console.log('tableData data.status==>>>', data.status);
							return (data.status !== '<span class="label label-default statusLabel">deleted-active</span>' && data.status !== '<span class="label label-default statusLabel">deleted-blocked</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Active</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Blocked</span>' && data.status !== 'deleted');
						});
						var tableData = tableData.map((a, i) => {
							return {
								_id: a._id,
								fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b ondblclick=window.doubleclickonname("' + a._id +'")> ' + a.fullName + '</b>' +
								'<p><i class="fa fa-envelope"></i> ' + (a.email?a.email:"-") + '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
								companyDetails: a.companyName == undefined || "" ? "-" : '<a ondblclick=window.doubleclickonCompany("' + a.companyID +'")> ' + a.companyName  + '</a>'+ ' | ' + a.companyID,
								status: a.status === "active" ? '<span class="label label-success statusLabel">' + a.status + '</span>' : '<span class="label label-default statusLabel">' + a.status + "</span>",
								roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
								createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(),
								lastLogin:a.lastLogin === null
									?
									'<p style="font-size:13px;" title="Login Details">User not logged in yet</p>'
									:
									// moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
									moment(a.lastLogin).format("ddd, MMM DD, YY HH:mm") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
							}
						})
						this.setState({
							completeDataCount: res.data.length,
							tableData: tableData,
						})
					}).catch((error) => {
						
						swal( "Sorry there is no " + status +"users of " + company);

					});
		}
	}

	selectedstatuswithcompanywithrole() {
		var data = {
			"startRange": this.state.startRange,
			"limitRange": this.state.limitRange,
			"companyID": parseInt(this.state.companyID)
		}
		var role = this.refs.roleListDropdown.value;
		var status = this.refs.blockActive.value;
		var company = this.refs.companyDropdown.value;
		console.log(" role",role);
		console.log(" status",status);
		console.log(" company",company);
		if (role === "all" && status === "all" && company === "all") {
			var data = {
				"startRange": this.state.startRange,
				"limitRange": this.state.limitRange,
				"companyID": parseInt(this.state.companyID)
			}
			this.getData(data)
		} else {
			console.log(" in else of selectedstatuswithcompanywithrole", role , status ,company, data);
			axios.post('/api/users/get/list/statuscompanyrole/' + company + '/' + status + '/'+ role, data)
				.then(
					(res) => {
						console.log("response in selectedstatuswithcompanywithrole ",res);
						var tableData = res.data.filter((data, i) => {
							return (data.status !== '<span class="label label-default statusLabel">deleted-active</span>' && data.status !== '<span class="label label-default statusLabel">deleted-blocked</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Active</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Blocked</span>' && data.status !== 'deleted');
						});
						var tableData = tableData.map((a, i) => {
							return {
								_id: a._id,
								fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b ondblclick=window.doubleclickonname("' + a._id +'")> ' + a.fullName + '</b>' +
								'<p><i class="fa fa-envelope"></i> ' + (a.email?a.email:"-") + '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
								companyDetails: a.companyName == undefined || "" ? "-" : '<a ondblclick=window.doubleclickonCompany("' + a.companyID +'")> ' + a.companyName  + '</a>'+ ' | ' + a.companyID,
								status: a.status === "active" ? '<span class="label label-success statusLabel">' + a.status + '</span>' : '<span class="label label-default statusLabel">' + a.status + "</span>",
								roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
								createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(),
								lastLogin: a.lastLogin === null
										?
										'<p style="font-size:13px;" title="Login Details">User not logged in yet</p>'
										:
										moment(a.lastLogin).format("ddd, MMM DD, YY HH:mm") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
							}
						})
						this.setState({
							completeDataCount: res.data.length,
							tableData: tableData,
						})
					}).catch((error) => {
						swal( "Sorry there is no " + role +"users of " + status);
						
					});
		}
	}
	selectedStatuswithrole() {
		console.log("selectedValue != 'all' && this.refs.roleListDropdown.value != 'all'");

			var data = {
					"startRange": this.state.startRange,
					"limitRange": this.state.limitRange,
					"companyID": parseInt(this.state.companyID)
				}
		var role = this.refs.roleListDropdown.value
		var status = this.refs.blockActive.value
		
			if (role === "all" && status === "all" ) {
				var data = {
					"startRange": this.state.startRange,
					"limitRange": this.state.limitRange,
					"companyID": parseInt(this.state.companyID)
				}
				this.getData(data)
			} else {
				axios.post('/api/users/get/list/statusrole/' + role + '/' + status, data)
					.then(
						(res) => {
							var tableData = res.data.filter((data, i) => {
								return (data.status !== '<span class="label label-default statusLabel">deleted-active</span>' && data.status !== '<span class="label label-default statusLabel">deleted-blocked</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Active</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Blocked</span>' && data.status !== 'deleted');
							});
							var tableData = tableData.map((a, i) => {
								return {
									_id: a._id,
									fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b ondblclick=window.doubleclickonname("' + a._id +'")> ' + a.fullName + '</b>' +
									'<p><i class="fa fa-envelope"></i> ' + (a.email?a.email:"-") + '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
									companyDetails: a.companyName == undefined || "" ? "-" : '<a ondblclick=window.doubleclickonCompany("' + a.companyID +'")> ' + a.companyName  + '</a>'+ ' | ' + a.companyID,
									status: a.status === "active" ? '<span class="label label-success statusLabel">' + a.status + '</span>' : '<span class="label label-default statusLabel">' + a.status + "</span>",
									roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
									createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(),
									lastLogin:a.lastLogin === null
										?
										'<p style="font-size:13px;" title="Login Details">User not logged in yet</p>'
										:
										// moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
										moment(a.lastLogin).format("ddd, MMM DD, YY HH:mm") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
								}
							})
							this.setState({
								completeDataCount: res.data.length,
								tableData: tableData,
							})
						}).catch((error) => {
							swal( "Sorry there is no " + role +"users of " + status);
						});
			}
		
	}

	selectedrolewithcompany() {
		var data = {
			"startRange": this.state.startRange,
			"limitRange": this.state.limitRange,
			"companyID": parseInt(this.state.companyID)
		}
		var role = this.refs.roleListDropdown.value
		var company = this.refs.companyDropdown.value
		// var status = this.refs.blockActive.value
		if (role  === "all" && company === "all") {
			var data = {
				"startRange": this.state.startRange,
				"limitRange": this.state.limitRange,
				"companyID": parseInt(this.state.companyID)
			}
			this.getData(data)
		} else {
			axios.post('/api/users/get/list/rolecompany/' + role + '/' + company, data)
				.then(
					(res) => {
						var tableData = res.data.filter((data, i) => {
							// console.log('tableData data.status==>>>', data.status);
							return (data.status !== '<span class="label label-default statusLabel">deleted-active</span>' && data.status !== '<span class="label label-default statusLabel">deleted-blocked</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Active</span>' && data.status !== '<span class="label label-default statusLabel">Deleted-Blocked</span>' && data.status !== 'deleted');
						});
						var tableData = tableData.map((a, i) => {
							return {
								_id: a._id,
								fullName: '<div class="col-lg-10 col-md-10 col-sm-6 col-xs-6 pull-left"><b ondblclick=window.doubleclickonname("' + a._id +'")> ' + a.fullName + '</b>' +
								'<p><i class="fa fa-envelope"></i> ' + (a.email?a.email:"-") + '&nbsp  | &nbsp <i class="fs16 fa fa-mobile"></i> ' + a.mobNumber + '</p>',
								companyDetails: a.companyName == undefined || "" ? "-" : '<a ondblclick=window.doubleclickonCompany("' + a.companyID +'")> ' + a.companyName  + '</a>'+ ' | ' + a.companyID,
								status: a.status === "active" ? '<span class="label label-success statusLabel">' + a.status + '</span>' : '<span class="label label-default statusLabel">' + a.status + "</span>",
								roles: a.role.map((b, j) => '  <span>' + b + ' </span>').toString(),
								createdAt: moment(a.createdAt).format("DD MMM YY") + '<br/>' + moment(a.createdAt).fromNow(),
								lastLogin:a.lastLogin === null
									?
									'<p style="font-size:13px;" title="Login Details">User not logged in yet</p>'
									:
									// moment(a.lastLogin).format("llll") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
									moment(a.lastLogin).format("ddd, MMM DD, YY HH:mm") + '<br/><div class="btn btn-link" data-toggle="modal"  onclick=window.showUserDetails("' + a._id + '") data-target=#userDetails-' + a._id + ' title="Login Details">User Login Details</div>'
							}
						})
						this.setState({
							completeDataCount: res.data.length,
							tableData: tableData,
						})
					}).catch((error) => {
						swal("Sorry there is "+ role +"users of " + company);
					});
		}
	}
	confirmDel(event) {
		// console.log("delete===>>>");
		this.setState({
			confirmDel: true,
		})
		window.location.reload();
	}
	setunCheckedUser(value) {
		this.setState({
			unCheckedUser: value,
		})
	}
	selectedUser(checkedUsersList) {
		this.setState({
			checkedUser: checkedUsersList,
		})
	}
	getRole() {
		axios.post('/api/roles/get/list')
		  .then((response) => {
			this.setState({
					adminRolesListData: response.data
			})
		  }).catch(function (error) {});
	}
	getCompanies() {
		axios.get('/api/entitymaster/getAllcompany')
			.then((response) => {
				this.setState({
					compDetails: response.data
				}, () => {
				})
			}).catch(function (error) {});
	}
	doubleclickonname(){
		this.props.history.push("/DeletedUsers/")
	}
	redirectToDeleteUsers(event) {
		this.props.history.push("/DeletedUsers/")
	}
	redirectToRoles(event) {
		this.props.history.push("/umroleslist")
	}
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');																																																																																																	
	}
	CreateUserModal(){
		window.$("#CreateUserModal").modal("show");
	}
	close(event) {
		var modal = document.getElementById("deleteModal");
		modal.style.display = "none";
		$('.modal-backdrop').remove();
	}
	render() {
		var adminRolesListDataList = this.state.adminRolesListData;
		return (
			<div className="container-fluid userManagementTableUI">
				<div className="row">
					<div className="formWrapper">
						<section className="content">
							<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent ">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
										<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
											User Management
                						</div>
										<hr className="hr-head container-fluid row" />
									</div>
									<div className="modal-bodyuser">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 " id="createmodalcl">
												<button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform userbtn clickforhideshow" onClick={this.CreateUserModal.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i><b>&nbsp;&nbsp;&nbsp; Add User</b></button>
												{this.state.companyID > 0
													?
													<CreateUser
														companyID={this.state.companyID}
														getData={this.getData.bind(this)} />
													:
													null
												}
											</div>
											<div className="col-lg-3 pull-right col-md-3 col-sm-12 col-xs-12 ">
												<button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-danger userbtn"
													onClick={this.redirectToDeleteUsers.bind(this)}>
													<i className="fa fa-minus" aria-hidden="true"></i>
													<b>&nbsp;&nbsp;&nbsp; Deleted Users</b>
												</button>
											</div>
										</div>
									</div>
									<form className="newTemplateForm">
										<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 usrmgnhead">
											<div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6" >
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12  NOpadding-left text-left labelform">Select Action</label>
												<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control mdb-select md-form" id="userListDropdownId" ref="userListDropdown" name="userListDropdown" onChange={this.adminUserActions.bind(this)}>
													<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="-" name="userListDDOption" disabled="disabled" selected="true">-- Select --</option>

													<optgroup className="col-lg-12 col-md-12 col-sm-12 col-xs-12  optgrpunderline" label="Active, Block, Delete">
														<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="block_selected" name="userListDDOption">Block Selected</option>
														<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="active_selected" name="userListDDOption">Active Selected</option>
														<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="cancel_selected" name="userListDDOption">Delete Selected Acccounts</option>
													</optgroup>
													<optgroup className="col-lg-12 col-md-12 col-sm-12 col-xs-12  optgrpunderline" label="Add Roles">
														{adminRolesListDataList.map((rolesData, index) => {
															return (<UMAddRolRow key={index} roleDataVales={rolesData.role} />);
														})
														}
													</optgroup>
													<optgroup className="col-lg-12 col-md-12 col-sm-12 col-xs-12  optgrpunderline" label="Remove Roles">
														{adminRolesListDataList.map((rolesData, index) => {
															return (<UMDelRolRow key={index} roleDataVales={rolesData.role} />);
														})
														}
													</optgroup>
												</select>
											</div>
											<div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6">
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left text-left labelform">Select Role</label>
												<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" ref="roleListDropdown" name="roleListDropdown" onChange={this.selectedRole.bind(this)} >
													<option name="roleListDDOption" disabled="disabled" selected="true">-- Select --</option>
													<option value="all" name="roleListDDOption">Show All</option>
															
													{adminRolesListDataList.map((rolesData, index) => {
														return <UMSelectRoleUsers key={index} roleDataVales={rolesData.role} />
													})
													}
												</select>
											</div>
											<div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6">
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left text-left labelform">Select Status</label>
												<select className=" col-col-lg-12  col-md-12 col-sm-12 col-xs-12 noPadding  form-control " ref="blockActive" name="blockActive" onChange={this.selectedStatus.bind(this)}>
													<option disabled="disabled" selected="true">-- Select --</option>
													<option value="all" >Show All</option>
													<option value="blocked">Blocked</option>
													<option value="active">Active </option>
												</select>
											</div>
											<div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6">
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left text-left labelform">Select Company</label>
												<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" ref="companyDropdown" name="companyDropdown" onChange={this.selectedCompnay.bind(this)} >
													<option name="roleListDDOption" disabled="disabled" selected="true">-- Select --</option>
													<option value="all" name="roleListDDOption">Show All</option>
														{/*console.log("this.state.compDetails",this.state.compDetails)*/}
													{
														this.state.compDetails && this.state.compDetails.length > 0 ?
															this.state.compDetails.map((data, index) => {
																// console.log("CompData",data);
																return (
																	<option key={index} value={data.companyName}>{data.companyName}</option>
																);
															})
															:
															""
													}
												</select>
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 userManagementTableUI">
											<IAssureTableUM
												completeDataCount={this.state.completeDataCount}
												twoLevelHeader={this.state.twoLevelHeader}
												getData={this.getData.bind(this)}
												tableHeading={this.state.tableHeading}
												tableData={this.state.tableData}
												companyID={this.state.companyID}
												limitRange={this.state.limitRange}
												Range={this.Range.bind(this)}
												tableObjects={this.state.tableObjects}
												// DropDownfilter = {this.state.Role, this.state.Status,this.state.Company}
												getSearchText={this.getSearchText.bind(this)}
												selectedUser={this.selectedUser.bind(this)}
												setunCheckedUser={this.setunCheckedUser.bind(this)}
												unCheckedUser={this.state.unCheckedUser}
												UsersTable={true}
											/>
										</div>
										{/* :
											null
										} */}
										<div className="modal col-lg-12 col-md-12 col-sm-12 col-xs-12" role="dialog">
											<div className=" modal-dialog adminModal adminModal-dialog">
												<div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
													<div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
														<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
														<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
															<button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
													</div>
													<div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
														<h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this User?</h4>
													</div>
													<div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
														<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
															<button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
														</div>
														<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
															{/* <button  onClick={this.deleteUser.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button> */}
														</div>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

		);
	}

}
export default UMListOfUsers;

