function menu(e){
    switch( e.target.dataset['gamb']){
        case 'open':
            hideShowEl('headerMenuResp','block');
            hideShowEl('menuOverlay','block');
            disableScroll();
            var ob = document.getElementById('contentHWRP');
            ob.style.background = 'rgba(0,0,0,0.1)';
            openedFlag=true;
            break;
        case 'close':
            rotateGamb('gamburgerRes');
            moving('headerMenuResp','right');
            enableScroll();
            openedFlag=false;
            var ob = document.getElementById('contentHWRP');
            ob.style.background = '#FFF';
        break
   }
}
function moving (id,prop) {
    var pos = 0;
    var g = setInterval(move, 1);
    var ob = document.getElementById(id);

    function move() {
        pos -= 4;
        ob.style[prop] = pos+'px';
        if(pos <= -320) {
            clearInterval(g);
            hideShowEl('headerMenuResp','none');
            hideShowEl('menuOverlay','none');
        }
    }
}
function rotateGamb(id) {
    var deg = 90;
    var g = setInterval(move, 10);
    var ob = document.getElementById(id);

    function move() {
        deg -= 5;
        ob.style.transform = 'rotate(' + deg + 'deg)';
        if(deg <= 0) {
            clearInterval(g);
            ob.removeAttribute('style');
        }
    }
}
function hideShowEl(id,val){
    let el = document.getElementById(id);
    if(el){
        el.style.display = val;
        if(val=='none'){
            el.removeAttribute('style');
        }
    }
}
function elAddClass(id, className){
    let el = document.getElementById(id);
    if(el){
        el.classList.add(className); 
    }
}
function elRemClass(id, className){
    let el = document.getElementById(id);
    if(el){
        el.classList.remove(className); 
    }
}

var supPass = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', { get: function () { supPass = true; }  }));
} catch(e) {}
function prevDef(e) {  e.preventDefault();  }
function disableScroll() {
  window.addEventListener('onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel', prevDef, (supPass ? { passive: false } : false));
  window.addEventListener('touchmove', prevDef, (supPass ? { passive: false } : false));
}
function enableScroll() {
  window.removeEventListener('onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel', prevDef, (supPass ? { passive: false } : false)); 
  window.removeEventListener('touchmove', prevDef, (supPass ? { passive: false } : false));
}

function scrSize(){
    if(openedFlag){
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(w > 768){
            hideShowEl('headerMenuResp','none');
            hideShowEl('menuOverlay','none');
            enableScroll();
            openedFlag=false;
        }
    }
}






var openedFlag=false;
var containers = document.querySelectorAll('[data-gamb]');
for(let i=0,l=containers.length;i<l; i++){
    containers[i].onclick = menu;
}
window.onresize = scrSize;












/* POPUP */
function getData(ob){
    for(let i=0,l=ob.length;i<l;i++){
        if(ob[i].dataset['popup']){
            return ob[i].dataset['popup'];
        }
    }
}


function popupProc(e){
    let ob = document.getElementById('popupWrapper');
    ob.style.display = 'none';
    ob = document.getElementById('popupOverlay');
    ob.style.display = 'none';
    enableScroll();
    
    /* menu */
    ob = document.getElementById('contentHWRP');
    ob.style.background = 'rgb(255,255,255';
}
function getEl(id){
    return document.getElementById(id);
}
function popup(e){
    const name = getData(e.path);
    const d = get(name);
    let ob = document.getElementById('popupWrapper');
    ob.style.display = 'block';
    ob = getEl('popupimg');
    ob.style.background = "url('../../assets/images/our-friends-card-photo-"+d['img']+"') center no-repeat";
    ob = getEl('popuptitle');
    ob.innerText = name;
    ob = getEl("popupbreed");
    ob.innerText = d['type']+' - '+d['breed'];
    ob = getEl("popupdescribe");
    ob.innerText = d['description'];
    ob = getEl("popupage");
    ob.innerHTML = '<b>Age: </b>'+d['age'];
    ob = getEl("popupinoculations");
    ob.innerHTML = '<b>Inoculations: </b>'+d['inoculations'][0];
    ob = getEl("popupdiseases");
    ob.innerHTML = '<b>Diseases: </b>'+d['diseases'][0];
    ob = getEl("popupparasites");
    ob.innerHTML = '<b>Parasites: </b>'+d['parasites'][0];
    ob = getEl("popupOverlay");
    ob.style.display = 'block';
    disableScroll();
    /* menu */
    ob = getEl("contentHWRP");
    ob.style.background = 'rgba(0,0,0,0.1)';
}

var openedPopUpFlag=false;
containers = document.querySelectorAll('[data-popup]');
for(let i=0,l=containers.length;i<l; i++){
    containers[i].onclick = popup;
}

let popupCloseBtn = document.getElementById('closePopUp');
popupCloseBtn.onclick = popupProc;
popupCloseBtn = document.getElementById('popupOverlay');
popupCloseBtn.onclick = popupProc;

const d = document.getElementById('popupWrapper');

function get(name){
    for(let i=0,l=data.length;i<l; i++){
        if(data[i]['name'] === name){
            return data[i];
        }
    }
}


const data = [
        {
          "name": "Jennifer",
          "img": "jennifer.png",
          "type": "Dog",
          "breed": "Labrador",
          "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
          "age": "2 months",
          "inoculations": ["none"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Sophia",
          "img": "sophia.png",
          "type": "Dog",
          "breed": "Shih tzu",
          "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
          "age": "1 month",
          "inoculations": ["parvovirus"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Woody",
          "img": "woody.png",
          "type": "Dog",
          "breed": "Golden Retriever",
          "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
          "age": "3 years 6 months",
          "inoculations": ["adenovirus", "distemper"],
          "diseases": ["right back leg mobility reduced"],
          "parasites": ["none"]
        },
        {
          "name": "Scarlett",
          "img": "scarlett.png",
          "type": "Dog",
          "breed": "Jack Russell Terrier",
          "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
          "age": "3 months",
          "inoculations": ["parainfluenza"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Katrine",
          "img": "catrine.png",
          "type": "Cat",
          "breed": "British Shorthair",
          "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
          "age": "6 months",
          "inoculations": ["panleukopenia"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Timmy",
          "img": "timmy.png",
          "type": "Cat",
          "breed": "British Shorthair",
          "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
          "age": "2 years 3 months",
          "inoculations": ["calicivirus", "viral rhinotracheitis"],
          "diseases": ["kidney stones"],
          "parasites": ["none"]
        },
        {
          "name": "Freddie",
          "img": "freddie.png",
          "type": "Cat",
          "breed": "British Shorthair",
          "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
          "age": "2 months",
          "inoculations": ["rabies"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Charly",
          "img": "charly.png",
          "type": "Dog",
          "breed": "Jack Russell Terrier",
          "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
          "age": "8 years",
          "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
          "diseases": ["deafness", "blindness"],
          "parasites": ["lice", "fleas"]
        }
];
