async function savedetails(event){
    event.preventDefault()
    const name=event.target.name.value;
    const email=event.target.email.value;
    const password=event.target.password.value;
    const obj={name,email,password};
    try{
    const post=await axios.post('http://localhost:8080/signin',obj);
    alert(post.data);
    }
    catch(err){
    console.log(err)
    alert(err.response.data);
    }
    event.target.reset();
}

async function loginUser(event){
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    const obj = {email, password};
    try{
        const post = await axios.post('http://localhost:8080/login',obj);
        location.href='expense.html';
    }
    catch(error){
        alert(error.response.data);
    }
}