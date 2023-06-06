async function forgotpassword(event){
    event.preventDefault();
    const email=event.target.email.value;
    const userDetails = {
        email: email
    }
    try{
        const post = await axios.post('http://localhost:3000/forgotpassword', userDetails);
        console.log(post);
        alert(post.data);
        location.href='../users/login.html';
    }
    catch(err){
        console.log(err);
        alert('Something went wrong');
    }
}