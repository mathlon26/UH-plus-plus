var studentData = {};
let settings_global = {};

function loadStudentData(callback1, callback2) {
  document.querySelectorAll('input[type="hidden"]').forEach((input) => {
    if (input.name.startsWith("Top1$ih")) {
      var key = input.name.replace("Top1$ih", "");
      var key = key.replace("Top", "");
      studentData[key] = input.value || null;
    }
  });
  chrome.runtime.sendMessage({action: "POST::settings", key: "student_data", value: studentData}, (response) => {
    callback1(callback2);
  });
}

function updateSettings(callback) {
  let lang = studentData.Taal === "04" ? "en" : "nl";
  chrome.runtime.sendMessage(
    { action: "POST::settings", key: "lang", value: lang },
    (response) => {
      chrome.runtime.sendMessage({ action: "GET::settings" }, (response) => {
        settings_global = response.settings;
        callback();
      });
    }
  );
}

function dutch_linkButtons() {
  const roosterbtn = document.getElementById("uurRooster");
  const roosterbtn2 = document.getElementById("uurexamenroosters");
  const blackboardbtn = document.getElementById("blackboard");
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
    onderwijsevaluatie: onderwijsevaluatie,
    meldingendienstonderwijs: meldingendienstonderwijs,
    formulierenattestenovereenkomsten: formulierenattestenovereenkomsten,
    studentpoint: studentpoint,
    bijzondereomstandigheden: bijzondereomstandigheden,
    studentvoorzieningenformulieren: studentvoorzieningenformulieren,
    jobstudentportaal: jobstudentportaal,
    studentstartup: studentstartup,
    registrerenvoor: registrerenvoor,
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
    window.open(url, "_blank").focus();
  });

  roosterbtn2.addEventListener("click", (e) => {
    e.preventDefault();
    let url = "https://mytimetable.uhasselt.be";
    window.open(url, "_blank").focus();
  })

  blackboardbtn.addEventListener("click", (e) => {
    e.preventDefault();
    let url = "https://bb.uhasselt.be/ultra/stream";
    window.open(url, "_blank").focus();
  })
}

function english_linkButtons() {}

