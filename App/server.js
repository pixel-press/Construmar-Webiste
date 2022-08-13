import { Application} from "https://deno.land/x/oak/mod.ts";//oak library for deno
import router from './router.js'

const main = () => {
    //create a new application instance
    const app = new Application();
    //get argument instance
    let instance = Deno.args[0];
    //init port variable
    let port;
    //inline if else
    instance == 'local'? port = 3000: port = 8080;

    //listen event listener
    app.addEventListener("listen", ({port}) => {
        console.log(
          `Listening on port ${port}`
        );
    });
    
    //read the html file and send it to the client
    app.use(router.routes());
    app.use(router.allowedMethods());

    //send the static files to client
    app.use(async ctx => {
        await ctx.send({
            root: `${Deno.cwd()}/App/static/`
        })
    })

    //error handling html read
    app.use(async (ctx, next) => {
        //internal server error
        ctx.response.status = 500;
        next();
    })

    app.listen({port: port})
}

main();
