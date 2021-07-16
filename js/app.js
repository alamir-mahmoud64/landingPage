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

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



function scrollToSection(event){
    event.preventDefault();
    const secId = event.target.getAttribute('href');
    const section=document.querySelector(secId);
    section.scrollIntoView({behavior: 'smooth', block: 'center'}); 
}

function toggleActiveState(){
    let activeSectionId = null;
    const allAnchors = document.querySelectorAll('a');
    for(const anchor of allAnchors){
        anchor.classList.remove('active-anchor');
    }
    for(const section of sections){
        const viewProps = section.getBoundingClientRect();
        if(viewProps.top>=0 && viewProps.top<=500){
            section.classList.add('your-active-class');
            activeSectionId = section.getAttribute('id');
        }else{
            section.classList.remove('your-active-class');
        }
    }
    for (const anchor of allAnchors) {
        if(activeSectionId!==null && anchor.getAttribute('href')==="#"+activeSectionId){
            anchor.classList.add('item-active-class');
        }else{
            anchor.classList.remove('item-active-class');
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigationMenu(){
    for (const section of sections) {
        const liElement = document.createElement('li');
        const anchor = document.createElement('a');
        const anchorText = document.createTextNode(section.getAttribute('data-nav'));
        anchor.setAttribute('href',"#"+section.getAttribute('id'));
        anchor.appendChild(anchorText);
        anchor.addEventListener('click',scrollToSection);
        anchor.classList.add('menu__link');
        liElement.appendChild(anchor);
        newFragment.appendChild(liElement);
    }
    navList.appendChild(newFragment);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


window.addEventListener('scroll', toggleActiveState); 