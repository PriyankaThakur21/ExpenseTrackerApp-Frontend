async function savedetails(event){
    event.preventDefault()
    const name=event.target.name.value;
    const email=event.target.email.value;
    const password=event.target.password.value;
    const obj={name,email,password};
    try{
    const post=await axios.post('http://localhost:3000/signin',obj);
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
        const post = await axios.post('http://localhost:3000/login',obj);
        alert(post.data);
    }
    catch(error){
        console.log(error.response.data);
        alert(error.response.data);
    }
}