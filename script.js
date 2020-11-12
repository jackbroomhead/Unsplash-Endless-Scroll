const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray= [];


//unsplash api
const count = 5;
const apiKey = '6jCm-sGK7qyuZkwjadfbNzjeHTz_64Bp2Spth2cPbXE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    
    imagesLoaded++;
   
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
       
        count = 30;
    }
}
//Helper function to set attributes on dom elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create elements for links n photos, add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
       
    //run each function for each object in photo array
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
           href: photo.links.html, target: '_blank', 
       });
      
        
       //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description,
            title: photo.alt_description});
        //event listener
        img.addEventListener('load', imageLoaded);
            // put <img> inside <a>, put both inside the imagecontainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


//get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch errors here
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
{   
    ready = false;
    getPhotos();
}
});

//On load
getPhotos();