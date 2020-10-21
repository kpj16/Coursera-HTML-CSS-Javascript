// initiate variables
let shippingName = document.querySelector("#shippingName");
let shippingZip = document.querySelector("#shippingZip");
let billingName = document.querySelector("#billingName");
let billingZip = document.querySelector("#billingZip");
let checkBoxSame = document.querySelector("#same");

// define functions
function billingFunction() {
  console.log(billingName.value);
  //check if checkbox is checked
  if (checkBoxSame.checked) {
    let temp1 = shippingName.value;
    let temp2 = shippingZip.value;

    billingName.value = temp1;
    billingZip.value = temp2;
    billingName.setAttribute("readonly", true);
    billingZip.setAttribute("readonly", true);
  } else {
    billingName.value = "";
    billingZip.value = "";
    billingName.removeAttribute("readonly");
    billingZip.removeAttribute("readonly");
  }
}
