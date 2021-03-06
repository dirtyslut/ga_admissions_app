var db = require('./config/db');
var Cohort = require('./models/cohort');
var User = require('./models/user');

User.remove({})
	.then(function(){
    	return Cohort.remove();
	})
 	.then(function(){
    	return User.create([
	        {name:'Phil Lamplugh', email:'philco@ga.com', ga_email:'philco@ga.com',github:'https://github.com/phlco', role:'instructor' },
	        {name:'Kate Wood', email:'katewood611@gmail.com', ga_email:'katewood611@gmail.com',github:'https://github.com/KateWood', role:'instructor' },
	        {name:'Matt Gutierrez', email:'matthew.gutierrez@generalassemb.ly', ga_email:'matthew.gutierrez@generalassemb.ly',github:'https://github.com/fatchicken007', role:'instructor' },
	        {name:'Matt Parvinsmith', email:'mrparvinsmith@gmail.com', ga_email:'mrparvinsmith@gmail.com',github:'https://github.com/mrparvinsmith', role: 'student' },
	        {name:'Christina Regis', email:'christina.freeze@gmail.com', ga_email:'christina.freeze@gmail.com',github:'https://github.com/christina-regis', role:'student' },
	        {name:'Evan Washington', email:'enavy04@gmail.com', ga_email:'enavy04@gmail.com',github:'https://github.com/Navyvet1125', role:'admissions' },
	        {name:'Erik Gomez', email:'ego.xiv@gmail.com', ga_email:'ego.xiv@gmail.com',github:'https://github.com/egoxiv', role:'student' },
	        {name:'Josh Fadem', email:'josh.fadem@generalassemb.ly', ga_email:'josh.fadem@generalassemb.ly',github:'https://github.com/jfadem82', role:'admissions' },
        ]);
  })
  .then(function(users){
      var cohort = new Cohort();
      cohort.program = 'WDI';
      cohort.campus = 'SM';
      cohort.number = 22;
      cohort.city = 'Santa Monica, CA';
      cohort.start = new Date('March 7, 2016');
      cohort.end = new Date('May 27, 2016');
      users.forEach(function(user){
          if (user.role==='instructor' && cohort.instructors.length < 3) {
            user.cohort = cohort._id;
            user.save();
            cohort.instructors.push(user._id);
          } else if (user.role==='student') {
            user.cohort = cohort._id;
            user.save();
            cohort.students.push(user._id);
          }
      });
      return cohort.save();
  })
  .catch(function(err){
    console.log(err);
    return err;
  })
  .then(function(results){
    console.log(results);
    process.exit();
  });
