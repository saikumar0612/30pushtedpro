//changing job title pattern --suresh-- 08-13-2019 start 

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatternsService {

  constructor() { }

  maxName = "35";
  minName = "3";
  minimumLength= "2";
  maximumLength = "55";
  emaillength = "64";
  passwordLength = "24";
  departmentNameLength = "100";
  jobtitlelength = "150";
  descriptionlength = "500";
  internalNotesLength = "1000";
  clientJobCodelength = "12"
  internalBillrateLength ="5";
  jobopeningslength = "3";
  companynameLength = "100"; // employer length === companynameLength
  addressLength = "150";
  responsibilitiesLength = "150";
  specializationLength = "250";
  institutionLength = "100";
  gpaScore = "4";
  DocumentTitleMaxLength = "25";
  SSNLength = "11";
  streetlength = "55";
  entitlementsDays = "3";
  DUNS = "9";
  FIN= "9";
  FAXMinimunLength= "10";
  FAXMaximumLength = "15";
  zipcode = "5";
  zipcodeMaximum ="6";
  keyperformanceIndicatorLength = "55";
  minimumEducationLength = "256"; // master data in job titles
  maximumSalaryLength = "10"; // paygrades
  driverLicenseMinLength = "9";
  driverLicenseMaxLength = "25";
  certificateNumberMinimum = "4";
  caertificateNumberMaximum ="15";
  bankroutingNumberMin = "16";
  bankroutingNumberMax = "18";
  accountNumberMin = "5"; // user salary details
  accountnumberMax = "18"; // user salary details

  jobTitlePattern =  "^(?!.*[.&*-]{2})([a-zA-Z0-9.&*-]+[^\s])*[a-zA-Z0-9.&*-]+$";
  addressPattern = "^([a-zA-Z0-9.,&*-_#()/]+[^\s])*[a-zA-Z0-9.,&*-_#()/]+$";
  twitterPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?twitter\.com\/[A-z0-9_]+\/?";
  linkedInPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?";
  facebbokPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?(facebook|fb)\.com\/[A-z0-9_.-]+\/?";
  websitePattern = "^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+$";
  companyNamePattern = "^(?!.*[.&!@#()+-/_*]{2})([a-zA-Z0-9.,&!@#()+-/_*]+[^\s])*[a-zA-Z0-9.,&!@#()+-/_*]+$";
  branchNamePattern = "^(?!.*[!#%_.,@&*-]{2})([a-zA-Z0-9!#%_.,@&*-]+[^\s])*[a-zA-Z0-9!#%_.,@&*-]+$";
  kpiIndicatorPattern = "^(?!.*[!#%_.,@&*-]{2})([a-zA-Z0-9!#%_.,@&*-]+[^\s])*[a-zA-Z0-9!#%_.,@&*-]+$"
  // pattern="^(?!.*[!#%_.@&*-]{2})([a-zA-Z0-9!#%_.@&*-]+[\s])*[a-zA-Z0-9!#%_.@&*-]+$"
}
// changing job title pattern --suresh-- 08-13-2019 end