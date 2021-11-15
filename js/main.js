const links = document.querySelectorAll('.card__nav__link')

let daily = []
let weekly = []
let monthly = []

// GET DATA

fetch('./data.json')
.then(response => response.json())
.then(data => {
    data.forEach((element)=>{
        daily.push(element.timeframes.daily)
        weekly.push(element.timeframes.weekly)
        monthly.push(element.timeframes.monthly)
    })
})

// SELECT OPTIONS TO VIEW DATA

links.forEach((link)=>{
    link.addEventListener('click', () => {
        removeClassActive()
        link.classList.add('active')
        switch(link.getAttribute('data-value')){
            case "daily":
                getHours(daily)
            break;
            case "weekly":
                getHours(weekly)
            break;
            case "monthly":
                getHours(monthly)
            break;
        }
    })
})

// BUTTON ACTIVE

function removeClassActive(){
    links.forEach((link)=>{
        link.classList.remove('active')
    })
}

// GET CURRENT AND PREVIOUS HOURS

function getHours(value){
    const timeCurrent = document.querySelectorAll('.time')
    const timePrevious = document.querySelectorAll('.previous')
    for(let i = 0; i < 6; i++){
        timeCurrent[i].innerHTML = `
         ${value[i]['current']}hrs
        `
        timePrevious[i].innerHTML = `
            ${value == daily ? "Yesterday" : value == weekly ? "Last Week" : "Last Month"} - ${value[i]['previous']}
        `
    }
}
