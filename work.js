const joblist = (search, order) => {
  document.getElementById("job").innerHTML = "";
  fetch(`https://offshift-api.vercel.app/work/list/?search=${search ? search : ""}&ordering=${order ? order : ""}`)
    .then((res) => res.json())
    .then((data) => allJobs(data))
    .catch((error) => console.error('Error:', error));
};


const allJobs = (value) => {
    value.forEach((job) => {
        console.log("I am in all jobs");
        const parent = document.getElementById("job");
        const div = document.createElement("div");
        div.classList.add("col-lg-4","col-md-6","col-sm-6");
       
        div.innerHTML = `
        
        <div class="card job-card mt-5" style="width: 28rem; max-height: 800px">
          <div class="card-body job-card-body p-4">
            <h4 class="card-title">${job.title}</h4>
            <h6> time : ${job.time} months </h6>
            
            <div class="job-category d-flex justify-content-md-between">
            
            ${job?.category.map((item) => {
              return `<button id="category-btn" class="btn btn-secondary my-3">${item.name}</button>`;
            }).join('')}
            </div>
            <div class="extra d-flex justify-content-between">
              <div class="price">
                <h6>$${job.budget}</h6>
                <p>Budget</p>
              </div>
              <div class="experience">
                <h6>${job.experience}</h6>
                <p>Experience Level</p>
              </div>
            </div>
            <a id="job-btn" href="jobdetails.html?jobId=${job.id}" target="_blank" class="btn btn-success">See more</a>
          </div>
        </div>
        `;
        parent.appendChild(div)
    });
};

const category = () => {
  fetch("https://offshift-api.vercel.app/work/categories/")
      .then((res) => res.json())
      .then((data) =>  showCategory(data))
      .catch((error) => console.error('Error:', error));
}

const showCategory = (data) => {
  data.forEach((value) => {
      console.log("I am in show category");
      const parent = document.getElementById("category");
      const div = document.createElement("div");
      div.classList.add("category-element");
      div.innerHTML = `
      <div class="card" style="width: 13rem;">
          <div class="card-body"  onclick="joblist('${value.name}')" id="category-body">
              <h5 > ${value.name} </h5>
          </div>
      </div>
      `;
      parent.appendChild(div)
  });
};

category();
joblist();