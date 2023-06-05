async function forgotpassword(event){
    event.preventDefault();
    const email=event.target.email.value;
    const userDetails = {
        email: email
    }
    try{
        const post = await axios.post('http://localhost:3000/password/forgotpassword', userDetails);
        console.log(post);
        alert('Email has been successfully sent');
        location.href='login.html';
    }
    catch(err){
        console.log(err);
    }
}