import elysia from "elysia";

const app = new elysia();

app.get("/", () => "Hello World!");

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});