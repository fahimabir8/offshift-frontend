const getJob = () => {
  const param = new URLSearchParams(window.location.search).get("jobId");
  console.log(param);
  console.log("ami ekhne");
  fetch(`https://offshift-api.vercel.app/work/list/?id=${param}`)
    .then((res) => res.json())
    .then((data) => jobDetails(data))
    // .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const category = () => {
  fetch("https://offshift-api.vercel.app/work/categories/")
    .then((res) => res.json())
    .then((data) => showCategory(data))
    .catch((error) => console.error("Error:", error));
};

const showCategory = (data) => {
  data.forEach((value) => {
    console.log("I am in show category");
    const parent = document.getElementById("category");
    const div = document.createElement("div");
    div.classList.add("category-element");
    div.innerHTML = `
        <div class="card mt-5" style="width: 13rem;">
            <div class="card-body" id="category">
                <h5 onclick="joblist('${value.name}')"> ${value.name} </h5>
            </div>
        </div>
        `;
    parent.appendChild(div);
  });
};

const jobDetails = (value) => {
  const user_type = localStorage.getItem('user_type')

  value.forEach((job) => {
    console.log("I am in job details");
    const parent = document.getElementById("details");
    const div = document.createElement("div");
    div.classList.add("job-cards");

    const lastActive = job.client.last_login
      ? new Date(job.client.last_login).toLocaleString()
      : "Never logged in";
    const memberSince = new Date(job.client.date_joined).toLocaleString();
    const country = job.client.country;
    const applyButton = user_type ==='freelancer' ? `<a href="proposal.html?jobId=${
            job.id
          }" target="_blank" class="btn btn-primary ms-5" id="propose-btn"> Apply Now </a>` : ``;
    div.innerHTML = `
              
      <div class="job-details-heading row"> 
        <div class="job-heading-details col-8 ps-5">
          <h3>${job.title}</h3>
          <div class="iconss d-flex gap-2">
            <i class="bi bi-geo-alt-fill fs-5"> </i>
            <p>Worldwide</p>
          </div>
          
          <div class="skills mb-3 d-flex justify-content-between">
            ${job?.category.map((item) => {
              return `<button id="category-btn" class="btn btn-secondary my-3">${item.name}</button>`;
            }).join('')}
          </div>
        </div>
        <div class="propose-details col-4"> 
        <div class="button-container">
          <button id="bookmark-btn" class="reaction-btn "><i class="fa-regular fa-bookmark"></i></button>
          <button id="love-btn" class="reaction-btn ms-4"><i class="fa-regular fa-heart"></i></button>
          ${applyButton}
        </div>
        </div>

      </div>

      <br> <br>
      <div class="project-footer row">
            <div class="project-details col-8">
            <h2 class="project-overview mb-4"> Project Overviews </h2>
      <div class="loads-of-idea row" style="width: 60%;">
        <div class="stack col-6">
          <i class="bi bi-currency-dollar fs-2"></i>
          <p>${job.budget}</p>
        </div>
        <div class="stack col-6">
          <i class="fa-solid fa-brain fs-3 pb-2 mt-2"></i>
          <p>${job.experience}</p>
        </div>
        <div class="stack col-6">
          <i class="bi bi-globe-central-south-asia fs-2"></i>
          <p>Remote Job</p>
        </div>
        <div class="stack col-6">
          <i class="fa-solid fa-briefcase fs-3 pb-2 mt-2"></i>
          <p>${job.time} months</p>
        </div>
      </div>
        
        <h4 class="mt-4"> Job Description</h4>
        <p>${job.description}</p>
        
        <br> <br>

      </div>
      
      <div class="client mt-5 p-5 col-4">
          <h4>About the client</h4>
          <h5 class="mt-4"> From </h5>
          <p> ${country} </p>
        <div class="client-work mt-4 row">
            <div class="client-stack col-6">
              <h6>Last Active</h6>
              <p>${lastActive}</p>
            </div>
            <div class="client-stack col-6">
              <h6>Memeber Since</h6>
              <p>${memberSince}</p>
            </div>
        </div>
      </div>
      </div> 
      
      `;
    parent.appendChild(div);
    const loveBtn = div.querySelector("#love-btn");
    const heartIcon = loveBtn.querySelector("i");

    loveBtn.addEventListener("click", () => {
      if (heartIcon.classList.contains("fa-regular")) {
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
      } else {
        heartIcon.classList.remove("fa-solid");
        heartIcon.classList.add("fa-regular");
      }
    });

    const bookBtn = div.querySelector("#bookmark-btn");
    const bookmarkIcon = bookBtn.querySelector("i");

    bookBtn.addEventListener("click", () => {
      if (bookmarkIcon.classList.contains("fa-regular")) {
        bookmarkIcon.classList.remove("fa-regular");
        bookmarkIcon.classList.add("fa-solid");
      } else {
        bookmarkIcon.classList.remove("fa-solid");
        bookmarkIcon.classList.add("fa-regular");
      }
    });


    const titleParent = document.getElementById("title-head");
    const title = document.createElement("title");

    title.innerHTML = `
        ${job.title}
      `;
    titleParent.appendChild(title);
  });
};


const proposalSubmission = (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("jobId");

  const price = document.getElementById("price").value;
  const content = document.getElementById("content").value;

  const data = {
    price,
    content,
  };

  fetch(`https://offshift-api.vercel.app/work/proposal/?jobId=${jobId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

const getUser = () => {
  fetch("https://offshift-api.vercel.app/account/user/")
    .then((res) => res.json())
    .then((data) => console.log(data));
};

getJob();
category();
getUser();

