window.addEventListener('DOMContentLoaded', async ()=>{
    try{
        const users = await axios.get('http://localhost:3000/leaderboard');
        console.log(users.data);
        const leaderboard = document.getElementById('leaderboard');
        for(i in users.data){
            leaderboard.innerHTML+=`<tr><td>${users.data[i].name}</td><td>${users.data[i].email}</td><td>${users.data[i].totalExpense}</td></tr>`;
        }
        console.log(leaderboard);
        }
        catch(err){
            console.log(err)
        }
})