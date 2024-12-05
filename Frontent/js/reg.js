document.getElementById("name").addEventListener('keyup',(e)=>{
    res=hisName(e.target.value)
    document.getElementById("nam").textContent=res?"":"*please enter atleast 3 letters"
    document.getElementById("nam").style.color=res?"green":"red"
})

function hisName(data){
    const pattern=/^[A-Za-z].{2}/
    return pattern.test(data);
}


document.getElementById("address").addEventListener('keyup',(e)=>{
    res=address(e.target.value)
    document.getElementById("place").textContent=res?"":"*invalid address"
    document.getElementById("place").style.color=res?"green":"red"
})

function address(data){
    const pattern=/^[a-zA-Z0-9\s,.'-]{3,}$/ 
    return pattern.test(data);
}

