var studentData = {};
const DEBUG = true;
let settings_global = {};

function loadStudentData() {
  document.querySelectorAll('input[type="hidden"]').forEach((input) => {
    if (input.name.startsWith("Top1$ih")) {
      var key = input.name.replace("Top1$ih", "");
      var key = key.replace("Top", "");
      studentData[key] = input.value || null;
    }
  });
}

function updateSettings(callback) {
  let lang = studentData.Taal === "01" ? "nl" : "en";
  chrome.runtime.sendMessage({action: "POST::settings", key: "lang", value: lang}, (response) =>  {
    chrome.runtime.sendMessage({action: "GET::settings"}, (response) => {
      settings_global = response.settings;
      callback();
    });
  });
}



function dutch_linkButtons() {
  const roosterbtn = document.getElementById("uurRooster");
  const mijnburgerprofiel = document.getElementById("Menu1-menuItem002");
  const persoonlijkegegevens = document.getElementById("Menu1-menuItem005");
  const privacyvoorkeuren = document.getElementById("Menu1-menuItem006");
  const studentenkaart = document.getElementById("Menu1-menuItem007");
  const eid = document.getElementById("Menu1-menuItem008");
  const studiegeld = document.getElementById("Menu1-menuItem010");
  const loopbaan = document.getElementById(
    "Menu1-menuItem013-subMenu-menuItem000"
  );
  const aanvraagstudietraject = document.getElementById(
    "Menu1-menuItem013-subMenu-menuItem002"
  );
  const opleidingsonderdelen = document.getElementById(
    "Menu1-menuItem013-subMenu-menuItem003"
  );
  const studiecontract = document.getElementById(
    "Menu1-menuItem013-subMenu-menuItem004"
  );
  const uitschrijvenopleiding = document.getElementById(
    "Menu1-menuItem013-subMenu-menuItem005"
  );
  const examencijfers = document.getElementById(
    "Menu1-menuItem014-subMenu-menuItem001"
  );
  const inschrijvingslimietopleidingsonderdelen = document.getElementById(
    "Menu1-menuItem014-subMenu-menuItem002"
  );
  const meldingafwezigheideninhaalexamen =
    document.getElementById("Menu1-menuItem015");
  const verklaringdigitaalexamen = document.getElementById("Menu1-menuItem016");
  const exchangeportaal = document.getElementById("Menu1-menuItem018");
  const uurexamenroosters = document.getElementById("Menu1-menuItem020");
  const onderwijsevaluatie = document.getElementById("Menu1-menuItem027");
  const meldingendienstonderwijs = document.getElementById("Menu1-menuItem029");
  const formulierenattestenovereenkomsten = document.getElementById(
    "Menu1-menuItem030-subMenu-menuItem000"
  );
  const studentpoint = document.getElementById("Menu1-menuItem031");
  const bijzondereomstandigheden = document.getElementById("Menu1-menuItem032");
  const studentvoorzieningenformulieren = document.getElementById(
    "Menu1-menuItem033-subMenu-menuItem000"
  );
  const jobstudentportaal = document.getElementById("Menu1-menuItem034");
  const studentstartup = document.getElementById("Menu1-menuItem038");
  const registrerenvoor = document.getElementById("Menu1-menuItem039");
  const blackboard = document.getElementById("Menu1-menuItem040");
  const initieelpaswoord = document.getElementById("Menu1-menuItem042");
  const campussoftware = document.getElementById("Menu1-menuItem044");
  const laptop = document.getElementById("Menu1-menuItem045");

  const buttonDict = {
    mijnburgerprofiel: mijnburgerprofiel,
    persoonlijkegegevens: persoonlijkegegevens,
    privacyvoorkeuren: privacyvoorkeuren,
    studentenkaart: studentenkaart,
    eid: eid,
    studiegeld: studiegeld,
    loopbaan: loopbaan,
    aanvraagstudietraject: aanvraagstudietraject,
    opleidingsonderdelen: opleidingsonderdelen,
    studiecontract: studiecontract,
    uitschrijvenopleiding: uitschrijvenopleiding,
    examencijfers: examencijfers,
    inschrijvingslimietopleidingsonderdelen:
      inschrijvingslimietopleidingsonderdelen,
    meldingafwezigheideninhaalexamen: meldingafwezigheideninhaalexamen,
    verklaringdigitaalexamen: verklaringdigitaalexamen,
    exchangeportaal: exchangeportaal,
    uurexamenroosters: uurexamenroosters,
    onderwijsevaluatie: onderwijsevaluatie,
    meldingendienstonderwijs: meldingendienstonderwijs,
    formulierenattestenovereenkomsten: formulierenattestenovereenkomsten,
    studentpoint: studentpoint,
    bijzondereomstandigheden: bijzondereomstandigheden,
    studentvoorzieningenformulieren: studentvoorzieningenformulieren,
    jobstudentportaal: jobstudentportaal,
    studentstartup: studentstartup,
    registrerenvoor: registrerenvoor,
    blackboard: blackboard,
    initieelpaswoord: initieelpaswoord,
    campussoftware: campussoftware,
    laptop: laptop,
  };

  Object.entries(buttonDict).forEach(([id, element]) => {
    const customButton = document.getElementById(id);

    if (customButton) {
      let currentTab = customButton.attributes.navTab.value;

      customButton.addEventListener("click", (event) => {
        event.preventDefault();
        chrome.runtime.sendMessage({
          action: "POST::updateCurrentTab",
          data: currentTab,
        });
        element.click();
      });
    }
  });

  roosterbtn.addEventListener("click", () => {
    let url = "https://mytimetable.uhasselt.be";
    window.open(url, '_blank').focus();
  });

}

