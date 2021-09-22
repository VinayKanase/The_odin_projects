// Validates CV Form or Form.js Component Form

export function validatePersonalInformation(object) {
 const nameTest = /^[A-Za-z, ]*$/;
 const phoneNoTest = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
 const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 const urlTest = /^(ftp|http|https):\/\/[^ "]+$/;
 let error = [];
 if (object.name.length === 0) {
  error.push('Name is Required');
 }
 else if (object.email.length === 0) {
  error.push('Email is Required');
 }
 if (!nameTest.test(object.name))
  error.push('Name Should can only be alphabets and spaces')
 if (!phoneNoTest.test(object.phoneNo) && object.phoneNo.length !== 0)
  error.push('Enter Validate Phone Number');
 if (!emailTest.test(object.email) && object.email.length !== 0)
  error.push('Enter Valid Email');
 if (!urlTest.test(object.github) && object.github.length !== 0)
  error.push('Enter valid URL');
 return error;
}

export function validateExperience(object) {
 const postTest = /^[A-Za-z, ]*$/;
 const companyTest = /^[\w\s]+$/;
 let error = [];
 if (object.post.length === 0)
  error.push('Post Name is required');
 else if (object.company.length === 0)
  error.push('Company Name is required');
 else if (object.joining_year === 0)
  error.push('Joining Year is required');
 if (!postTest.test(object.post))
  error.push('Post Name Should contain alphabets and spaces only.');
 if (!companyTest.test(object.company) && object.company.length !== 0)
  error.push('Company Name Should contain alphabets, spaces, underscore and numbers only')
 if ((parseInt(object.joining_year) < 1900 || parseInt(object.joining_year) > new Date().getFullYear())
  || (parseInt(object.leaving_year) < 1900 || parseInt(object.leaving_year) > new Date().getFullYear())) {
  error.push('Enter Valid Year');
 }
 return error;
}

export function validateEducation(object) {
 let error = [];
 const universityTest = /^[\w\s]+$/;
 if (object.degree.length === 0)
  error.push('Degree Name is Required');
 else if (object.university.length === 0)
  error.push('University or School name is Required');
 else if (object.joining_year.length === 0)
  error.push('Year of Joining is Required');
 else if (object.score.length === 0)
  error.push('Score Obtained is Required');
 else if (object.total.length === 0)
  error.push('Total Score is Required');
 if (!universityTest.test(object.university) && object.university.length !== 0)
  error.push('University Name can contain alphabets, spaces, underscore and numbers only')
 if ((parseInt(object.joining_year) < 1900 || parseInt(object.joining_year) > new Date().getFullYear())
  || (parseInt(object.leaving_year) < 1900 || parseInt(object.leaving_year) > new Date().getFullYear())) {
  error.push('Enter Valid Year');
 }
 if (parseInt(object.total) < parseInt(object.score))
  error.push('Your Score cannot be greater than Total Score');
 return error;
}