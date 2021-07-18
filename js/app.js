/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const newFragment = document.createDocumentFragment();
const navList = document.getElementById('navbar__list');
const backTopButton = document.getElementById('btnBackTop');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Scroll to anchor ID using scrollTO event
let scrollToSection = (event)=>{
    event.preventDefault();
    const secId = event.target.getAttribute('href');
    const section=document.querySelector(secId);
    section.scrollIntoView({behavior: 'smooth', block: 'center'}); 
};

// Add class 'active' to section when near top of viewport
let toggleActiveState =  () => {
    let activeSectionId = null;
    const allAnchors = document.querySelectorAll('a');

    // Display or hide Back to TOP when the user scrolls below the fold of the page 
    if(window.pageYOffset > 0){
        backTopButton.style.display = 'block';
    }else{
        backTopButton.style.display = 'none';
    }

    sections.forEach((section) => {
        const sectionRectInfo = section.getBoundingClientRect();
        /*
         Check section Position to define its active status,
         and store its ID value to use for setting link active
        */
        if(sectionRectInfo.top >= 0 && sectionRectInfo.top < 300){
            section.classList.add('your-active-class');
            activeSectionId = section.getAttribute('id');
        }else{
            section.classList.remove('your-active-class');
        }
    });
    // Set ative nav link
    allAnchors.forEach((anchor) => {
        if(activeSectionId!==null && anchor.getAttribute('href')==="#"+activeSectionId){
            anchor.classList.add('item-active-class');
        }else{
            anchor.classList.remove('item-active-class');
        }
    });
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
sections.forEach ((section) => {
    const liElement = document.createElement('li');
    const anchor = document.createElement('a');
    const anchorText = document.createTextNode(section.getAttribute('data-nav'));
    anchor.setAttribute('href',"#"+section.getAttribute('id'));
    anchor.appendChild(anchorText);
    anchor.addEventListener('click',scrollToSection);
    anchor.classList.add('menu__link');
    liElement.appendChild(anchor);
    newFragment.appendChild(liElement);
});
navList.appendChild(newFragment);


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Register Scroll Event
window.addEventListener('scroll', toggleActiveState); 

// Register Click Event for back to top button
backTopButton.addEventListener('click',function(){
    window.scrollTo({top:0,behavior: 'smooth'})
})