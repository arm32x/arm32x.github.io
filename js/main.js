{
    function scroll () {
        if (window.scrollY > 0) {
            document.getElementById ("main-header").classList.add ("scrolled");
        } else {
            document.getElementById ("main-header").classList.remove ("scrolled");
        }

        window.requestAnimationFrame (scroll);
    }

    scroll ();
}

{
    let tabs = document.getElementById ("tab-bar");
    let pages = document.getElementsByClassName ("page");
    let animateTimeout;

    function paginate () {
        window.clearTimeout (animateTimeout);
        let prevPage = document.getElementsByClassName ("page selected")[0];
        let page = document.getElementById ("page-" + (parseInt (tabs.selected) + 1));
        for (let index = 0; index < pages.length; index++) {
            pages[index].classList.remove ("selected");
            pages[index].classList.remove ("hidden");
        }
        window.setTimeout (() => {
            if (page) {
                page.classList.add ("selected");
            }
            animateTimeout = window.setTimeout (() => {
                for (let index = 0; index < pages.length; index++) {
                    if (!pages[index].classList.contains ("selected")) {
                        pages[index].classList.add ("hidden");
                    }
                }
            }, 550);
            window.scroll (0, 0);
        }, 1);
    }
    
    // TODO: Add pagination via hash
    
    tabs.addEventListener ("iron-select", paginate);
    paginate ();
}
