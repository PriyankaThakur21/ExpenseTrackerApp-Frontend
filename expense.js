async function saveExpense(event){
    event.preventDefault()
    const expense=event.target.amount.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    const obj={expense,description,category};
    try{
    const token = localStorage.getItem('token');
    const post=await axios.post('http://localhost:3000/postexpense',obj, {headers: {"Authorization": token}});
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

async function deletedata(userid){
    try{
    const token = localStorage.getItem('token');
    const dlt = axios.delete(`http://localhost:3000/deleteexpense/${userid}`, {headers: {"Authorization": token}});
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
    const token = localStorage.getItem('token');
    const getExpenses= await axios.get('http://localhost:3000/getexpenses', {headers: {"Authorization": token}});
    if(getExpenses.data.premiumUser===true){
        Premium();
    }
    for(let i in getExpenses.data.expense){
        showonscreen(getExpenses.data[i]);
    }
}
    catch(error){
        console.log(error);
    }
})

function Premium(){
    const btn = document.getElementById('rzp-button1');
    btn.remove();
    document.getElementById('label1').innerHTML = 'You are a Premium User! <button id="leaderboardbtn" class="btn btn-sm btn-outline-info m-2">Show leaderboard</button>';
}