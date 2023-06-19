function Premium(){
    const btn = document.getElementById('rzp-button1');
    btn.remove();
    document.getElementById('label1').innerHTML = 'You are a Premium User! <input type="button" id="leaderboardbtn" class="btn btn-sm btn-outline-info m-2" value="Show leaderboard"><input type="button" id="downloadexpense" class="btn btn-sm btn-outline-info m-2" value="Download"></input>';
    document.getElementById('leaderboardbtn').onclick=function() {showLeaderBoard()};
    document.getElementById('downloadexpense').onclick= function() {download()};
}

function showLeaderBoard(){
    location.href = '../leaderboard/leaderboard.html'
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
