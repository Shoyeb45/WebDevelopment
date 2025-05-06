import { Hono } from 'hono'

const app = new Hono();

async function middlewareAuth(c: any, next: any) {
  try {
    console.log("Middleware auth");

    next();
  } catch (error) {
    c.status(401);
    c.json({
      message: "Authentication Failed",
      error: error
    })
  }
}

app.post('/', middlewareAuth, async (c) => {

  try {
    
    // const body = await c.req.json();
    // console.log("Body: ", body);
  
    // console.log('Header: ', c.req.header("Auth"));
    // console.log("Query: ", c.req.query("param"));
  
    
    
    // return c.text('Hello Hono!');
    // c.status(201);
    return c.json({
      message: "you used post method"
    })
  } catch (error) {
    console.log(error);
    return c.text("Some error")
  }
});

app.get("/", async (c) => {
  return c.text("Hii this is get request");
})

export default app
