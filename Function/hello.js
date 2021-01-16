// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// const handler = async (event) => {
//   try {
//     const subject = event.queryStringParameters.name || "World";
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: `Hello ${subject}` }),
//       // // more keys you can return:
//       // headers: { "headerName": "headerValue", ... },
//       // isBase64Encoded: true,
//     };
//   } catch (error) {
//     return { statusCode: 500, body: error.toString() };
//   }
// };

// module.exports = { handler };
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({
      secret: "fnAD_n2MaIACBZ44zqFaC7V5BqKzV2orHH3a0hh9",
    });
    // q.CreateCollection({ name: "FirstCrud" })
    const messageBody = JSON.parse(event.body);
    var result = await client.query(
      q.Create(q.Collection("FirstCrud"), {
        data: { title: messageBody.title },
      })
    );

    //console.log("Document retrived from Container in Database: " + result.data.title);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `${result.ref.id}` }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
    // console.log(err);
  }
};
