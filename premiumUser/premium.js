function Premium(){
    const btn = document.getElementById('rzp-button1');
    btn.remove();
    document.getElementById('label1').innerHTML = 'You are a Premium User! <input type="button" id="leaderboardbtn" class="btn btn-sm btn-outline-info m-2" value="Show leaderboard"><input type="button" id="downloadexpense" class="btn btn-sm btn-outline-info m-2" value="Download"></input>';
    document.getElementById('leaderboardbtn').onclick=function() {showLeaderBoard()};
    document.getElementById('downloadexpense').onclick= function() {download()};
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

async function download(){
    try{
        const token = localStorage.getItem('token');
    const downloadfile = await axios.get('http://localhost:3000/download', { headers: {"Authorization" : token} });
    console.log('download successfull')
    var a = document.createElement('a');
    a.href = downloadfile.data;
    a.click();
    }
    catch(err){
        console.log(err);
    }
}
