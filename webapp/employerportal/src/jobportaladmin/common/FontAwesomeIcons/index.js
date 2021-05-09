import ReactDOM 							from 'react-dom'
import { library } 							from '@fortawesome/fontawesome-svg-core'
import { fab } 								from '@fortawesome/free-brands-svg-icons'

import {	faAlignRight, faCheckSquare, 
	     	faCoffee, faRing,faMapMarkedAlt,
	     	faUniversity, faFileAlt, faAdjust,
	     	faChalkboardTeacher, faCity,
	     	faWarehouse, faIdCardAlt,
	     	faNetworkWired, faUserClock,
	     	faIndustry, faMapMarkerAlt, faRestroom,
	     	faUser, faBusinessTime,
	      	faBriefcase, faEnvelope,
	      	faUsers, faSearch, faSignOutAlt,
	      	faEllipsisH, faTrashAlt, 
	      	faPencilAlt,faHome, faPlusCircle,faRupeeSign,faArrowRight,faAngleDoubleRight,faSquareFull,faMobileAlt
	   } 									from '@fortawesome/free-solid-svg-icons'
 
library.add(fab, faCheckSquare, faAlignRight,
 			faRing, faMapMarkedAlt, faUniversity,
 			faFileAlt, faAdjust, faChalkboardTeacher,
 			faCity, faWarehouse, faIdCardAlt,
 			faNetworkWired, faUserClock, faIndustry,
 			faMapMarkerAlt, faRestroom, faCoffee, faUser,
 			faBusinessTime, faBriefcase, faEnvelope,
 			faUsers, faSearch, faSignOutAlt, 
 			faEllipsisH, faTrashAlt, faPencilAlt,
 			faPlusCircle,faRupeeSign,faArrowRight,faAngleDoubleRight,faSquareFull,faMobileAlt)
