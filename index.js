let fs = require('fs');

const PORT = 8080;

let express = require("express");
let app = express();

class Contenedor {
    constructor(url){
        this.url = url;
    }

    async save(obj){
        const products = await this.getAll();
        obj.id = ( products.length === 0 ) ? 1 : products[products.length - 1].id + 1;
        products.push(obj);
        try {
            console.log(`${JSON.stringify(obj)} has been added.`);
            return await fs.promises.writeFile('./products.json', JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAll(){
        try {
            let products = await fs.promises.readFile(this.url, 'utf-8');
            return JSON.parse( products );
        } catch (error) {
            console.log(error, 'Products was empty.');
            return [];
        }
    }
}

const FILE = new Contenedor('./products.json');


app.get("/", (request, response, next) => {
    response.send(`<h1 style="text-align: center;">EXPRESS SERVER</h1>
    <h4>ir a  '/products' para ver los prodcutos de la libreria.</h4>
    <h4>ir a '/productRandom' para ver un producto raandom .</h4>
    `);
});

app.get("/products", async (request, response, next) => {
    let products = await FILE.getAll();
    response.send(products);
});

app.get("/productRandom", async (request, response, next) => {
    let products = await FILE.getAll();
    response.send(products[Math.floor(Math.random()*3)]);
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));