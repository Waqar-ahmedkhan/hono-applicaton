import { Hono } from 'hono';

const app = new Hono()

app.post('/', async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})




async function Authmiddlerware(c:any , next:any) {
  if( c.req.header("Authorization")) {
    
    await next();
  } else {
    //  c.res.status(401);
    //  c.res.end();
    return c.text("not authorized");
  }
  
}

// also use app.use (its work for every request)

app.use(Authmiddlerware);
app.get("/testing",Authmiddlerware,  async (c) => {
console.log(c.req.query("param"));
})

export default app