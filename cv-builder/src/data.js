const templateData = {
  name: 'Tony Steven Talyor',
  short_description: 'Software Engineer with 7 years of experience in building high-load mobile applications',
  phoneNo: '1234567890',
  email: 'tony08@gmail.com',
  github: 'https://github.com/tonytalyor',
  location: 'Navi Mumbai, India',
  experience: [
    {
      post: 'Senior Software Engineer',
      company: 'TCS',
      joining_year: '2016',
      leaving_year: '2021'
    },
    {
      post: 'Senior Software Developer',
      company: 'Jio',
      joining_year: '2013',
      leaving_year: '2016'
    },
    {
      post: 'Junior Software Developer',
      company: 'GitLab',
      joining_year: '2010',
      leaving_year: '2013'
    }
  ],
  education: [
    {
      degree: 'B.Tech Computer Science Engineering',
      university: 'AK College of Engineering',
      joining_year: '2009',
      leaving_year: '2013',
      scoreObtained: '8',
      outOf: '10'
    },
    {
      degree: 'HSC',
      university: 'Tilak Junior College',
      joining_year: '2007',
      leaving_year: '2009',
      scoreObtained: '70',
      outOf: '100'
    }
  ],
  techLanguages: [
    'HTML',
    'CSS',
    'JavaScript',
    'C++',
    'C#'
  ],
  passions: [
    'Reading',
  ]
}

export function getsetPersonalInformation(information = null) {
  if (information != null) {
    changeTemplateDataInformation('name', information.name);
    changeTemplateDataInformation('short_description', information.short_description);
    changeTemplateDataInformation('phoneNo', information.phoneNo);
    changeTemplateDataInformation('email', information.email);
    changeTemplateDataInformation('github', information.github);
    changeTemplateDataInformation('location', information.location);
  }
  return templateData;
}
export function getsetExperience(index, information = null) {
  if (information != null) {
    changeExperienceInformation(index, 'post', information.post);
    changeExperienceInformation(index, 'company', information.company);
    changeExperienceInformation(index, 'joining_year', information.joining_year);
    changeExperienceInformation(index, 'leaving_year', information.leaving_year);
  }
  return templateData.experience[index];
}
export function getsetEducation(index, information = null) {
  if (information != null) {
    changeEducationInformation(index, 'degree', information.degree);
    changeEducationInformation(index, 'university', information.university);
    changeEducationInformation(index, 'joining_year', information.joining_year);
    changeEducationInformation(index, 'leaving_year', information.leaving_year);
    changeEducationInformation(index, 'scoreObtained', information.score);
    changeEducationInformation(index, 'outOf', information.total);
  }
  return templateData.education[index];
}

export function getsetTechLanguages(index, info) {
  if (info != null)
    templateData.techLanguages[index] = info;
  return templateData.techLanguages[index];
}

export function getsetPassions(index, info) {
  if (info != null)
    templateData.passions[index] = info;
  return templateData.passions[index];
}

export function arrayLength(name, add) {
  let temp;
  if (name === 'experienceCount') {
    temp = templateData.experience;
    if (add) {
      temp.push({
        post: '',
        company: '',
        joining_year: '',
        leaving_year: ''
      });
    }
  }
  else if (name === 'educationCount') {
    temp = templateData.education;
    if (add) {
      temp.push({
        degree: '',
        university: '',
        joining_year: '',
        leaving_year: '',
        scoreObtained: '',
        outOf: ''
      });
    }
  }
  else if (name === 'techCount') {
    temp = templateData.techLanguages;
    if (add) temp.push('');
  }
  else if (name === 'passionCount') {
    temp = templateData.passions;
    if (add) temp.push('');
  }
  return temp.length;
}

export function deleteLastElement(name) {
  if (name === 'experienceCount')
    templateData.experience.pop();
  else if (name === 'educationCount')
    templateData.education.pop();
  else if (name === 'techCount')
    templateData.techLanguages.pop();
  else if (name === 'passionCount')
    templateData.passions.pop();
}
function changeTemplateDataInformation(name, newData) {
  templateData[name] = newData;
}
function changeExperienceInformation(index, name, information) {
  templateData.experience[index][name] = information;
}
function changeEducationInformation(index, name, information) {
  templateData.education[index][name] = information;
}

export function clearTemplateData() {
  changeTemplateDataInformation('name', '');
  changeTemplateDataInformation('short_description', '');
  changeTemplateDataInformation('phoneNo', '');
  changeTemplateDataInformation('email', '');
  changeTemplateDataInformation('github', '');
  changeTemplateDataInformation('location', '');
  changeTemplateDataInformation('experience', [{}]);
  changeTemplateDataInformation('education', [{}]);
  changeTemplateDataInformation('techLanguages', ['']);
  changeTemplateDataInformation('passions', ['']);
}

export default templateData;