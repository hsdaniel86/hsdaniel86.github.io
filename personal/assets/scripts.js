// css class
const bclear = 'bclear';
const bodyDark= 'Dark';
const divDark = 'bgDark';
const pDark = 'pDark';

// html tags
const btn = document.getElementById('btn');
const body = document.querySelector('body');
const div = document.querySelectorAll('div');
const p = document.querySelectorAll('p');
const h3 = document.querySelectorAll('h3');
const image = document.querySelector('img');

function button() {

    alterClass();
}



function alterClass(){
    
    btn.classList.toggle(bclear);
    body.classList.toggle(bodyDark);
    image.classList.toggle('rounded-circle');
    
    for(i = 0; i < div.length; i++){
        div[i].classList.toggle(divDark)
    };

    for(i = 0; i < p.length; i++){
        p[i].classList.toggle(pDark)
    };

    for(i = 0; i < h3.length; i++){
        h3[i].classList.toggle('hDark')
    };
}


btn.addEventListener('click', button);