(() => {
  function loadCustomPage(lang) {
    document.body.classList.add("overflow-x-hidden", "min-h-screen");
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
              navLinks.forEach((other) => {
                other.classList.remove("selectedNav");
              });
              link.classList.add("selectedNav");
              matchFound = true;
            }
          });

          // Als er geen match is gevonden, voeg dan "selectedNav" toe aan het element met id "home"
          const route = window.location.pathname;
          if (!matchFound || route === "/") {
            const homeElement = document.getElementById("defaultLink");
            if (homeElement) {
              navLinks.forEach((link) => {
                link.classList.remove("selectedNav");
              });
              homeElement.classList.add("selectedNav");
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
          } else {
            table = document.getElementsByClassName("luc2")[0];
            listContent = table.querySelector("#Label4 ul");
          }

          Array.from(listContent.children).forEach((child) => {
            child.innerText = capitalizeFirstLetter(child.innerText); // Fixed 'chile' typo
          });

          document.getElementById(
            "content-studentName"
          ).innerText = `${studentData.Voornaam} ${studentData.Naam}`;
          document.getElementById("content-list").innerHTML =
            listContent.outerHTML; // Use outerHTML to properly insert content
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
        {
          action: "GET::html",
          page: "mededelingen",
          lang: settings_global.lang,
        },
        (response) => {
          if (response.html) {
            placeholder.innerHTML = response.html;
          }

          const table = tables[0];
          const listContent = table.querySelector("#TMededeling");

          Array.from(listContent.children).forEach((child) => {
            child.innerText = capitalizeFirstLetter(child.innerText); // Fixed 'chile' typo
          });

          document.getElementById(
            "content-studentName"
          ).innerText = `${studentData.Voornaam} ${studentData.Naam}`;
          document.getElementById("content-list").innerHTML =
            listContent.outerHTML; // Use outerHTML to properly insert content
        }
      );
    }

    function loadExamenCijfersContent() {
      chrome.runtime.sendMessage(
        {
          action: "GET::html",
          page: "examencijfers",
          lang: settings_global.lang,
        },
        (response) => {
          if (response.html) {
            // Vul de placeholder met de opgehaalde HTML
            placeholder.innerHTML = response.html;
            
            // --- Begin transformation code ---
            const lblExCijf = document.getElementById("lblExCijf");
            const modernTableContainer = document.getElementById("modernTable");
            
            if (lblExCijf && modernTableContainer) {
              // Zoek naar alle table-elementen in de container.
              const tables = lblExCijf.getElementsByTagName("table");
              // Gebruik de tweede tabel als deze beschikbaar is, anders de eerste.
              let oldTable = tables[1] || tables[0];
              
              if (!oldTable) {
                console.error("Geen tabel gevonden in lblExCijf.");
                return;
              }
              
              // Maak een nieuwe table met Tailwind CSS classes.
              const newTable = document.createElement("table");
              newTable.className = "min-w-full divide-y divide-gray-200 border border-gray-200";
              
              const newTbody = document.createElement("tbody");
              
              // Haal alle rijen uit de oude tabel.
              const rows = oldTable.querySelectorAll("tr");
              // Itereer over alle rijen, maar sla de laatste over.
              for (let i = 0; i < rows.length - 1; i++) {
                const row = rows[i];
                const newRow = document.createElement("tr");
                // Afwisselende achtergrondkleuren.
                newRow.className = i % 2 === 0 ? "bg-white" : "bg-gray-50";
                
                // Verwerk elke cel (th of td) in de rij.
                row.querySelectorAll("th, td").forEach((cell) => {
                  const tag = cell.tagName.toLowerCase();
                  const newCell = document.createElement(tag);
                  newCell.className = "px-4 py-2 border border-gray-200 text-sm text-gray-700";
                  newCell.innerHTML = cell.innerHTML;
                  
                  // Kopieer de colspan attribute indien aanwezig.
                  const colspan = cell.getAttribute("colspan");
                  if (colspan) {
                    newCell.setAttribute("colspan", colspan);
                  }
                  
                  // Als dit de nieuwe laatste rij is (voorlaatste van de originele tabel)
                  // en de cel bevat content, voeg dan een zwarte bovenrand toe.
                  if (i === rows.length - 2 && newCell.innerHTML.trim() !== "&nbsp;") {
                    newCell.classList.add("border-t-2", "border-black");
                    newCell.classList.remove("border", "border-gray-200");

                  }
                  
                  newRow.appendChild(newCell);
                });
                newTbody.appendChild(newRow);
              }
              
              newTable.appendChild(newTbody);
              // Maak de container leeg en voeg de nieuwe tabel toe.
              modernTableContainer.innerHTML = "";
              modernTableContainer.appendChild(newTable);
            }
            // --- End transformation code ---

            // Zoek de oude tabel op basis van de inline styles.
            const oldVoorwaardenTable = document.querySelectorAll("#lblCode table")[2];
            const tableCell = oldVoorwaardenTable.querySelector("td");
            const headings = tableCell.querySelectorAll("b");

            // Maak een nieuw container element voor de inhoud.
            const newContainer = document.createElement("div");
            // Tailwind classes voor mooie layout
            newContainer.className = "p-6 bg-white shadow-md rounded-md space-y-8";

            // Loop over alle <b>-elementen om secties te bouwen.
            // We nemen aan dat de tekst tot aan de volgende <b> hoort bij de huidige sectie.
            headings.forEach((heading, idx) => {
              // Maak een nieuw element voor de sectie
              const sectionDiv = document.createElement("div");
              sectionDiv.className = "mb-8";

              // Titel (kopje) in een h2
              const sectionTitle = document.createElement("h2");
              sectionTitle.className = "text-xl font-bold text-gray-800";
              sectionTitle.textContent = heading.innerText.trim();
              sectionDiv.appendChild(sectionTitle);

              // Verzamel de content die tussen dit <b> en het volgende <b> staat
              let next = heading.nextSibling;
              const contentNodes = [];
              while (
                next &&
                // Stop als we een nieuw <b>-element of <b>-parent bereiken
                !(next.nodeType === 1 && next.tagName === "B")
              ) {
                contentNodes.push(next);
                next = next.nextSibling;
              }

              // Bouw een container voor de sectietekst
              const contentWrapper = document.createElement("div");
              contentWrapper.className = "text-gray-700 leading-relaxed space-y-3";

              // Voeg alle losse nodes (p, ul, br, text, etc.) toe
              contentNodes.forEach((node) => {
                if (node.nodeName != "BR") {
                  contentWrapper.appendChild(node.cloneNode(true));
                }
              });

              // Voeg de sectietekst toe aan de sectie
              sectionDiv.appendChild(contentWrapper);

              // Voeg de sectie toe aan de nieuwe container
              newContainer.appendChild(sectionDiv);
            });

            // Plaats de nieuwe container in #voorwaarden
            const voorwaardenDiv = document.getElementById("voorwaarden");
            if (!voorwaardenDiv) {
              console.error("#voorwaarden niet gevonden.");
              return;
            }

            voorwaardenDiv.innerHTML = ""; // Maak leeg voor de nieuwe content
            voorwaardenDiv.appendChild(newContainer);

             // Zoek de span met de geraadpleegde datetimes
            const raadpleegSpan = document.getElementById("lblRaadpleegExCijf");
            // Zoek de placeholder div voor de activiteit
            const activiteitDiv = document.getElementById("activiteit");


            // Zoek de <ul> binnen de span
            const ul = raadpleegSpan.querySelector("ul");
            if (!ul) {
              activiteitDiv.textContent = "Geen activiteit data gevonden.";
              return;
            }

            // Haal alle <li> elementen op
            const liItems = ul.querySelectorAll("li");

            // Maak een nieuwe <ul> aan voor de geformatteerde lijst
            const newList = document.createElement("ul");
            newList.className = "list-none list-inside space-y-2 max-w-48";

            // Loop door alle items en maak voor elk een nieuwe <li> met TailwindCSS styling
            liItems.forEach(li => {
              const newLi = document.createElement("li");
              const newSpan = document.createElement("span");
              newSpan.classList.add("text-white", "text-center");
              newSpan.textContent = li.textContent.trim();
              newLi.className = "bg-red-600 bg-opacity-50 p-2 rounded shadow flex";
              const icon = document.createElement("li");
              icon.classList.add("ri-eye-fill","text-white", "mr-2");
              newLi.appendChild(icon);
              newLi.appendChild(newSpan);
              newList.appendChild(newLi);
            });

            // Voeg de nieuwe lijst toe aan de placeholder
            activiteitDiv.innerHTML = "";
            activiteitDiv.appendChild(newList);
          }
        }
      );
    }

    function loadPersoonlijkeGegevensContent() {
      chrome.runtime.sendMessage(
        {
          action: "GET::html",
          page: "persoonlijkegegevens",
          lang: settings_global.lang,
        },
        (response) => {
          if (response.html) {

            placeholder.innerHTML = response.html;

            function setupInputField(newField, origField)
            {
                if(origField.value)
                {
                    newField.value = origField.value;
                }
                newField.addEventListener("input", () => {
                    origField.value = newField.value;
                })

            }

            function setupSelector(newSelector, origSelector)
            {
                if(origSelector.value)
                {
                    newSelector.value = origSelector.value
                }

                newSelector.innerHTML = origSelector.innerHTML;

                newSelector.addEventListener("onchange", ()=>{
                    origSelector.value = newSelector.value;
                })
                    
            }

            // html elements
            // unchangable
            const studentId = document.getElementById("StudentID");
            const famName = document.getElementById("FamName");
            const name = document.getElementById("Name");
            const callName = document.getElementById("CallName");
            const nationality = document.getElementById("Nationality");
            const socSecNumber = document.getElementById("SocSec");
            const birth = document.getElementById("BirthPlace");
            const married = document.getElementById("Married");

            // changable
            const street = document.getElementById("Street");
            const streetNumber = document.getElementById("Number");
            const busNumber = document.getElementById("BusNumber");
            const country = document.getElementById("Country");

            const studStreet = document.getElementById("StudStreet");
            const studStreetNumber = document.getElementById("StudNumber");
            const studBusNumber = document.getElementById("StudBusNumber");
            const studCountry = document.getElementById("StudCountry");
            // hide weird scroll bar
            document.getElementById("ui-id-1").hidden = true;

            const tables = document.getElementsByClassName("luc2");

            const explanation = tables
            [1];
            const explanationContent =
              explanation.getElementsByClassName("Header")[0];

            const form = tables[2];

            // populate unchangable fields
            // studentid
            studentId.value =
              form.querySelector("#lblStamnummer").innerText;
            // things todo with main
            famName.value =
              form.querySelector("#lblNaam").innerText;
            name.value =
              form.querySelector("#lblVoornamen").innerText;
            // grayout roepnaam if it does not exist
            const roepnaamText = form.querySelector("#lblRoepnaam").innerText;

            if (roepnaamText) {
              callName.value = roepnaamText;
            } else {
              callName.value = "None";
              callName.classList.add("italic");
            }

            nationality.value =
              form.querySelector("#lblNation").innerText;
            socSecNumber.value =
              form.querySelector("#lblRijksReg").innerText;

            birth.value =
              form.querySelector("#lblGebDatPl").innerText;
            const marriedText = form.querySelector("#lblBurnaam").innerText;
            if (marriedText) {
              married.value =
              form.querySelector("#lblBurnaam").innerText;
            } else {
              married.value = "None";
              married
                .classList.add("italic");
            }


            // inputfields

            //home address
            setupInputField(street, form.querySelector("#tbWstraat"));
            
            setupInputField(streetNumber, form.querySelector("#tbWhuisnr"));
            setupInputField(busNumber, form.querySelector("#tbWbusnr"));

            setupSelector(country, form.querySelector("#hpDomicilieAdres_ddlLand"));
            
            //study address
            setupInputField(studStreet, form.querySelector("#tbSstraat"));
            
            setupInputField(studStreetNumber, form.querySelector("#tbShuisnr"));
            setupInputField(studBusNumber, form.querySelector("#tbSbusnr"));

            setupSelector(studCountry, form.querySelector("#hpStudieAdres_ddlLand"));
        }
        }
      );
    }

    function loadLogout() {
      const body = document.body;
      chrome.runtime.sendMessage(
        { action: "GET::html", page: "logout", lang: settings_global.lang },
        (response) => {
          if (response.html) {
            body.innerHTML = response.html;
          }
        }
      );
    }

    function loadUitschrijvenOpleidingContent() {
      chrome.runtime.sendMessage(
        { action: "GET::html", page: "uitschrijven", lang: settings_global.lang },
        (response) => {
          if (response.html) {
            placeholder.innerHTML = response.html;
          }
        }
      );
    }

    function loadOpleidingsOnderdelenContent() {
      chrome.runtime.sendMessage(
        { action: "GET::html", page: "opleidingsonderdelen", lang: settings_global.lang },
        (response) => {
          if (response.html) {
            placeholder.innerHTML = response.html;

            const stamnummer = document.getElementById('lblStamnummer')?.innerText || '';
            const studentNaam = document.getElementById('lblStudent')?.innerText || '';

            // Vul de studentinfo in het nieuwe blok
            const studentInfoDiv = document.getElementById('studentInfo');
            if (studentInfoDiv) {
              studentInfoDiv.textContent = stamnummer + ' - ' + studentNaam;
            }

            // Selecteer alle rijen (body en alter2) uit de oude tabel
            const oudeRijen = document.querySelectorAll('#Table1 tr.body, #Table1 tr.alter2');
            const nieuweTbody = document.getElementById('opleidingsonderdelenBody');

            // Loop over de rijen en vul onze nieuwe tabel
            oudeRijen.forEach((rij) => {
              const cellen = rij.querySelectorAll('td');
              if (cellen.length >= 9) {
                const academiejaar            = cellen[0].innerText.trim();
                const studieprogramma         = cellen[1].innerText.trim();
                const opleidingsonderdeelHTML = cellen[3].innerHTML.trim();
                const studiepunten            = cellen[4].innerText.trim();
                const eersteKans              = cellen[5].innerText.trim();
                const tweedeKans              = cellen[6].innerText.trim();
                const resultaat               = cellen[7].innerText.trim();

                // Maak een nieuwe rij in de nieuwe tabel
                const nieuweRij = document.createElement('tr');
                nieuweRij.innerHTML = `
                  <td class="border-b border-gray-200 py-2 px-4">${academiejaar}</td>
                  <td class="border-b border-gray-200 py-2 px-4">${studieprogramma}</td>
                  <td class="border-b border-gray-200 py-2 px-4">${opleidingsonderdeelHTML}</td>
                  <td class="border-b border-gray-200 py-2 px-4">${studiepunten}</td>
                  <td class="border-b border-gray-200 py-2 px-4">${eersteKans}</td>
                  <td class="border-b border-gray-200 py-2 px-4">${tweedeKans}</td>
                  <td class="border-b border-gray-200 py-2 px-4">${resultaat}</td>
                `;

                // Voeg de nieuwe rij toe aan de nieuwe tabel-body
                nieuweTbody.appendChild(nieuweRij);
              }
            });

          }
        }
      );
    }

    function updateNavigationTab(currentTab) {
      const navLinks = document.querySelectorAll("[navlink]");
      let matchFound = false;
      navLinks.forEach((link) => {
        if (link.getAttribute("navlink") === currentTab) {
            navLinks.forEach((other) => {
              other.classList.remove("selectedNav");
            });
            link.classList.add("selectedNav");
          matchFound = true;
        }
      });

      const route = window.location.pathname;
      if (!matchFound || route === "/") {
        const homeElement = document.getElementById("defaultLink");
        if (homeElement) {
          navLinks.forEach((link) => {
            link.classList.remove("selectedNav");
          });
          homeElement.classList.add("selectedNav");
        }
      }
    }

    function loadDefaultFallback() {
      chrome.runtime.sendMessage(
        { action: "GET::html", page: "fallback", lang: settings_global.lang },
        (response) => {
          if (response.html) {
            placeholder.innerHTML = response.html;
            document.getElementById("student_username").innerText = `${studentData.Voornaam} ${studentData.Naam}` || "student";
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
          updateNavigationTab("navTabGegevens");
          // loadBurgeprofielContent();
          loadDefaultFallback();
          break;
        case "/sdsAanvraagStudietraject.aspx":
          updateNavigationTab("navTabAdministratie");
          // loadAanvraagStudieTrajectContent();
          loadDefaultFallback();
          break;
        case "/sdsTotOverIndTra.aspx":
          updateNavigationTab("navTabAdministratie");
          loadOpleidingsOnderdelenContent();
          break;
        case "/sdsStudiecontract.aspx":
          updateNavigationTab("navTabAdministratie");
          // loadStudieContract();
          loadDefaultFallback();
          break;
        case "/sdsUitschrijven.aspx":
          updateNavigationTab("navTabAdministratie");
          loadUitschrijvenOpleidingContent();
          break;
        case "/sdsAantalKeerOpgenomen.aspx":
          updateNavigationTab("navTabAdministratie");
          // loadInschrijvingsLimietContent();
          loadDefaultFallback();
          break;
        case "/sdsInschrijvingsgeld.aspx":
          updateNavigationTab("navTabAdministratie");
          // loadStudieGeldContent();
          loadDefaultFallback();
          break;
        case "/sdsExCijf.aspx":
          updateNavigationTab("navTabExamens");
          loadExamenCijfersContent();
          break;
        case "/sdsVerklaringOpEerDigex.aspx":
          updateNavigationTab("navTabExamens");
          // loadVerklaringOnlineExamenContent();
          loadDefaultFallback();
          break;
        case "/sdsPersGeg.aspx":
          updateNavigationTab("navTabGegevens");
          loadPersoonlijkeGegevensContent();
          break;
        case "/sdsPrivacy.aspx":
          updateNavigationTab("navTabGegevens");
          // loadPrivacyContent();
          loadDefaultFallback();
          break;
        case "/sdsstudentenkaart.aspx":
          updateNavigationTab("navTabGegevens");
          // loadStudentenKaartContent();
          loadDefaultFallback();
          break;
        case "/sdsEID.aspx":
          updateNavigationTab("navTabGegevens");
          // loadEIDContent();
          loadDefaultFallback();
          break;
        case "/sdsDocumentenStudSecr.aspx":
          updateNavigationTab("navTabFormulieren");
          // loadFormulierenAttestenContent();
          loadDefaultFallback();
          break;
        case "/sdsDocumenten.aspx":
          updateNavigationTab("navTabFormulieren");
          // loadFormulierenContent();
          loadDefaultFallback();
          break;
        case "/sdsLoopbaan.aspx":
          updateNavigationTab("navTabStudie");
          // loadLoopbaanContent();
          loadDefaultFallback();
          break;
        case "/sdsStudentPoint.aspx":
          updateNavigationTab("navTabStudie");
          // loadStudentPointContent();
          loadDefaultFallback();
          break;
        case "/sdsBijzondereOmstandigheid.aspx":
          updateNavigationTab("navTabStudie");
          // loadBijzondereOmstandighedenContent();
          loadDefaultFallback();
          break;
        case "/sdsMededelingen.aspx":
          updateNavigationTab("navTabStudie");
          // loadMeldingenContent();
          loadDefaultFallback();
          break;
        case "/sdsLicentie.aspx":
          updateNavigationTab("navTabTools");
          // loadSoftwareContent();
          loadDefaultFallback();
          break;
        case "/sdsJobstudentenPortaal.aspx":
          updateNavigationTab("navTabWerk");
          // loadJobstudentContent();
          loadDefaultFallback();
          break;
        case "/sdsActiviteitenStudNieuw.aspx?activiteit=STARTUP":
          updateNavigationTab("navTabWerk");
          // loadStartUpContent();
          loadDefaultFallback();
          break;
        case "/Shibboleth.sso/Logout":
          loadLogout();
          break;
        case "/pdf/Leerkrediet.pdf", "/pdf/Plattegrond%20Campusshop%20Xod%20Diepenbeek.pdf", "/pdf/Plattegrond%20Campusshop%20Xod%20Hasselt.pdf":
          document.getElementById("customBody").remove();
          document.getElementsByTagName("embed")[0].classList.add("h-screen");
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
  loadStudentData(updateSettings, initDefaultWebFunctionality);
})();