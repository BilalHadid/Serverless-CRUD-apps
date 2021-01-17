// const process = require("process.env");
const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({
      // secret: "fnAD_tyjCUACB9o2J4Edyu1fg9K_QWZw483i13kj",
      secret: process.env.FAUNADB_ADMIN_SECRET,
    });
    var result = await client;
    q.Get(q.Ref(q.Collection("FirstCrud"), "287806365144973831"));
    //console.log("Document retrived from Container in Database: " + result.data.title);
    // q.Map(
    //   q.Paginate(q.Documents(q.Collection("FirstCrud"))),
    //   q.Lambda((x) => q.Get(x))
    // );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `${result.data}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
