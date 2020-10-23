const mongoose = require('mongoose');
const mongodb = require('mongodb');


const StateJobs 		= require('./ModelMap.js');

exports.insertStateJobs = (req, res, next)=>{
	

		const stateJobsData = new StateJobs({
			"_id" : new mongoose.Types.ObjectId(),
			"stateName": req.body.stateName,
			"numberOfJobs":req.body.numberOfJobs
			});
		

		stateJobsData.save()
				.then(data => {
				res.status(200).json({							
					message	: "Statewise Job Details Inserted Successfully",
				});
			})
			.catch(error=>{
				console.log(error);
				res.status(500).json({
					error 	: error,
					message : "Some issue occurred during Insert Jobs."
				});
			});
		
}
exports.getStateJobsList = (req,res,next)=>{
	StateJobs.find({})
		.then(stateJobsList => {
			res.status(200).json({	
				stateJobsList : stateJobsList,
				message	 : "stateJobsList Jobs Found",
			});			
		})
		.catch(error=>{
			console.log(error);
			res.status(500).json({
				error 	: error,
				message : "Some issue occurred finding Job List"
			});
		});
}