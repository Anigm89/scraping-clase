const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const url = 'https://anigm89.github.io/project-break-dashboard/'

app.get('/', (req, res) => {
   // res.send('si funciona')
   axios.get(url).then((response) => {
    if(response.status === 200){
        const html = response.data
        console.log(html)
        //res.send(html) //trae TODO el html de la url que hemos puesto

        const $ = cheerio.load(html) //carga lo que trae
        const pageTitulo =  $('title').text() //para traer solo el titulo del html
        console.log(pageTitulo)

        //para traer todos los <a href> y todas las imgs
        const links = [];
        const imgs = [];

        $('a').each((index,element) => {   //esto es como un foreach, recorre todos los <a> y recoge el atributo de cada uno
          const link = $(element).attr('href')
          links.push(link)
        })
         console.log(links)
        
        $('img').each((index,element) => {
            const img = $(element).attr('src')
            imgs.push(img)
        })

        res.send(`
        <h1>${pageTitulo}</h1>
        <h2>enlaces </h2>
        <ul>
        ${links.map(link => `<li><a href ="${url}${link}">${link}</a></li>`).join('')} 
        </ul>
        <h2>Imágenes </h2>
        <ul>
        ${imgs.map(img => `<li><a href ="${url}${img}">${img}</a></li>`).join('')}
        </ul>
        `)
    }
   })
})


app.listen(3000, () =>{
    console.log('express está escuchando en el puerto http://localhost:3000')
})