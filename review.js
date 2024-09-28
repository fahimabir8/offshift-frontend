const submitReview = (event) => {
    const freelancerId = new URLSearchParams(window.location.search).get("freelancerId");
    const text = document.getElementById("letter").value;
    const ratings = document.getElementById("ratings").value;

    const data = ({
        body: text,
        rating: ratings,
        freelancer: freelancerId,
    });


    fetch(`https://offshift-api.vercel.app/account/post_review/?freelancerId=${freelancerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
        
    })
    
    
} 

const getUser = () => {
    const param = new URLSearchParams(window.location.search).get("freelancerId");
    fetch(`https://offshift-api.vercel.app/account/user/?search=${param}`)
    .then((res) => res.json())
    .then((data) =>{
        ShowUser(data);
    })
    .catch((error) => console.error('Error:', error));
};

const ShowUser = (value) =>{
    console.log('ami user freelancer');
    value.forEach ((data) =>{
        const parent = document.getElementById("name")
        const div = document.createElement("div")
        div.innerHTML = `
             <h4 class ="color fs-3 " >Username: <span class = "noColor fs-2"> ${data.username}</span></h4>
                    
        `;
        parent.appendChild(div);

    })
}

getUser();
submitReview();