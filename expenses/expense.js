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
        const page = 1;
    const token = localStorage.getItem('token');
    const getExpenses= await axios.get(`http://localhost:3000/getexpenses?page=${page}`, {headers: {"Authorization": token}});
    console.log(getExpenses);
    if(getExpenses.data.premiumUser===true){
        Premium();
    }
    showPagination(getExpenses.data);
}
    catch(error){
        console.log(error);
    }
})

function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage
}){
    const pagination = document.getElementById('pagination');
    pagination.innerHTML='';

    if(hasPreviousPage){
    const btn2 = document.createElement('button');
    btn2.innerHTML = previousPage;
    btn2.addEventListener('click', getExpenses(previousPage));
    pagination.appendChild(btn2);
    }
    const btn1 = document.createElement('button');
    btn1.innerHTML = currentPage;
    btn1.addEventListener('click', getExpenses(currentPage));
    pagination.appendChild(btn1);
    if(hasNextPage){
        const btn3 = document.createElement('button');
        btn3.innerHTML = nextPage;
        btn3.addEventListener('click', getExpenses(nextPage));
        pagination.appendChild(btn3);
        }
}

async function getExpenses(page){
    try{
        const token = localStorage.getItem('token');
        const getExpenses = await axios.get(`http://localhost:3000/getexpenses?page=
        ${page}`, {headers: {"Authorization": token}});
        if(getExpenses.data.premiumUser===true){
            Premium();
        }
        for(let i in getExpenses.data.expense){
            showonscreen(getExpenses.data.expense[i]);
        }
        showPagination(getExpenses.data);
    }
        catch(error){
            console.log(error);
        }
    }