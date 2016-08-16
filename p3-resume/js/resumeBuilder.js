var bio = {
	"name" : "Zhifan Sang",
	"role" : "Graduate Student",
	"welcomeMessage" : "Welcome to Zhifan's personal website!  I am an organized, enthusiastic, data-driven graduate student seeking full-time opportunities in data science, analytics and software engineering.  I have a solid mathematics and statistics as well as computer science background, and I am dedicated and willing to learn. As for the skill set, I am adept in Java, Python, R, Matlab, SAS.  I have experience in mathematical modeling, data mining, machine learning.", 
	"image" : "images/headpic.jpg",
	"contacts" : [{
		"mobile" : "404-889-3289",
		"skype" : "zfsang", 
		"location" : "Atlanta,GA",
		"email" : "zfsang@gmail.com"
	}],	
	"skills": ["Java", "python", "R", "Data mining", "Hadoop"]
};

var work = {
		"jobs": [

		{
			"employer":"Emory University",
			"title":"Research Assistant",
			"location":"Atlanta, GA",
			"datesWorked":"05/01/2015-Present",
			"description":"Use SAR models and Bayesian approach to simulate protein image data using MCMC" +
	 		"and Develop automatic procedure of processing small-angle scattering images and reconstructing interatomic distance distribution"

		},
		{
		"employer":"Jinxiang Network",
		"title":"Intern",
		"location":"Beijing, China",
		"datesWorked":"08/01/2010-09/01/2010",
		"description":"Use SAR models and Bayesian approach to simulate protein image data using MCMC" +
 		"and Develop automatic procedure of processing small-angle scattering images and reconstructing interatomic distance distribution"
	}
		
	]
};

var projects = {
	"project" : [{
			"title":"Analysis and Modeling of Small Angle X-ray Scattering (SAXS)",
			"date":"04/10/2015-Present",
			"description":" Use R and Matlab to process and model SAXS images using spatial dependency and Bayesian methods",
			"images":["images/Protein.png"]
	},
	{
			"title":"Comparing Parallel MCMC Simulation Algorithms for Big Data Problems",
			"date":"08/20/2015-Present",
			"description":" Comparing several parallel MCMC algorithms for big data problems in simulations where n (sample size) is large.",
			"images":["images/MCMC.png"]
	}]
};

var education = {
	"schools": [
			{
			"name":"Nankai University",
			"datesAttended":"2010 - 2014",
			"location":"Tianjin, China",
			"degree": "BS",
			"major":"Statistics",
			"minor": "N/A",
			"url": "www.nankai.edu.cn"

		},
		{
			"name":"Emory University",
			"datesAttended":"2014 - Presnet",
			"location":"Atlanta, GA",
			"degree": "MS",
			"major":"Biostatistics",
			"minor": "N/A",
			"url":"www.emory.edu"

		},
		{
			"name":"Georgia Intsitute of Technology",
			"datesAttended":"2015 - Presnet",
			"location":"Atlanta, GA",
			"degree": "Special Graduate",
			"major":"Computer Science",
			"minor": "N/A",
			"url":"www.gatech.edu"

		}	
	],
	"onlineCourses": [
		{
			"title":"Front-End Web Developer Nanodegree",
			"school":"Udacity",
			"completed":"On-going",
			"url":"https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
		},
		{
			"title":"An Introduction to Interactive Programming in Python",
			"school":"Coursera",
			"completed":"Sep.2014",
			"url":"https://www.coursera.org/maestro/api/certificate/get_certificate?verify-code=34VQTFYFDX"
		},
		{
			"title":"The Data Scientist’s Toolbox",
			"school":"Coursera",
			"completed":"Dec.2014",
			"url":"https://www.coursera.org/signature/certificate/6TQR5F26AT"
		}
		]
};


bio.display = function() {
	var formattedName = HTMLheaderName.replace("%data%",bio.name);
	var formattedRole = HTMLheaderRole.replace("%data%",bio.role);
	var formattedImage = HTMLbioPic.replace("%data%",bio.image);
	var formattedMessage = HTMLWelcomeMsg.replace("%data%",bio.welcomeMessage);

	$("#header").prepend(formattedRole).prepend(formattedName).append(formattedImage,formattedMessage);
	$("#header").append(HTMLskillsStart);

	for(skill in bio.skills) {
		var formattedSkills = HTMLskills.replace("%data%",bio.skills[skill]);
		$("#skills").append(formattedSkills);
	};

	for(contact in bio.contacts) {
		var formattedMobile = HTMLmobile.replace("%data%",bio.contacts[contact].mobile);
		var formattedEmail = HTMLemail.replace("%data%",bio.contacts[contact].email);
		var formattedSkype = HTMLcontactGeneric.replace("%contact%","skype").replace("%data%",bio.contacts[contact].skype);
		$("#footerContacts").append(formattedMobile,formattedEmail,formattedSkype);
	};
};

education.display = function() {
	for(school in education.schools) {
		$("#education").append(HTMLschoolStart);
		
		var formattedName = HTMLschoolName.replace("%data%",education.schools[school].name);
		var formattedDegree = HTMLschoolDegree.replace("%data%",education.schools[school].degree);
		var formattedDates = HTMLschoolDates.replace("%data%",education.schools[school].dates);
		var formattedLocation = HTMLschoolLocation.replace("%data%",education.schools[school].location);
		var formattedMajor = HTMLschoolMajor.replace("%data%",education.schools[school].majors);
		$(".education-entry:last").append(formattedName + formattedDegree,formattedDates,formattedLocation,formattedMajor);
	}
};

work.display = function() {
	for(job in work.jobs) {
		$("#workExperience").append(HTMLworkStart);
		
		var formattedEmployer = HTMLworkEmployer.replace("%data%",work.jobs[job].employer);
		var formattedTitle = HTMLworkTitle.replace("%data%",work.jobs[job].title);
		var formattedDates = HTMLworkDates.replace("%data%",work.jobs[job].dates);
		var formattedDescription = HTMLworkDescription.replace("%data%",work.jobs[job].description);

		$(".work-entry:last").append(formattedEmployer + formattedTitle,formattedDates,formattedDescription);
	}
};

projects.display = function(){
	for(item in projects.project){
		$("#projects").append(HTMLprojectStart);
		var formattedTitle = HTMLprojectTitle.replace("%data%",projects.project[item].title);
		var formattedDates = HTMLprojectDates.replace("%data%",projects.project[item].dates);
		var formattedDescription = HTMLprojectDescription.replace("%data%",projects.project[item].description);
		
		$(".project-entry:last").append(formattedTitle,formattedDates,formattedDescription);
		for (image in projects.project[item].images) {
			var formattedImage = HTMLprojectImage.replace("%data%",projects.project[item].images[image]);
			$(".project-entry:last").append(formattedImage);
		};
		

		
	}
};

function inName(name){
	console.log(name);
	var newName = name;
	newName = newName[0].toUpperCase() + newName.slice(1,newName.indexOf(" ") + 1).toLowerCase() + newName.slice(newName.indexOf(" ") + 1).toUpperCase(); 

	return newName;
};


work.display();
projects.display();
education.display();
bio.display();

$("#main").append(internationalizeButton);
$("#mapDiv").append(googleMap);