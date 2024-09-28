const LoadProfile = () => {
    const param = localStorage.getItem("user_id");
    fetch(`https://offshift-api.vercel.app/account/user/?search=${param}`)
    .then((res) => res.json())
    .then((data) =>{
        ViewProfile(data);
    })
    .catch((error) => console.error('Error:', error));
}


const ViewProfile = (value) =>{
    const type = typeCheck(value);
    value.forEach ((data) => {
        const parent = document.getElementById("profile-section");
        const div = document.createElement("div")
        div.classList.add("li-profile");
        div.innerHTML = `
        <div class="card-profile">
        <img id="prof-image" src="./images/profile.png" alt="Profile Image" class="card-img-top mb-5" style="max-width: 10rem;">
        <div class="card-body">
            <h5 class ="color about-txt" >Username: <span class = "noColor "> ${data.username}</span></h5>
            <h5 class ="color about-txt" >Email: <span class = "noColor "> ${data.email}</span></h5>
            <h5 class ="color about-txt" >User type: <span class = "noColor "> ${data.user_type}</span></h5>
            <h5 class ="color about-txt" >Address: <span class = "noColor "> ${data.country}</span></h5>
            </div>
            </div>
        `;
        const about = document.getElementById('about-me');
        const element = document.createElement("div");
        element.classList.add("about_me_profile");
        element.innerHTML = `
            <h5 class ="about-txt" >About Me:</h5>
            <p> ${data.about_me} </p>
        `;
        parent.appendChild(div);
        about.appendChild(element);
    })
}

const getData = () => {
    const param = localStorage.getItem("user_id");
    console.log(param);
    console.log("ami ekhn user");
    fetch(`https://offshift-api.vercel.app/work/allProposal/?search=${param}`)
    .then((res) => res.json())
    .then((data) => {
        console.log('API response:', data);
        proposalTable(data); 
        jobTable(data)   
    })
    .catch((error) => console.error('Error:', error));
}

const jobData = () => {
    const param = localStorage.getItem("user_id");
    console.log(param);
    console.log("ami ekhn job user");
    fetch(`https://offshift-api.vercel.app/work/allProposal/?search=${param}`)
    .then((res) => res.json())
    .then((data) => {
        console.log('API response:', data);
        jobTable(data)   
    })
    .catch((error) => console.error('Error:', error));
}

const proposalTable = (value) => {
    console.log("ami proposal table e");
    
    value.forEach((data) => {
        const date = new Date(data.created_at).toLocaleDateString();
        const parent = document.getElementById("proposal-table");
        const div = document.createElement("tr");
        div.innerHTML = `
                <th scope="row">${data.work}</th>
                <td>${data.price}</td>
                <td>${date}</td>           
        `
        parent.appendChild(div);
    })
}

const jobTable = (value) => {
    console.log("ami job table e");
    console.log(value);
    value.forEach((data) => {
        const date = new Date(data.created_at).toLocaleDateString();
        const parent = document.getElementById("jobs-table");
        const div = document.createElement("tr");
        div.innerHTML = `       
                <th scope="row">${data.work}</th>
                <td>${data.price}</td>
                <td>${date}</td>
                <td> <a href="review_form.html?freelancerId=${data.freelancer}" id="job-btn"  class="btn btn-warning"> Review </a> </td>
        `;
        parent.appendChild(div);
    })
}

const profile_edit = () =>{
    fetch('https://offshift-api.vercel.app/account/edit-profile/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`, 
        }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("about_me").value = data.about_me ;  
        document.getElementById("username").value = data.username;
        document.getElementById("country").value = data.country;
        document.getElementById("email").value = data.email;
        if (data.image){
            document.getElementById("image").src = data.image
        }
    })
    .catch(error => console.error('Error:', error));
    
}

const edit = (event) => {
    event.preventDefault(); 
    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('country', document.getElementById('country').value);
    formData.append('about_me', document.getElementById('about_me').value);
    const imageFile = document.getElementById('image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch('https://offshift-api.vercel.app/account/edit-profile/', {
        method: 'PATCH',  
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: formData  
    })
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            window.location.href="./profile.html";
        } else {
            console.error('Error:', data);
            alert("Error updating profile");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("An error occurred while updating the profile.");
    });  
};

const typeCheck = (value) => {
    const user = value[0]; 
    localStorage.setItem("user_type", user.user_type);

    return user.user_type === 'freelancer' ? 1 : 0; 
}

LoadProfile();
getData();
jobData();
profile_edit();