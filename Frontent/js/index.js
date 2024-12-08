async function logDonorData() {
    const res=await fetch("http://localhost:3001/getdonors")
    if(res.status==200){
        const donors=await res.json();
        console.log(donors);
        let str1=""
        donors.forEach((donor,index)=>{
            str1+=`
                    <ul>
                        <li>
                        <input type="text" placeholder="Name" name="name" id="name-${donor._id}" value="${donor.name}" disabled="true"> 
                        <input type="text" placeholder="Address" name="address" id="address-${donor._id}" value="${donor.address}" disabled="true">
                        <input type="text" placeholder="gender" name="gender" id="gender-${donor._id}" value="${donor.gender}" disabled="true">
                        <input type="text" placeholder="B'Group" name="group" id="group-${donor._id}" value="${donor.group}" disabled="true">
                        <input type="text" placeholder="phonenumber" name="phone" id="phone-${donor._id}" value="${donor.phone}" disabled="true">
                        <button class="save">save</button>
                        <button class="edit" onclick="handleEdit('${donor._id}')">edit</button>
                        <button class="delete" onclick="handleDelete('${donor._id}')">delete</button>
                        </li>
                    </ul> 
               
            `
        });
        document.getElementById("content-div").innerHTML=str1
        
    }
}
logDonorData();


function handleEdit(id){
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`address-${id}`).disabled=false
    document.getElementById(`gender-${id}`).disabled=false
    document.getElementById(`phone-${id}`).disabled=false
    document.getElementById(`group-${id}`).disabled=false
}


async function handleDelete(id) {
    const res=await fetch("http://localhost:3001/delete",{
        method:"DELETE",
        headers:{"Content-type":"text/plain"},
        body:id
    })
    console.log(res);
    if(res.status==200){
        alert("Successfully Deleted..")
        logDonorData()
    }
    else{
        alert("Failed..")
    }
        
}