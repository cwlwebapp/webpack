import jquery from 'jquery';
console.log('one');
export default function printMe() {
  const a = "I get called from print.js!12";
  console.log(a + "123456789");
  // cosnole.error('I get called from print.js!');
}
