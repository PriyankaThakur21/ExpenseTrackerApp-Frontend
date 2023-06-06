function Premium(){
    const btn = document.getElementById('rzp-button1');
    btn.remove();
    document.getElementById('label1').innerHTML = 'You are a Premium User! <input type="button" id="leaderboardbtn" class="btn btn-sm btn-outline-info m-2" value="Show leaderboard"><input type="button" id="totalexpenses" class="btn btn-sm btn-outline-info m-2" value="Show Total expenses"></input>';
    document.getElementById('leaderboardbtn').onclick=function() {showLeaderBoard()};
    document.getElementById('totalexpenses').onclick= function() {showTotalExpense()};
}

async function showLeaderBoard(){
    try{
    const users = await axios.get('http://localhost:3000/leaderboard');
    console.log(users.data);
    const leaderboardel = document.getElementById('leaderboard');
    leaderboardel.innerHTML+='<h3>Leader Board</h3>';
    for(i in users.data){
        leaderboardel.innerHTML+=`<li>${users.data[i].name}-${users.data[i].totalExpense}</li>`;
    }
    console.log(leaderboardel);
    }
    catch(err){
        console.log(err)
    }
}

function showTotalExpense(){
    location.href='./totalexpenses.html'
}