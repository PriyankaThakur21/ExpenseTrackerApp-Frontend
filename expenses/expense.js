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
    const page = 1;
    getExpenses(page)
    }
    catch(err){
    console.log(err)
    }
    event.target.reset();
}

function showonscreen(obj){
    const p=document.getElementById('Myexpense');
    p.innerHTML="";
    for(let i in obj){
    const list=document.createElement('li');
    list.id=obj[i].id
    list.textContent=list.textContent+obj[i].expense+' - '+obj[i].description+' - '+obj[i].category;
    const deletebtn=document.createElement('input')
    deletebtn.type='button'
    deletebtn.className='btn btn-info btn-sm';
    deletebtn.style='margin:10px'
    deletebtn.value='delete'
    deletebtn.onclick=function() {deletedata(obj[i].id)};
    list.appendChild(deletebtn)
    p.appendChild(list);
    }
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
    const parentel=document.getElementById('Myexpense');
    const childel=document.getElementById(id)
    parentel.removeChild(childel)
}

window.addEventListener('DOMContentLoaded', async ()=>{
    try{
        const page = 1;
    const token = localStorage.getItem('token');
    const rows = localStorage.getItem('rowslimit');
    const getExpenses= await axios.get(`http://localhost:3000/getexpenses?page=${page}`, {headers: {"Authorization": token, "rowslimit": rows}});
    console.log(getExpenses);
    if(getExpenses.data.premiumUser===true){
        Premium();
    }
    showonscreen(getExpenses.data.expense);
    showPagination(getExpenses.data);
}
    catch(error){
        console.log(error);
    }
})

function showPagination(data){
    const p = document.getElementById('pagination');
    p.innerHTML="";
    if(data.hasPreviousPage===true){ 
    const btn2 = document.createElement('button');
    btn2.innerHTML = `${data.previousPage}`;
    btn2.className = 'btn block p-1 m-1'
    btn2.onclick=function() {getExpenses(data.previousPage)};
    p.appendChild(btn2);
    }
    const btn1 = document.createElement('button');
    btn1.innerHTML = `${data.currentPage}`;
    btn1.className = 'btn block p-1 m-1'
    btn1.onclick=function() {getExpenses(data.currentPage)};
    p.appendChild(btn1);
    if(data.hasNextPage===true){
        const btn3 = document.createElement('button');
        btn3.innerHTML = `${data.nextPage}`;
        btn3.className = 'btn block p-1 m-1'
        btn3.onclick=function() {getExpenses(data.nextPage)};
        p.appendChild(btn3);
        }
}

async function getExpenses(page){
    try{
        const token = localStorage.getItem('token');
        const rows = localStorage.getItem('rowslimit');
        const myexpenses = await axios.get(`http://localhost:3000/getexpenses?page=${page}`, {headers: {"Authorization": token, "rowslimit": rows}});
        console.log(myexpenses.data);
        showonscreen(myexpenses.data.expense);
        showPagination(myexpenses.data);
    }
        catch(error){
            console.log(error);
        }
    }

document.getElementById('selectRows').addEventListener('change', (()=>{
    const rows=document.getElementById('selectRows').value;
    console.log(rows);
    localStorage.setItem('rowslimit', rows);
    location.reload();
}))