function english_linkButtons() {

}

(() => {
  function loadCustomPage(lang) {
    document.body.classList.add("overflow-x-hidden","min-h-screen");
    function initNav() {
      let navWithLinks = document.getElementsByClassName("hasLinksNav");
      const navTab = document.getElementById("linksTab");

      let lastEl = null;
      let view = null;

      chrome.runtime.sendMessage({ action: "GET::currentTab" }, (response) => {
        if (response) {
          const currentTab = response.currentTab;
          // Selecteer alle elementen met het "navlink" attribuut
          const navLinks = document.querySelectorAll("[navlink]");
          let matchFound = false;

          // Loop door alle navlink-elementen
          navLinks.forEach((link) => {
            if (link.getAttribute("navlink") === currentTab) {
              link.classList.add("selectedNav");
              matchFound = true;
            }
          });

          // Als er geen match is gevonden, voeg dan "selectedNav" toe aan het element met id "home"
          const route = window.location.pathname;
          if (!matchFound || route === "/") {
            const homeElement = document.getElementById("defaultLink");
            if (homeElement) {
              homeElement.classList.add("selectedNav");
              navLinks.forEach((link) => {
                link.classList.remove("selectedNav");
              });
            }
          }
        }
      });

      chrome.runtime.sendMessage("GET::currentTab", (result) => {});

      Array.from(navWithLinks).forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
        });

        element.addEventListener("mouseover", () => {
          navTab.classList.remove("h-0");
          navTab.classList.add("h-[104px]");
          element.classList.add("border-b-3", "border-red-500");
          view = document.getElementById(element.attributes.navlink.value);
          view.classList.remove("hidden");
          lastEl = element;
        });

        element.addEventListener("mouseleave", () => {
          navTab.classList.remove("h-[104px]");
          navTab.classList.add("h-0");
          element.classList.remove("border-b-3", "border-red-500");
          view.classList.add("hidden");
          lastEl = element;
        });
      });

      navTab.addEventListener("mouseover", () => {
        navTab.classList.remove("h-0");
        navTab.classList.add("h-[104px]");
        view.classList.remove("hidden");
        lastEl.classList.add("border-b-3", "border-red-500");
      });

      navTab.addEventListener("mouseleave", () => {
        navTab.classList.remove("h-[104px]");
        navTab.classList.add("h-0");
        view.classList.add("hidden");
        lastEl.classList.remove("border-b-3", "border-red-500");
      });
    }

    function linkButtons() {
      const logout = document.getElementById("logOut");
      logout.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("Menu1-menuItem050").click();
      });

      if (lang == "dutch") {
        dutch_linkButtons();
      } else {
        english_linkButtons();
      }
    }



    const placeholder = document.getElementById("placeholder");

    function loadHomeContent() {
        function capitalizeFirstLetter(str) {
            if (!str) return str; // Handle empty strings
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    
        chrome.runtime.sendMessage(
            { action: "GET::html", page: "home", lang: settings_global.lang },
            (response) => {
                if (response.html) {
                    placeholder.innerHTML = response.html;
                }

                let table = null;
                let listContent = null;
                if (settings_global.lang == "nl") {
                  table = document.getElementsByClassName("luc2")[0];
                  listContent = table.querySelector("#Label3 ul");
                }
                else {
                  table = document.getElementsByClassName("luc2")[0];
                  listContent = table.querySelector("#Label4 ul");
                }
                
                Array.from(listContent.children).forEach((child) => {
                    child.innerText = capitalizeFirstLetter(child.innerText); // Fixed 'chile' typo
                });
    
                document.getElementById("content-studentName").innerText = `${studentData.Voornaam} ${studentData.Naam}`;
                document.getElementById("content-list").innerHTML = listContent.outerHTML; // Use outerHTML to properly insert content
            }
        );
    }

    function loadMeldingenContent() {
      function capitalizeFirstLetter(str) {
          if (!str) return str; // Handle empty strings
          return str.charAt(0).toUpperCase() + str.slice(1);
      }

      const tables = document.getElementsByClassName("luc");

      chrome.runtime.sendMessage(
          { action: "GET::contentPage", page: "mededelingen" },
          (response) => {
              if (response.html) {
                  placeholder.innerHTML = response.html;
              }

              const table = tables[0];
              const listContent = table.querySelector("#TMededeling");
  
              Array.from(listContent.children).forEach((child) => {
                  child.innerText = capitalizeFirstLetter(child.innerText); // Fixed 'chile' typo
              });
  
              document.getElementById("content-studentName").innerText = `${studentData.Voornaam} ${studentData.Naam}`;
              document.getElementById("content-list").innerHTML = listContent.outerHTML; // Use outerHTML to properly insert content
          }
      );
  }

    function loadLogout() {
        const body = document.getElementsByTagName("body")[0];
        console.log(settings_global.lang);
        chrome.runtime.sendMessage(
            { action: "GET::html", page: "logout", lang: settings_global.lang },
            (response) => {
                if (response.html) {
                    body.innerHTML = response.html;
                }
            }
        );
    }

    function loadContent() {
      const route = window.location.pathname;

      switch (route) {
        case "/Default.aspx":
          loadHomeContent();
          break;
        case "/sdsBurgeprofiel.aspx":
          loadBurgeprofielContent();
          break;
        case "/sdsAanvraagStudietraject.aspx":
          loadAanvraagStudieTrajectContent();
          break;
        case "/sdsTotOverIndTra.aspx":
          loadOpleidingsOnderdelenContent();
          break;
        case "/sdsStudiecontract.aspx":
          loadStudieContract();
          break;
        case "/sdsUitschrijven.aspx":
          loadUitschrijvenOpleidingContent();
          break;
        case "/sdsAantalKeerOpgenomen.aspx":
          loadInschrijvingsLimietContent();
          break;
        case "/sdsInschrijvingsgeld.aspx":
          loadStudieGeldContent();
          break;
        case "/sdsExCijf.aspx":
          loadExamenCijfersContent();
          break;
        case "/sdsVerklaringOpEerDigex.aspx":
          loadVerklaringOnlineExamenContent();
          break;
        case "/sdsPersGeg.aspx":
          loadPersoonlijkeGegevensContent();
          break;
        case "/sdsPrivacy.aspx":
          loadPrivacyContent();
          break;
        case "/sdsstudentenkaart.aspx":
          loadStudentenKaartContent();
          break;
        case "/sdsEID.aspx":
          loadEIDContent();
          break;
        case "/sdsDocumentenStudSecr.aspx":
          loadFormulierenAttestenContent();
          break;
        case "/sdsDocumenten.aspx":
          loadContent();
          break;
        case "/sdsLoopbaan.aspx":
          loadLoopbaanContent();
          break;
        case "/sdsStudentPoint.aspx":
          loadStudentPointContent();
          break;
        case "/sdsBijzondereOmstandigheid.aspx":
          loadBijzondereOmstandighedenContent();
          break;
        case "/sdsMededelingen.aspx":
          loadMeldingenContent();
          break;
        case "/sdsLicentie.aspx":
          loadSoftwareContent();
          break;
        case "/sdsJobstudentenPortaal.aspx":
          loadJobstudentContent();
          break;
        case "/sdsActiviteitenStudNieuw.aspx?activiteit=STARTUP":
          loadStartUpContent();
          break;
        case "/Shibboleth.sso/Logout":
            loadLogout();
            break;
        default:
          loadHomeContent();
          break;
      }
    }

    initNav();
    linkButtons();
    loadContent();
  }

  function loadCustomPageContent_DUTCH() {
    const default_taalButton = document.getElementById("Menu1-menuItem052");
    const taalButton = document.getElementById("langSwitch");

    function initButtons() {
      taalButton.addEventListener("click", (event) => {
        event.preventDefault();
        default_taalButton.click();
      });
    }

    initButtons();
    loadCustomPage("dutch");
  }

  function loadCustomPageContent_ENGLISH() {
    const default_taalButton = document.getElementById("Menu1-menuItem051");
    const taalButton = document.getElementById("langSwitch");

    function initButtons() {
      taalButton.addEventListener("click", (event) => {
        event.preventDefault();
        default_taalButton.click();
      });
    }

    initButtons();
    loadCustomPage("english");
  }

  function initDefaultWebFunctionality() {
    const nullFunction = () => {};
    const emptyObject = {};

    function disableFunctions() {
      window.skm_applyStyleInfoToElement = nullFunction;
      window.skm_styleInfo = function () {
        return emptyObject;
      };
      window.skm_mousedOverMenu = nullFunction;
      window.skm_mousedOverClickToOpen = nullFunction;
      window.skm_mousedOverSpacer = nullFunction;
      window.skm_mousedOutMenu = nullFunction;
      window.skm_mousedOutSpacer = nullFunction;
      window.skm_closeSubMenus = nullFunction;
      window.skm_shimSetVisibility = nullFunction;
      window.skm_doTick = nullFunction;
      window.skm_stopTick = nullFunction;
      window.preloadimages = nullFunction;
      window.setimage = nullFunction;
    }

    function removeDefaultStyling() {
      // Remove style tags
      document.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("style");
      });

      // Remove intra.css
      const linkToRemove =
        "https://cdn.uhasselt.be/ISALayout/2015_1/styles/intra.css";
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach((link) => {
        if (link.href === linkToRemove) {
          link.parentNode.removeChild(link); // Remove the <link> element
        }
      });
    }

    function hideBody() {
      const form = document.getElementById("form1");
      if (form) {
        form.classList.add("hidden");
      }
    }

    function loadRemixIcons() {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css";
      link.integrity =
        "sha512-kJlvECunwXftkPwyvHbclArO8wszgBGisiLeuDFwNM8ws+wKIw0sv1os3ClWZOcrEB2eRXULYUsm8OVRGJKwGA==";
      link.crossOrigin = "anonymous";
      link.referrerPolicy = "no-referrer";

      document.head.appendChild(link);
    }

    function loadCustomBody() {
      const customDiv = document.createElement("div");
      customDiv.id = "customBody";
      document.body.appendChild(customDiv);
      const body = document.getElementById("customBody");

      chrome.runtime.sendMessage(
        { action: "GET::custom_html", lang: studentData.Taal },
        (response) => {
          if (response.html) {
            body.innerHTML = response.html;
            if (response.lang == "dutch") {
              loadCustomPageContent_DUTCH();
            } else {
              loadCustomPageContent_ENGLISH();
            }
          }
        }
      );
    }

    let settings = settings_global;
    if (settings.enabled == "true") {
      hideBody();
      disableFunctions();
      removeDefaultStyling();
      loadRemixIcons();
      loadCustomBody();
    }
  }

    //  retrieve settings  and  do stuff based on them
    //  make settings global
  // First: Remove the default styles and hide the websites content, replace it with the custom html
  loadStudentData();
  updateSettings(initDefaultWebFunctionality);
})();

(() => {
  function DEBUG() {}

  DEBUG();
})();
