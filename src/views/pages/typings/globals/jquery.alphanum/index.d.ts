interface settings {
  allow              : string, // Allow extra characters
  disallow           : string, // Disallow extra characters
  allowSpace         : boolean,  // Allow the space character
  allowNewline       : boolean,  // Allow the newline character \n ascii 10
  allowNumeric       : boolean,  // Allow digits 0-9
  allowUpper         : boolean,  // Allow upper case characters
  allowLower         : boolean,  // Allow lower case characters
  allowCaseless      : boolean,  // Allow characters that do not have both upper & lower variants
                              // eg Arabic or Chinese
  allowLatin         : boolean,  // a-z A-Z
  allowOtherCharSets : boolean,  // eg é, Á, Arabic, Chinese etc
  forceUpper         : boolean, // Convert lower case characters to upper case
  forceLower         : boolean, // Convert upper case characters to lower case
  maxLength          : number    // eg Max Length
}

interface JQuery {
  alpha(settings?): JQuery;
  alphanum(settings?): JQuery;
  numeric(settings?): JQuery;
}