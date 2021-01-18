// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require("faunadb"),
  q = faunadb.query;
const handler = async (event) => {
  try {
    var client = new faunadb.Client({
      secret: "fnAD_y7JvQACB7xMLYgv_6je4PKIMCuhOG1g4vaY",
    });
    var result = await client.query(
      q.Get(q.Ref(q.Collection("FirstCrud"), "287806439297122823"))
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `${result.data.title}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
