const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

let count = 3;
let initial = true;
const apiKey = '0_yIbWZQdTBTKwyEuguc8wEXt8FTk3ye95VLu-MHEVw';
let  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttrs(item , tag) {
    for (const key in tag) {
        item.setAttribute(key, tag[key]);
    }
}

function imageLoad() {

    console.log(imagesLoaded);
    imagesLoaded++;
    if (2*imagesLoaded >= totalImages){
        ready = true;
        imagesLoaded = 0;
        if(initial) {
            loader.hidden = true;
            count = 15;
            apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
            initial = false;
        }       
        
    }
}


function displayPhotos() {

    totalImages = photosArray.length;
    
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttrs(item , {
            href: photo.links.html ,
            target: '_blank' 
        })
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);
        setAttrs(img , {
            src: photo.urls.regular ,
            alt: photo.alt_description ,
            title: photo.alt_description 
        })

        img.addEventListener('load', imageLoad);

        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


async function getPhotos() {
    try {
        const response  = await fetch(apiUrl);
        photosArray     = await response.json();
        displayPhotos();
    } catch (error) {
        //d
    }
}


window.addEventListener('scroll' , () => {
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - 1000) && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();