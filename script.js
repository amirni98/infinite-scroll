const count = 10;
const apiKey = '0_yIbWZQdTBTKwyEuguc8wEXt8FTk3ye95VLu-MHEVw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data      = await response.json();
        console.log(data);

    } catch (error) {
        //d
    }
}

getPhotos();