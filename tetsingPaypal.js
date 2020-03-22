<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Paypal checking</title>
    </head>
    <body>
        <script src="https://www.paypal.com/sdk/js?client-id=AYkuv4QKYpEo_qN57yxHSw-6oft0WJsFKx_Iomp_Jr0PQQ5whKDWB4VcFM6ZUZYjazHQ4n4uEldWEJrR"></script>

        <script>
            paypal.Buttons({
                createOrder: function (data, actions) { // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: '0.01'
                                }
                            }
                        ]
                    });
                },
                onApprove: function (data, actions) { // This function captures the funds from the transaction.
                    return actions.order.capture().then(function (details) { // This function shows a transaction success message to your buyer.
                        alert('Transaction completed by ' + details.payer.name.given_name);
                    });
                }
            }).render('body');
            // This function displays Smart Payment Buttons on your web page.
        </script>

    </body>

</html>
