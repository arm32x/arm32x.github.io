{
    function scroll() {
        if(window.scrollY > 0) {
            document.getElementById("main-header").classList.add("scrolled");
        } else {
            document.getElementById("main-header").classList.remove("scrolled");
        }

        window.requestAnimationFrame(scroll);
    }

    scroll();
}

{
    let tabs = document.getElementById("tab-bar");
    let pages = document.getElementsByClassName("page");
    let animateTimeout;

    function paginate() {
        window.clearTimeout(animateTimeout);
        let prevPage = document.getElementsByClassName("page selected")[0];
        let page = document.getElementById("page-" +(parseInt(tabs.selected) + 1));
        for (let page of pages) {
            page.classList.remove("selected");
            page.classList.remove("hidden");
        }
        window.setTimeout(() => {
            if (page) {
                page.classList.add("selected");
            }
            animateTimeout = window.setTimeout(() => {
                for (let page of pages) {
                    if (!page.classList.contains("selected")) {
                        page.classList.add("hidden");
                    }
                }
            }, 550);
            window.scroll(0, 0);
        }, 1);
    }
    
    // TODO: Add pagination via hash
    
    tabs.addEventListener("iron-select", paginate);
    paginate();
}

{
    let projectElements = document.querySelectorAll(".projects-card section");
    let popoutButtons = document.querySelectorAll(".projects-card section .right-buttons .popup-button");
    let modal = document.getElementById("modal-dialog");
    modal.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    console.log(popoutButtons);
    
    for(let index = 0; index < popoutButtons.length; index++) {
        popoutButtons[index].addEventListener("click", () => {
            // Browser compatibility
            if(!("content" in document.createElement("template"))) {
                console.error("Template element not supported");
                return;
            }
            
            let template = projectElements[index].getElementsByClassName("modal-content")[0];
            
            // Clear contents and classes of #modal-dialog
            modal.className = "";
            while (modal.firstChild) {
                modal.removeChild(modal.firstChild);
            }
            
            // Set the content
            modal.appendChild(document.importNode(template.content, true));
            
            // Set the classes
            modal.className = template.getAttribute("data-class");
            
            // Show the dialog
            document.getElementById("overlay").classList.add("show");
        });
    }
    
    document.getElementById("overlay").addEventListener("click", () => {
        document.getElementById("overlay").classList.remove("show");
    });
}
