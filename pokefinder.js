
let searchBtn = document.getElementById('searchBtn');
let searchBox = document.getElementById('searchKeyword');
searchBox.onkeypress=(e)=>{
    if(e.keyCode === 13){
        searchBtn.click();
    }
};
const search=(keyword)=>{
    let goodResult = document.getElementById('goodResult');
    let usualResult = document.getElementById('usualResult');
    let notResult = document.getElementById('notResult');
    let lessResult = document.getElementById('lessResult');
    let monsterName = document.getElementById('monsterName');
    goodResult.innerHTML = keyword.goodResult;
    usualResult.innerHTML = keyword.usualResult;
    notResult.innerHTML = keyword.notResult;
    lessResult.innerHTML = keyword.lessResult;
    monsterName.innerHTML = keyword.monsterName;
    document.getElementById('searchResult').innerText = "검색 결과";
};
let noSearch=()=>{
    alert("포켓몬 이름을 확인해 주세요.");
};
searchBtn.onclick = ()=>{
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



    xhr.onload=(e)=>{
        try{
                 result = xhr.responseText;
                 parser = new DOMParser();
                 htmlDocument = parser.parseFromString(result,"text/html").documentElement;
                 good = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(3) > td > table > tbody > tr > td").innerHTML;
                 usual = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(2) > td > table > tbody > tr > td").innerHTML;
                 not = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(4) > td > table > tbody > tr > td").innerHTML;
                 less = htmlDocument.querySelector("#mw-content-text > table.roundy > tbody > tr:nth-child(5) > td > table > tbody > tr > td").innerHTML;
                name = htmlDocument.querySelector("#mw-content-text > table.w-100.mb-1 > tbody > tr > td:nth-child(2) > table > tbody > tr > td");
                if (name === null){
                    console.log(name);
                    name = htmlDocument.querySelector("#pokemon > div > table > tbody > tr> td:nth-child(2) > table > tbody > tr > td");
                    
                    console.log(name);
                }
                if (name !== null){
                    name = name.innerHTML;
                }
                
                search({goodResult:good, usualResult:usual, notResult:not, lessResult:less, monsterName:name });
        }catch(e){
            console.log({goodResult:good, usualResult:usual, notResult:not, lessResult:less, monsterName:name });
            console.log(e);
            noSearch();
        }
    }
    xhr.open("GET","https://pokemon.fandom.com/ko/wiki/"+encodeURI(searchKeyword)+"_("+encodeURI("포켓몬")+")",true);
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