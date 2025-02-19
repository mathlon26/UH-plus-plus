var studentData = {};
const DEBUG = true;

function dutch_linkButtons() {
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
}

function english_linkButtons() {}

(() => {
  function loadCustomPage(lang) {
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
          navTab.classList.add("h-auto");
          element.classList.add("border-b-3", "border-red-500");
          view = document.getElementById(element.attributes.navlink.value);
          view.classList.remove("hidden");
          lastEl = element;
        });

        element.addEventListener("mouseleave", () => {
          navTab.classList.remove("h-auto");
          navTab.classList.add("h-0");
          element.classList.remove("border-b-3", "border-red-500");
          view.classList.add("hidden");
          lastEl = element;
        });
      });

      navTab.addEventListener("mouseover", () => {
        navTab.classList.remove("h-0");
        navTab.classList.add("h-auto");
        view.classList.remove("hidden");
        lastEl.classList.add("border-b-3", "border-red-500");
      });

      navTab.addEventListener("mouseleave", () => {
        navTab.classList.remove("h-auto");
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
        const tables = document.getElementsByClassName("luc2");

        function capitalizeFirstLetter(str) {
            if (!str) return str; // Handle empty strings
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    
        chrome.runtime.sendMessage(
            { action: "GET::contentPage", page: "home" },
            (response) => {
                if (response.html) {
                    placeholder.innerHTML = response.html;
                }

                const table = tables[0];
                const listContent = table.querySelector("#Label3 ul");
    
                Array.from(listContent.children).forEach((child) => {
                    child.innerText = capitalizeFirstLetter(child.innerText); // Fixed 'chile' typo
                });
    
                document.getElementById("content-studentName").innerText = `${studentData.Voornaam} ${studentData.Naam}`;
                document.getElementById("content-list").innerHTML = listContent.outerHTML; // Use outerHTML to properly insert content
            }
        );
    }

    function loadLogout(tables) {
        const body = document.getElementsByTagName("body")[0];

        console.log(body);

        chrome.runtime.sendMessage(
            { action: "GET::contentPage", page: "logout" },
            (response) => {
                if (response.html) {
                    body.innerHTML = response.html;
                }
            }
        );
    }

    function loadContent() {
      const tables = document.getElementsByClassName("luc2");
      const route = window.location.pathname;

      switch (route) {
        case "/Default.aspx":
          loadHomeContent(tables);
          break;
        case "/sdsBurgeprofiel.aspx":
          loadBurgeprofielContent(tables);
          break;
        case "/sdsAanvraagStudietraject.aspx":
          loadAanvraagStudieTrajectContent(tables);
          break;
        case "/sdsTotOverIndTra.aspx":
          loadOpleidingsOnderdelenContent(tables);
          break;
        case "/sdsStudiecontract.aspx":
          loadStudieContract(tables);
          break;
        case "/sdsUitschrijven.aspx":
          loadUitschrijvenOpleidingContent(tables);
          break;
        case "/sdsAantalKeerOpgenomen.aspx":
          loadInschrijvingsLimietContent(tables);
          break;
        case "/sdsInschrijvingsgeld.aspx":
          loadStudieGeldContent(tables);
          break;
        case "/sdsExCijf.aspx":
          loadExamenCijfersContent(tables);
          break;
        case "/sdsVerklaringOpEerDigex.aspx":
          loadVerklaringOnlineExamenContent(tables);
          break;
        case "/sdsPersGeg.aspx":
          loadPersoonlijkeGegevensContent(tables);
          break;
        case "/sdsPrivacy.aspx":
          loadPrivacyContent(tables);
          break;
        case "/sdsstudentenkaart.aspx":
          loadStudentenKaartContent(tables);
          break;
        case "/sdsEID.aspx":
          loadEIDContent(tables);
          break;
        case "/sdsDocumentenStudSecr.aspx":
          loadFormulierenAttestenContent(tables);
          break;
        case "/sdsDocumenten.aspx":
          loadContent(tables);
          break;
        case "/sdsLoopbaan.aspx":
          loadLoopbaanContent(tables);
          break;
        case "/sdsStudentPoint.aspx":
          loadStudentPointContent(tables);
          break;
        case "/sdsBijzondereOmstandigheid.aspx":
          loadBijzondereOmstandighedenContent(tables);
          break;
        case "/sdsMededelingen.aspx":
          loadMeldingenContent(tables);
          break;
        case "/sdsLicentie.aspx":
          loadSoftwareContent(tables);
          break;
        case "/sdsJobstudentenPortaal.aspx":
          loadJobstudentContent(tables);
          break;
        case "/sdsActiviteitenStudNieuw.aspx?activiteit=STARTUP":
          loadStartUpContent(tables);
          break;
        case "/Shibboleth.sso/Logout":
            loadLogout(tables);
            break;
        default:
          loadHomeContent(tables);
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

    function loadStudentData() {
      document.querySelectorAll('input[type="hidden"]').forEach((input) => {
        if (input.name.startsWith("Top1$ih")) {
          var key = input.name.replace("Top1$ih", "");
          var key = key.replace("Top", "");
          studentData[key] = input.value || null;
        }
      });
    }

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




    hideBody();
    loadStudentData();
    disableFunctions();
    removeDefaultStyling();
    loadRemixIcons();
    loadCustomBody();
  }

    //  retrieve settings  and  do stuff based on them
    //  make settings global
  // First: Remove the default styles and hide the websites content, replace it with the custom html

  
  initDefaultWebFunctionality();
})();

(() => {
  function DEBUG() {}

  DEBUG();
})();
