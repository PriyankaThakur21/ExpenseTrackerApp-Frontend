async function saveExpense(event){
    event.preventDefault()
    const expense=event.target.amount.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    const obj={expense,description,category};
    try{
    const post=await axios.post('http://localhost:8080/postexpense',obj)
    showonscreen(post.data);
    }
    catch(err){
    console.log(err)
    }
    event.target.reset();
}

function showonscreen(obj){
    const p=document.getElementById('block');
    const list=document.createElement('li');
    list.id=obj.id
    list.textContent=list.textContent+obj.expense+'-'+obj.description+'-'+obj.category;
    const deletebtn=document.createElement('input')
    deletebtn.type='button'
    deletebtn.value='delete'
    // const editbtn=document.createElement('input')
    // editbtn.type='button'
    // editbtn.value='edit'
    // editbtn.onclick=function() {editdata(obj.id)};
    deletebtn.onclick=function() {deletedata(obj.id)};
    list.appendChild(deletebtn)
    // list.appendChild(editbtn)
    p.appendChild(list);
}

async function deletedata(userid){
    try{
    const dlt = axios.delete(`http://localhost:8080/deleteexpense/${userid}`);
    removeexpensefromscreen(userid);
    }
catch(err){
    console.log(err);
}
}

function removeexpensefromscreen(userid){
    const parentel=document.getElementById('block');
    const childel=document.getElementById(userid)
    parentel.removeChild(childel)
}

window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    const getExpenses= await axios.get('http://localhost:8080/getexpenses');
    for(let i in getExpenses.data){
        showonscreen(getExpenses.data[i]);
    }
}
    catch(error){
        console.log(error);
    }
})