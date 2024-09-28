fetch("navbar.html")
.then(res => res.text())
.then(data => {
    document.getElementById("navbar").innerHTML = data;

    const navElement = document.getElementById("user-section")

const token = localStorage.getItem("token")

if (token){
  const user_id = localStorage.getItem("user_id");
  const username = localStorage.getItem("name");
  const user_type = localStorage.getItem("user_type")
  const user = user_type === 'freelancer' ? `<a class="nav-link fs-5" href="./showProposal.html?userId=${user_id}"><li class="nav-item d-flex">
          <i class="fa-solid fa-magnifying-glass mt-2 mx-3"></i>My Proposals
        </li></a>` : `<a class="nav-link fs-5" href="./showJobs.html?userId=${user_id}"><li class="nav-item d-flex">
          <i class="fa-solid fa-magnifying-glass mt-2 mx-3"></i>My Jobs
        </li></a>`
  navElement.innerHTML += `
    <li class="nav-item ms-auto position-relative">
      <div class="nav-name d-flex align-items-center "> 
        <i class="fa-duotone fa-solid fa-user fs-4 px-3"></i>
        <h4>${username}</h4><i class="fa-solid fa-angle-down ps-2"></i>
      </div>
      <ul class="dropdown-hover">
      <a class="nav-link fs-5" href="./profile.html?userId=${user_id}"><li class="nav-item d-flex">
          <i class="fa-regular fa-user mt-2 mx-3"></i>Profile
        </li></a>
      
      ${user}
        
        <a id="logout" class="nav-link fs-5" onclick="handleLogout(event)" ><li class="nav-item d-flex">
        <i class="fa-solid fa-right-from-bracket mt-2 mx-3"></i>Logout
        </li></a>
        
      </ul>
    </li>
  `;
}
else {
  navElement.innerHTML += `
      <li class="nav-item">
        <a class="nav-link fs-5" href="./registration_login.html"><button class="btn register-btn">Login or Signup </button></a>
      </li>
    
      
  `
}

})

