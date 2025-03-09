let settings_global = {};

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
        childDiv.classList.add("relative", "max-h-screen");
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
                    const submit = document.querySelector('button.button.small.inverted[type="submit"][name="_eventId_proceed"]');
                    var newForm = document.getElementById('login_form');

                    const elementsArray = [
                      document.getElementById('new_username'),
                      document.getElementById('new_password'),
                      document.getElementById('publicChecker')
                    ];

                    const translation =  [
                      "username",
                      "password",
                      "donotcache"
                    ]

                    elementsArray.forEach((el, index) => {
                      el.addEventListener('change', () => {
                        if (translation[index] != "donotcache") {
                          document.getElementById(translation[index]).value = el.value;
                        }
                        else {
                          const checkbox = document.querySelector('input[type="checkbox"][name="donotcache"]');
                          checkbox.value = checkbox.value == "1" ? "0" : "1";
                        }
                      })
                    });

                    newForm.addEventListener('submit', (e) => {
                      e.preventDefault();
                      submit.click();
                    })

                }
            }
        );

    }

    chrome.runtime.sendMessage({action: "GET::settings"}, (response) => {
      settings_global = response.settings;
      console.log(settings_global);
      if (settings_global.enabled == "true") {
        removeDefaultStyling();
        hideAll();
        loadHTML();
      }
    })
    
})()