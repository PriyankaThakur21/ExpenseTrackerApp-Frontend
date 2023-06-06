async function saveExpense(event){
    event.preventDefault()
    const expense=event.target.amount.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    const obj={expense,description,category};
    try{
    const token = localStorage.getItem('token');
    const post=await axios.post('http://localhost:3000/postexpense',obj, {headers: {"Authorization": token}});
    console.log(post);
    showonscreen(post.data);
    }
    catch(err){
    console.log(err)
    }
    event.target.reset();
}

function showonscreen(obj){
    const p=document.getElementById('form');
    const list=document.createElement('li');
    list.id=obj.id
    list.textContent=list.textContent+obj.expense+' - '+obj.description+' - '+obj.category;
    const deletebtn=document.createElement('input')
    deletebtn.type='button'
    deletebtn.className='btn btn-info btn-sm';
    deletebtn.style='margin:10px'
    deletebtn.value='delete'
    deletebtn.onclick=function() {deletedata(obj.id)};
    list.appendChild(deletebtn)
    p.appendChild(list);
}

async function deletedata(id){
    try{
    const token = localStorage.getItem('token');
    const dlt = axios.delete(`http://localhost:3000/deleteexpense/${id}`, {headers: {"Authorization": token}});
    removeexpensefromscreen(id);
    }
catch(err){
    console.log(err);
}
}

function removeexpensefromscreen(id){
    const parentel=document.getElementById('form');
    const childel=document.getElementById(id)
    parentel.removeChild(childel)
}

window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    const token = localStorage.getItem('token');
    const getExpenses= await axios.get('http://localhost:3000/getexpenses', {headers: {"Authorization": token}});
    if(getExpenses.data.premiumUser===true){
        Premium();
    }
    console.log(getExpenses.data.expense);
    for(let i in getExpenses.data.expense){
        showonscreen(getExpenses.data.expense[i]);
    }
}
    catch(error){
        console.log(error);
    }
})