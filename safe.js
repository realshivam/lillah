// kept safe 1

function submitSubcribe() {
  var subscribe_first_name = document.getElementById(
    "subscribe_first_name"
  ).value;
  var subscribe_last_name = document.getElementById(
    "subscribe_last_name"
  ).value;
  var subscribe_email = document.getElementById("subscribe_email").value;

  if (!subscribe_first_name || !subscribe_last_name || !subscribe_email) {
    alert("Please enter the basic details before subscribe");
    return false;
  } else {
    document.getElementById("subscribe_form").submit(); //formid
  }
}

let orderId;

// Displays PayPal buttons
paypal
  .Buttons({
    style: {
      layout: "horizontal",
    },

    // onInit is called when the button first renders
    onInit: function (data, actions) {
      // Disable the buttons
      actions.disable();

      // Listen for changes to the checkbox
      document
        .querySelector("#check")
        .addEventListener("change", function (event) {
          var first_name = document.getElementById("first_name").value;
          var last_name = document.getElementById("last_name").value;
          var phone = document.getElementById("phone").value;
          var email = document.getElementById("email").value;
          var company = document.getElementById("company").value;
          var city = document.getElementById("city").value;
          var state = document.getElementById("state").value;
          var donation_focus = document.getElementById("donation_focus").value;
          var donationAmount = document.getElementById("00N5f00000eUeLW").value;

          if (
            !first_name ||
            !last_name ||
            !phone ||
            !email ||
            !company ||
            !city ||
            !state ||
            !donation_focus | !donationAmount
          ) {
            alert("Please enter the basic details before donation");
            document.getElementById("check").checked = false;
            return false;
          } else {
            if (isNaN(donationAmount)) {
              alert("Donation amount is not a number");
              document.getElementById("check").checked = false;
              return false;
            }

            if (isNaN(phone)) {
              alert("Phone number is not a number");
              document.getElementById("check").checked = false;
              return false;
            }

            var validRegex =
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.match(validRegex)) {
              alert("Email is not valid");
              document.getElementById("check").checked = false;
              return false;
            }
          }

          // Enable or disable the button when it is checked or unchecked
          if (event.target.checked) {
            actions.enable();
          } else {
            actions.disable();
          }
        });
    },

    // onClick is called when the button is clicked
    onClick: function () {
      console.log("click on bttn");

      var first_name = document.getElementById("first_name").value;
      var last_name = document.getElementById("last_name").value;
      var phone = document.getElementById("phone").value;
      var email = document.getElementById("email").value;
      var company = document.getElementById("company").value;
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      var donation_focus = document.getElementById("donation_focus").value;
      var donationAmount = document.getElementById("00N5f00000eUeLW").value;

      if (
        !first_name ||
        !last_name ||
        !phone ||
        !email ||
        !company ||
        !city ||
        !state ||
        !donation_focus ||
        !donationAmount
      ) {
        alert("Please enter the basic details before donation");

        return false;
      }
      if (isNaN(donationAmount)) {
        alert("Donation amount is not a number");
        return false;
      }

      if (isNaN(phone)) {
        alert("Phone number is not a number");
        return false;
      }

      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(validRegex)) {
        alert("Email is not valid");
        return false;
      }

      if (!document.getElementById("check").checked) {
        alert("Please tick the checkbox to confirm the details.");
      }
    },

    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: document.getElementById("00N5f00000eUeLW").value,
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        document.getElementById("donorform").submit();
        // window.location.href = '/success.html';
      });
    },
  })
  .render("#paypal-button-container");

// If this returns false or the card fields aren't visible, see Step #1.
if (paypal.HostedFields.isEligible()) {
  // Renders card fields
  paypal.HostedFields.render({
    // Call your server to set up the transaction
    createOrder: function () {
      return fetch("/your-server/paypal/order", {
        method: "post",
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (orderData) {
          orderId = orderData.id;
          return orderId;
        });
    },

    styles: {
      ".valid": {
        color: "green",
      },
      ".invalid": {
        color: "red",
      },
    },

    fields: {
      number: {
        selector: "#card-number",
        placeholder: "4111 1111 1111 1111",
      },
      cvv: {
        selector: "#cvv",
        placeholder: "123",
      },
      expirationDate: {
        selector: "#expiration-date",
        placeholder: "MM/YY",
      },
    },
  }).then(function (cardFields) {
    document.querySelector("#card-form").addEventListener("submit", (event) => {
      event.preventDefault();

      cardFields
        .submit({
          // Cardholder's first and last name
          cardholderName: document.getElementById("card-holder-name").value,
          // Billing Address
          billingAddress: {
            // Street address, line 1
            streetAddress: document.getElementById(
              "card-billing-address-street"
            ).value,
            // Street address, line 2 (Ex: Unit, Apartment, etc.)
            extendedAddress: document.getElementById(
              "card-billing-address-unit"
            ).value,
            // State
            region: document.getElementById("card-billing-address-state").value,
            // City
            locality: document.getElementById("card-billing-address-city")
              .value,
            // Postal Code
            postalCode: document.getElementById("card-billing-address-zip")
              .value,
            // Country Code
            countryCodeAlpha2: document.getElementById(
              "card-billing-address-country"
            ).value,
          },
        })
        .then(function () {
          fetch("/your-server/api/order/" + orderId + "/capture/", {
            method: "post",
          })
            .then(function (res) {
              return res.json();
            })
            .then(function (orderData) {
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you

              // This example reads a v2/checkout/orders capture response, propagated from the server
              // You could use a different API or structure for your 'orderData'
              var errorDetail =
                Array.isArray(orderData.details) && orderData.details[0];

              if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
                return actions.restart(); // Recoverable state, per:
                // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
              }

              if (errorDetail) {
                var msg = "Sorry, your transaction could not be processed.";
                if (errorDetail.description)
                  msg += "\n\n" + errorDetail.description;
                if (orderData.debug_id) msg += " (" + orderData.debug_id + ")";
                return alert(msg); // Show a failure message
              }

              // Show a success message or redirect
              alert("Transaction completed!");
            });
        })
        .catch(function (err) {
          alert("Payment could not be captured! " + JSON.stringify(err));
        });
    });
  });
} else {
  // Hides card fields if the merchant isn't eligible
  document.querySelector("#card-form").style = "display: none";
}

// kept safe 1
