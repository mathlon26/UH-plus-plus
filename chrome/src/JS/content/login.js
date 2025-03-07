(() => {
    function hideAll() {
        document.getElementById("wrapper").classList.add('hidden');
        document.getElementsByClassName("mobile-header")[0].classList.add('hidden');
        document.getElementsByClassName("main")[0].classList.add('hidden');
    }

    function removeDefaultStyling() {
        // Remove style tags
        document.querySelectorAll("*").forEach((el) => {
          el.removeAttribute("style");
        });
  
        // Remove intra.css
        
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
            link.parentNode.removeChild(link);
        });
      }

    function loadHTML() {
        const childDiv = document.createElement("div");
        childDiv.id = "placeholder";
        document.body.appendChild(childDiv);

        chrome.runtime.sendMessage(
            {
              action: "GET::html",
              page: "login",
              lang: "nl",
            },
            (response) => {
              if (response.html) {
    
                    placeholder.innerHTML = response.html;
                    document.getElementById("login_____container").style.backgroundImage = `url('${chrome.runtime.getURL("src/resources/images/auth-bg.png")}')`;

                }
            }
        );

    }

    removeDefaultStyling();
    hideAll();
    loadHTML();
})()