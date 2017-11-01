{
	function clamp(value, minn, maxx) {
		if (value < minn) {
			value = minn;
		} else if (value > maxx) {
			value = maxx;
		}
		return value;
	}
	
	function lerp(start, end, t) {
		return (1 - t) * start + t * end;
	}
	
    function scroll() {
		let header = document.getElementById("main-header");
		let title = document.getElementById("primary-title");
		let logo = title.getElementsByTagName("img")[0];
		
        if (window.scrollY > 0) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
		
		let height = 320 - window.scrollY;
		let heightProgression = (height - 112) / 208;
		if (height < 64) {
			height = 64;
		}
		if (height < 112) {
			document.getElementById("tab-bar").style.opacity = (height - 96) / 16;
		} else {
			document.getElementById("tab-bar").style.opacity = 1;
		}
		logo.style.height = clamp(lerp(28, 140, heightProgression), 28, 140) + "px";
		title.style.marginBottom = title.style.marginTop = clamp(lerp(0, 75, heightProgression), 0, 75) + "px";
		title.style.padding = clamp(lerp(20, 0, heightProgression), 0, 20) + "px";
		header.style.height = height + "px";
		
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
        let pageId = "page-" + (parseInt(tabs.selected) + 1);
        let page = document.getElementById(pageId);
        window.location.hash = pageId;
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
    
    tabs.addEventListener("iron-select", paginate);
    if (window.location.hash.substring(0, 6) == "#page-") {
        tabs.selected = parseInt(window.location.hash.substring(6)) - 1;
    }
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
