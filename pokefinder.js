
let searchBtn = document.getElementById('searchBtn');
let searchBox = document.getElementById('searchKeyword');

let goodResult = document.getElementById('goodResult');
let usualResult = document.getElementById('usualResult');
let notResult = document.getElementById('notResult');
let lessResult = document.getElementById('lessResult');
let monsterName = document.getElementById('monsterName');

let optionBtn = document.getElementById('optionBtn');
let modal = document.getElementById('optionModal');
let xBtn = document.getElementById('xBtn');
let options = document.getElementsByClassName('option1');
let resultData = null;

let checkGood = document.getElementById('checkGood');
let checkUseal = document.getElementById('checkUseal');
let checkNo = document.getElementById('checkNo');
let checkLess = document.getElementById('checkLess');

optionBtn.onclick = (e) => {
    modal.style.display = "block";
};
xBtn.onmouseover = (e)=>{
    document.getElementsByClassName("close")[0].style.opacity = 1;
};
xBtn.onmouseleave = (e)=>{
    document.getElementsByClassName("close")[0].style.opacity = 0.3;

}
let initX, initY, mousePressX, mousePressY;
modal.addEventListener('mousedown', (e)=> {

    e.preventDefault();
    initX = modal.offsetLeft;
    initY = modal.offsetTop;
    firstX = e.pageX;
    firstY = e.pageY;

    modal.addEventListener('mousemove', dragIt, false);

    window.addEventListener('mouseup', ()=> {
        modal.removeEventListener('mousemove', dragIt, false);
    }, false);

}, false);
dragIt =(e)=> {
    modal.style.left = initX+e.pageX-firstX + 'px';
    modal.style.top = initY+e.pageY-firstY + 'px';
}
let config = {
    good: true,
    usual: true,
    not: true,
    less: true
}
let reDisplay = () => {
    if (resultData === null)
        return;

    if (config.good) {
        goodResult.innerHTML = resultData.goodResult;
        document.getElementById('goodDescription').style.display = 'block';
    }
    else {
        goodResult.innerHTML = "";
        document.getElementById('goodDescription').style.display = 'none';
    }
    if (config.usual) {
        usualResult.innerHTML = resultData.usualResult;
        document.getElementById('usualDescription').style.display = 'block';
    }
    else {
        usualResult.innerHTML = "";
        document.getElementById('usualDescription').style.display = 'none';
    }
    if (config.not) {
        notResult.innerHTML = resultData.notResult;
        document.getElementById('notDescription').style.display = 'block';
    }
    else {
        notResult.innerHTML = "";
        document.getElementById('notDescription').style.display = 'none';
    }
    if (config.less) {
        lessResult.innerHTML = resultData.lessResult;
        document.getElementById('lessDescription').style.display = 'block';
    }
    else {
        lessResult.innerHTML = "";
        document.getElementById('lessDescription').style.display = 'none';
    }




    if (config.usual)
        usualResult.innerHTML = resultData.usualResult;
    else
        usualResult.innerHTML = "";
    if (config.not)
        notResult.innerHTML = resultData.notResult;
    else
        notResult.innerHTML = "";
    if (config.less)
        lessResult.innerHTML = resultData.lessResult;
    else
        lessResult.innerHTML = "";
}

for (let option of options) {
    option.onchange = (e) => {
        config[option.value] = !config[option.value];
        reDisplay();
    }
}
checkGood.onclick = (e)=>{
    options[0].checked = !options[0].checked;
}
checkUseal.onclick = (e)=>{
    options[1].checked = !options[1].checked;
}
checkNo.onclick = (e)=>{
    options[2].checked = !options[2].checked;
}
checkLess.onclick = (e)=>{
    options[3].checked = !options[3].checked;
}

xBtn.onclick = (e) => {
    modal.style.display = "none";
}
searchBox.onkeypress = (e) => {
    if (e.keyCode === 13) {
        searchBtn.click();
    }
};
const search = () => {
    reDisplay();
    searchBox.value = "";
    monsterName.innerHTML = resultData.monsterName;
    document.getElementById('searchResult').innerText = "검색 결과";

};
let noSearch = () => {
    alert("포켓몬 이름을 확인해 주세요.");
};
searchBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    let searchKeyword = searchBox.value;
    let result = null;
    let parser = null;
    let htmlDocument = null;
    let good = null;
    let usual = null;
    let not = null;
    let less = null;
    let name = null;



    xhr.onload = (e) => {
        try {
            result = xhr.responseText;
            parser = new DOMParser();
            htmlDocument = parser.parseFromString(result, "text/html").documentElement;
            good = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(3) > td > table > tbody > tr > td").innerHTML;
            usual = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(2) > td > table > tbody > tr > td").innerHTML;
            not = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(4) > td > table > tbody > tr > td").innerHTML;
            less = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(5) > td > table > tbody > tr > td").innerHTML;
            name = htmlDocument.querySelector("#mw-content-text > table.w-100.mb-1 > tbody > tr > td:nth-child(2) > table > tbody > tr > td");
            if (name === null) {
                console.log(name);
                name = htmlDocument.querySelector("#pokemon > div > table > tbody > tr> td:nth-child(2) > table > tbody > tr > td");

                console.log(name);
            }
            if (name !== null) {
                name = name.innerHTML;
            }
            resultData = { goodResult: good, usualResult: usual, notResult: not, lessResult: less, monsterName: name };
            search();
        } catch (e) {
            noSearch();
        }
    }
    xhr.open("GET", "https://pokemon.fandom.com/ko/wiki/" + encodeURI(searchKeyword) + "_(" + encodeURI("포켓몬") + ")", true);
    xhr.send();




}


// searchBtn.onclick = ()=>{
//     let searchKeyword = document.getElementById('searchKeyword').innerText;
//     let url = "https://pokemon.fandom.com/ko/wiki/"+encodeURI("특수기능")+":"+encodeURI("찾기")+"?query="+encodeURI(searchKeyword);
//     fetch(url,{
//         method:"GET"
//     }).then(resp=>{
//         let parser = new DOMParser();
//         let htmlDocument = parser.parseFromString(resp.text(),"text/html").documentElement;
//         console.log(resp);
//         alert(resp.body.text);


//         let good = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(3) > td > table > tbody > tr > td").innerHTML;
//         let usual = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(2) > td > table > tbody > tr > td").innerHTML;
//         let not = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(4) > td > table > tbody > tr > td").innerHTML;
//         let less = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(5) > td > table > tbody > tr > td").innerHTML;
//         let name = htmlDocument.querySelector("#mw-content-text > table.w-100.mb-1 > tbody > tr > td:nth-child(2) > table > tbody > tr > td").innerHTML;
//         search({goodResult:good, usualResult:usual, notResult:not, lessResult:less, monsterName:name });
//     });
// };

// chrome.tabs.executeScript({
//     code: 'good = document.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(3) > td > table > tbody > tr > td").innerHTML; usual = document.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(2) > td > table > tbody > tr > td").innerHTML; not = document.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(4) > td > table > tbody > tr > td").innerHTML; less = document.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(5) > td > table > tbody > tr > td").innerHTML; name = document.querySelector("#mw-content-text > table.w-100.mb-1 > tbody > tr > td:nth-child(2) > table > tbody > tr > td").innerHTML ; let res = {goodResult:good, usualResult:usual, notResult:not, lessResult:less ,monsterName:name } ; res '
// },(result)=>{
//     let m_td = result[0];
//     searchBtn.onclick = ()=>{

//         fetch(url,{
//             method:"GET"
//         }).then(resp=>{

//         })
//         search(m_td);
//     };

// });