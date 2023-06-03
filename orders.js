document.getElementById('rzp-button1').onclick = async function(e){
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/purchasepremium', {headers: {"Authorization": token}});
    var options = {
        "key": response.data.key_id, 
        "order_id": response.data.order.id, 
        "handler": async function (response){
            await axios.post('http://localhost:3000/transactionSuccess',{
            order_id:response.razorpay_order_id,
            payment_id:response.razorpay_payment_id
        },{headers: {"Authorization": token}}) 
        alert('You are a premium user now!');
        Premium();
    }
}
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response){
        alert('Something went wrong');
    })
    }
