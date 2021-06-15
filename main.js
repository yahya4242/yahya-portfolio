
const sections = document.querySelectorAll('.section');


// ****Scroll to section on link click****

//select all Nav links
const anchorList = document.querySelectorAll('.menu-link')
        //iterate over each links
        for (let anchor of anchorList) {
            //add event listener
            anchor.addEventListener('click', function(e){
                //prevent default scroll
                e.preventDefault();
                //select the section with the id that matches the href of the link to scroll to
                let sectionToScroll = document.querySelector(e.target.getAttribute('href'));
                //add the smooth scroll into view
                sectionToScroll.scrollIntoView({behavior: 'smooth'});
            });
        };



// ****Add class 'active' to menu link when section near top of viewport****  AND ****animate elements when come into view****

//apply the call back func that's built below when the intersection ratio is 70%
const options = {threshold: 0.70};
// build the intersectionObserver and set the parameters as the callback func above and the defined options
const observer = new IntersectionObserver(
    function (entries){
        //iterate over each entry
        entries.forEach(function (entry){
            //check if the section is intersecting
            if(entry.isIntersecting ) {
                //check if there's a current active element -- (this fixes when reloading the page at any point other than the top of the page )
                let t = document.querySelector('.active-menu');
                if(typeof(t) != 'undefined' && t != null){
                //remove the current active section class
                t.classList.remove('active-menu');

                    

                };
                //add the class active to the targeted section
                entry.target.classList.add('active-menu');
                //activate the same nav item for the same targeted section
                let anchor = document.querySelector(`[href="#${entry.target.getAttribute('id')}"]`).classList.add('active-menu');
                //repeat the animations when element comes into view using intersection observer
                let animated = entry.target.getElementsByClassName('animate__animated');
                //iterate over all the elements that have class 'animate__animated' which is used in animation.css library
                for (n of animated){
                    // add this unique customized class "run" to make the animation happen -- I already changed all the used animations in animation.css to make it include .run class ... e.g. (original : .animate__bounceInRight) (edited : .animate__bounceInRight.run ) => this was edited in animation.css file
                    n.classList.add("run")};
                
                    
            }else {
                //deactivate the section when not intersecting
                entry.target.classList.remove('active-menu');

                //iterate over all the elements that have class 'animate__animated' which is used in animation.css library ** to remove animation when not in view
                let animated = entry.target.getElementsByClassName('animate__animated');
                for (n of animated){
                    n.classList.remove("run")};
                
            }
        });
    }, options);

 //iterate and observe the sections
for (let section of sections) {
        observer.observe(section);  
    };






// ****click button in ortfolio section to show its carousel****

//get list of the buttons in the portfolio section
const btnss = document.querySelectorAll(".category");
//loop over the list to check which btn clicked
    for(btn of btnss){
        //listen to when a btn is clicked
        btn.addEventListener("click", clicked);
        //get a list of all flickity carousels
        const carouselss = document.querySelectorAll(".main-carousel");
        //function of when the targeted btn is clicked
        function clicked(e){

                    //highlight the clicked tab/button and keep it highlighted
                    var current = document.getElementsByClassName("highlight");
                    current[0].className = current[0].className.replace(" highlight", "");
                    this.className += " highlight";
        
        //loop over the list of the carousels
        for(caro of carouselss){
            //check if the btn clicked is the one related to the carousel
            if (e.target.getAttribute("id")===caro.getAttribute("id")){
                
                //if it is the carousel for the clicked btn, then show it
                caro.classList.remove("hidden");
                //***IMPORTANT*** this is to fix the FLICKITY glitch that happens when changing the showed carousel according to the clicked btn */
                window.dispatchEvent(new Event('resize'));
                
            //if it's not the meant carousel, then just hide it
            } else {
                
                caro.classList.add("hidden");
                
                
                
                };
            };
        };
    };




    // ****shwo and hide side hamburger menu for mobile screens****
    

    const burgerBars = document.getElementById("burger-menu");
    const burgerMenu = document.getElementById("side-menu");
    const xBtn = document.getElementById("cancel");

    burgerBars.addEventListener("click", clickMenu);
    xBtn.addEventListener("click", hideMenu);



    function clickMenu(e){
        e.preventDefault();
        burgerMenu.classList.remove("hide-side");
    };

    function hideMenu(e){
        e.preventDefault();
        burgerMenu.classList.add("hide-side");
    };

    document.body.addEventListener("click", hideOnOutsideClick, true);

    function hideOnOutsideClick(e){
        
        if (burgerMenu !== e.target && !burgerMenu.contains(e.target) && e.target.id !== "burger-menu"){
                burgerMenu.classList.add("hide-side");
            };};