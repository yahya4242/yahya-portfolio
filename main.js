
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



        // ****Add class 'active' to menu link when section near top of viewport****

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
            }else {
                //deactivate the section when not intersecting
                entry.target.classList.remove('active-menu');
            }
        });
    }, options);
 
 //iterate and observe the sections
 for (let section of sections) {
     observer.observe(section);  
         };
     