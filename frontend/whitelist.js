/*******************************************************/
/*                Whitelist Data                       */
/* This array is hidden from the UI but can be seen via  */
/* browser developer tools. Modify as necessary.       */
/*******************************************************/
const WHITELIST_DATA = [
  "0x1234567890abcdef1234567890abcdef12345678",
  "0xabcdefabcdefabcdefabcdefabcdefabcdef1234",
  "0x0987654321abcdef0987654321abcdef09876543"
];

// Ensure the global variable 'whitelist' is set.
if (typeof whitelist !== "undefined") {
  whitelist = WHITELIST_DATA;
} else {
  window.whitelist = WHITELIST_DATA;
}