const dropdowns = document.querySelectorAll('.nav2 > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.navigation');

function handleDropdownOpen() {
    if (this.querySelector('.dropdown') == null) return;

    this.classList.add('tab-open');
    setTimeout(() => this.classList.contains('tab-open') && this.classList.add('tab-open-active'), 200);
    background.classList.add('open');
    
    const dropdown = this.querySelector('.dropdown');
    const dropdownSize = dropdown.getBoundingClientRect();
    const navSize = nav.getBoundingClientRect();
    const backgroundSize = {
        height: dropdownSize.height,
        width: dropdownSize.width,
        top: dropdownSize.top - navSize.top,
        left: dropdownSize.left - navSize.left
    }

    background.style.setProperty('height', `${backgroundSize.height}px`);
    background.style.setProperty('width', `${backgroundSize.width}px`);
    background.style.setProperty('transform', `translate(${backgroundSize.left}px, ${backgroundSize.top}px)`);
}

function handleDropdownClose() {
    this.classList.remove('tab-open', 'tab-open-active');
    background.classList.remove('open');
}

dropdowns.forEach(dropdown => dropdown.addEventListener('mouseenter', handleDropdownOpen));
dropdowns.forEach(dropdown => dropdown.addEventListener('mouseleave', handleDropdownClose));


const display = document.querySelector('.display');
const input = document.querySelector('.input');
const displayHeight = display.offsetHeight;
let p = document.createElement('p');
display.appendChild(p);

function handleReply(e) {
    e.preventDefault();
    const userEnter = this.input.value;
    this.reset();
    p.textContent = `> ${userEnter}`;
    p = document.createElement('p');
    display.appendChild(p);
    const reply = botReply(userEnter);
    p.innerHTML = `<span class="bot">AIdea: </span>${reply}`;
    p = document.createElement('p');
    display.appendChild(p);
    trimSize();
}

// hi & hello
// who are you
// bye & goodbye
// date
// time
function botReply(userInput) {
    userInput = userInput.toLowerCase();
    if (userInput.includes('hi') || userInput.includes('hello'))
        return 'Hi, nice to meet you!';
    else if (userInput.includes('who are you'))
        return 'I am AIdea, a chatbot prototype!';
    else if (userInput.includes('bye') || userInput.includes('goodbye'))
        return 'See you! Wish you have a nice day!';
    else if (userInput.includes('date')) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth()+1;
        const date = now.getDate();
        return `Today is ${date}/${month<10? '0': ''}${month}/${year}`;
    }
    else if (userInput.includes('time')) {
        const now = new Date();
        let hour = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        let ampm = 'AM';
        if (hour > 12) {
            hour -= 12;
            ampm = 'PM';
        }
        return `The time now is ${hour}:${min<10?'0':''}${min}:${sec<10?'0':''}${sec} ${ampm}`;
    }
    else if(userInput.includes('joke')){
        return 'hahahah';
    }
    else
        return 'Sorry, I can\'t understand';
}

function trimSize() {
    const nodes = display.children
    const elements = [...nodes];
    let total = elements.reduce((sum, element) => sum + element.offsetHeight, 0);
    if (total <= displayHeight) return;

    display.removeChild(nodes[0]);
    trimSize();
}

input.addEventListener('submit', handleReply);