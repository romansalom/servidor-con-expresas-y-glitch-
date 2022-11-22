const { Router } = require("express");
const router = new Router();

module.exports = app =>{
    let arrProductos = [
        {
            id: 1,
            title: "Producto1",
            price: 100,
            thumbnail: "https://www.dummyimage.com/400x400/00ff59/ffffff.jpg&text=Producto1",
        }
    ];
    
    let addId = (req, res, next) => {
        req.body.id = ( arrProductos.length === 0 ) ? 1 : arrProductos[arrProductos.length - 1].id + 1;
        next();
    };

    app.use('/api/productos', router);
    router.get('/', (req, res, next) => {
        res.json( arrProductos );
    });

    router.get('/:id', (req, res, next) => {
        let selected = arrProductos.filter(item => item.id == req.params.id);
        selected.length === 0 ? 
        res.send( {error: "Producto no encontrado"} ) : res.json( selected );
    });

    router.post('/', addId, (req, res, next) => {
        let obj = req.body;
        arrProductos.push(obj);

        res.json( arrProductos );
    });
}