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



function popupProc(e){
    let ob = document.getElementById('popupWrapper');
    ob.style.display = 'none';
}

function popup(e){
    let ob = document.getElementById('popupWrapper');
    ob.style.display = 'block';
}

var openedPopUpFlag=false;
containers = document.querySelectorAll('[data-popup]');
for(let i=0,l=containers.length;i<l; i++){
    containers[i].onclick = popup;
}

const popupCloseBtn = document.getElementById('closePopUp');
popupCloseBtn.onclick = popupProc;

