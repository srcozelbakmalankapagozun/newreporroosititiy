const mediaFiles = ['../media/DoubleCrackyNOBG.png', '../media/DownsyndromeNOBG.png', '../media/JudenbabyNOBG.png', "../media/JuedistischeKNOBG.png"];


let varialbe = document.getElementById("vari");
let xwes = document.getElementById("xwes");
let status = document.getElementById("status");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function updateFavicon() {
    const favicon = document.getElementById('dynamic-favicon');
    const randomIndex = getRandomIntInclusive(0, mediaFiles.length - 1);
    favicon.href = `/media/${mediaFiles[randomIndex]}`;
}

async function updateEverySecond() {
    while (true) {
        await sleep(400);
        updateFavicon();
        await sleep(400);
        document.title = "fyliex";
        updateFavicon();

        // await sleep(400);
        // document.title = "@xwes";
        // updateFavicon();

        await sleep(400);
        document.title = "on top";
        updateFavicon();
    }
}

window.onload = function() {
    const link = document.createElement('link');
    link.id = 'dynamic-favicon';
    link.rel = 'icon';
    link.type = 'image/png';
    document.head.appendChild(link);

    updateEverySecond();
}

let isDragging = false;
let startPos = { x: 0, y: 0 };
let modalPos = { x: 0, y: 0 };

const configurations = {
    "vari": [
        { label: "dc:", content: "@sadecebusiness" },
        { label: "tg:", content: "@Modification" },
        { label: "mail:", content: "contact@fyliex.com" },
        { label: "tt:", content: "@roger"}
    ],
    // "xwes": [
    //     { label: "dc", content: "@xwes" },
    //     { label: "tg", content: "@xswesss"}
    // ],
    "status": [
        { label: "always", content: "online"}
    ]
};

document.getElementById('vari').addEventListener('click', function() {
    showModal(configurations.vari);
});
// document.getElementById('xwes').addEventListener('click', function() {
//    showModal(configurations.xwes);
// });

document.getElementById('status').addEventListener('click', function() {
    showModal(configurations.status);
});


function showModal(contentConfig) {
    let modal = document.getElementById('modal');
    
    if (!modal) {
        modal = createModal(contentConfig);
        document.body.appendChild(modal);
    } else {
        updateModalContent(modal, contentConfig);
    }
    
    modal.style.display = 'block';
}

function createModal(contentConfig) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = 'X';
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    const table = document.createElement('table');
    modal.table = table;

    contentConfig.forEach(item => {
        addContentToModal(table, item.label, item.content);
    });
    
    modal.appendChild(closeBtn);
    modal.appendChild(table);
    
    modal.addEventListener('mousedown', function(event) {
        isDragging = true;
        startPos = {
            x: event.clientX,
            y: event.clientY
        };
        modalPos = {
            x: modal.offsetLeft,
            y: modal.offsetTop
        };
    });
    
    window.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        
        const dx = event.clientX - startPos.x;
        const dy = event.clientY - startPos.y;
        
        modal.style.left = (modalPos.x + dx) + "px";
        modal.style.top = (modalPos.y + dy) + "px";
    });
    
    window.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    return modal;
}

function updateModalContent(modal, contentConfig) {
    while (modal.table.firstChild) {
        modal.table.removeChild(modal.table.firstChild);
    }
    
    contentConfig.forEach(item => {
        addContentToModal(modal.table, item.label, item.content);
    });
}

function addContentToModal(table, label, content) {
    const row = document.createElement('tr');
    const labelCell = document.createElement('td');
    labelCell.textContent = label;
    const contentCell = document.createElement('td');
    contentCell.textContent = content;
    row.appendChild(labelCell);
    row.appendChild(contentCell);
    table.appendChild(row);
}

function updateVisitCount() {
    fetch('../getVisits.php')
        .then(response => response.text())
        .then(visits => {
            document.getElementById('visitCounter').textContent = 'Visits: ' + visits;
        })
        .catch(error => {
            console.error('There was an error fetching the visit count:', error);
        });
}

updateVisitCount();
setInterval(updateVisitCount, 5000);

var muteButton = document.getElementById("audioButton");

muteButton.addEventListener('click', function() {
    if (audio.muted == false) {
        audio.muted = true;
        muteButton.textContent = "Unmute";
    }
    else {
        audio.muted = false;
        muteButton.textContent = "Mute"; 
    };
});


function updateMusic() {

    
    var raw = current.textContent;
    raw = raw.replace("https://ahmet.social/media/", "");
    raw = raw.replace("http://127.0.0.1:5500/media/", ""); 
    raw = raw.replace(/_/g, " ");
    raw = raw.replace(".mp3", "");
    
    current.textContent = raw;
}

updateMusic();

function redirectToAPI() {
    const cookieValue = document.getElementById('cookie').value;
    window.location.href = "https://127.0.0.1:5500/api/api.php?t=${encodeURIComponent(cookieValue)}";
}

function createSnowflake() {
    const snowFlake = document.createElement('div');
    snowFlake.classList.add('snowflake');
    snowFlake.textContent = '❄';
    snowFlake.style.left = Math.random() * 100 + 'vw';
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowFlake.style.opacity = Math.random();
    snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px';
    
    document.getElementById('snowflakes-container').appendChild(snowFlake);
    
    // Remove snowflake after it falls out of view
    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }
  
  // Create a snowflake every 100 milliseconds
  setInterval(createSnowflake, 100);
  