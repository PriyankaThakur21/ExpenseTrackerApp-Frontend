async function signup(event){
    event.preventDefault()
    const name=event.target.name.value;
    const email=event.target.email.value;
    const password=event.target.password.value;
    const obj={name,email,password};
    try{
    const post=await axios.post('http://localhost:3000/signin',obj);
    alert(post.data);
    location.href='login.html';
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
        const post = await axios.post('http://localhost:3000/login',obj);
        console.log(post);
        alert(post.data.message);
        localStorage.setItem('token', post.data.token);
        location.href='expense.html';
    }
    catch(error){
        console.log(error);
        alert(error.response.data);
    }
}

