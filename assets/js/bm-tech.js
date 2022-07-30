let arrayEvents = ["Boda", "Despedida Soltero(a)", "Pasar el rato"];
const arrayServices = ["Bartender", "Mesero", "Show Flair", "Cata Licores"];

let second = 0;

let bodaBartender = 15200,
    bodaMesero = 5500,
    freedayBartender = 7000,
    freedayMesero = 4500,
    flairForService = 300000,
    cataLicor = 2200000;

let freeday = {
    freedayBartender,
    freedayMesero
},
    boda = {
        bodaBartender,
        bodaMesero
    };

let events = {
    boda,
    freeday,
    flairForService,
    cataLicor

};

const overlayContainerAll = document.getElementById("overlay");
const popup = document.getElementById("popup");
const openPopup = document.getElementById("calcular");


const closeToPopup = () => {
    location.reload()
}

const timer = () => {
    let seconds = document.getElementById("seconds");
    setInterval(function () {
        seconds.innerHTML = second;
        if (second == 15) {
            second = 0;
            closeToPopup();
        }
        second++;
        s.style.strokeDashoffset = 440 - (440 * second) / 17;
    }, 1000);
}

const popupContainer = (dataPrice) => {
    overlayContainerAll.style.visibility = "visible";
    if (dataPrice == "") {
        console.log(dataPrice)
        overlayContainerAll.innerHTML = `
    <div class="popup" id="popup">
          <a href="#" id="btn-cerrar-popup" class="btn-cerrar-popup"><i class="fas fa-times"></i></a>
          <h2>Se cerrara en:</h2>
          <div class="container-all">
        <div class="circle" style="--color: #ffb03b;">
            <svg>
                <circle cx="65" cy="65" r="65" />
                <circle id="s" cx="65" cy="65" r="65" />
            </svg>
            <div id="seconds">00</div>
        </div>
    </div>
          <h2>No ingresaste los datos completos</h2>
          <button id="close" class="btn-book animate__animated animate__fadeInUp scrollto">Cerrar</button>
        </div>
    `;
    } else {
        console.log(typeof(dataPrice) + "data")
        overlayContainerAll.innerHTML = `
    <div class="popup" id="popup">
          <a href="#" id="btn-cerrar-popup" class="btn-cerrar-popup"><i class="fas fa-times"></i></a>
          <h2>Se cerrara en:</h2>
          <div class="container-all">
        <div class="circle" style="--color: #ffb03b;">
            <svg>
                <circle cx="65" cy="65" r="65" />
                <circle id="s" cx="65" cy="65" r="65" />
            </svg>
            <div id="seconds">00</div>
        </div>
    </div>
          <h2>Resultado</h2>
          <h2><span>Presupuesto:</span> $${dataPrice} COP</h2>
          <button id="close" class="btn-book animate__animated animate__fadeInUp scrollto">Cerrar</button>
        </div>
    `;
    }
    timer();
}

const functionsBM = () => {
    const nameEvent = document.getElementById("event").value;
    const numberPerson = document.getElementById("number-person").value;
    const hourService = document.getElementById("number-hour").value;
    let result = document.getElementById("result");
    //const typeMenu = document.getElementById("type-menu").value;
    const typeService = document.getElementById("services").value;
    let getTotal;

    for (let i = 0; i < arrayEvents.length; i++) {
        if (arrayEvents[i] === nameEvent) {
            let getPricesService = getPriceService(typeService);
            let getPriceForPerson = numberPerson * getPricesService;
            getTotal = new Intl.NumberFormat('es-ES').format(getPriceForPerson * hourService);
            result.innerHTML = `<strong>$${getTotal} COP</strong>`;
        }
    }
    if (getTotal == undefined) {
        getTotal = "";
    }
    console.log(typeof(getTotal))
    popupContainer(getTotal);
}

const disableScroll = () => {
    document.getElementById("body").style.overflow = "hidden";
}

const techOn = () => {
    overlayContainerAll.style.visibility = "visible";
    popup.style.visibility = "visible";
    popup.style.display = "block";
    setTimeout(functionsBM, 10000);
    disableScroll();
}

const getPriceService = (typeService) => {
    for (let i = 0; i < arrayServices.length; i++) {
        if (arrayServices[i] === typeService) {
            return events.boda.bodaBartender;
        }
    }
}

document.getElementById("calcular").addEventListener("click", techOn);