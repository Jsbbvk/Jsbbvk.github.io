    var NodeTemp;
        var nodes = 2;
    class Job {
      constructor (title, description, location, link) {
          this.title = title;
          this.description = description;
          this.location = location;
          this.link = link;
          
          this.Print = function() {
              var parent = document.getElementById("JobList");
              var child = NodeTemp.cloneNode(true);
              child.id = "Job" + nodes;
              nodes++;
             
                var children = child.children;
              children[0].innerHTML = this.title;
              children[1].innerHTML = this.description;
              children[2].innerHTML = this.location;
              children[3].setAttribute("href", this.link);
              var line = document.createElement('hr');
              line.color = "#ffffff";
              child.appendChild(line);
               parent.appendChild(child);
          }
      }  
    };
    var jobs = [];
    var tags;
    function init() {
         NodeTemp = document.getElementById("Job1");
        
        //declare jobs here
        
        //Sales and marketing(find a new one)
        jobs.push(new Job("Sales and Marketing", "Learn the fundamentals of sales and marketing", "Cupertino", "http://recruit.hirebridge.com/v3/Jobs/JobDetails.aspx?bid=3&jid=311533&cid=7678&locvalue=1035#.WlvH5ainHb0"));
        
        //West African monsoon climate modeling
        jobs.push(new Job("West African Climate modelling - By NASA", "Research West African climate and the the socio economic condition of the area", "New York, NY", "https://neuvoo.com/view/?id=b0tikvg3qt&source=linkedin&utm_source=partner&utm_medium=linkedin&puid=3aeecdcgf9ccdac73ae5g9da3ae9cd9df9&splitab=1&action=emailAlert"));
        
        //Sanata Clara Valley Medical center
        jobs.push(new Job("Santa Clara Valley Medical Center", "Assits proffesional and technical employees with performance of their duties", "Santa Clara County", "https://www.scvmc.org/Pages/home.aspx"));
        
        //Biology and Geroscience
        jobs.push(new Job("Biomedical and Geroscience", "Learn and explore the science of aging and learn about the different age related diseases.", "Novato, CA", "https://neuvoo.com/view/?id=chh5u2utm8&source=linkedin&utm_source=partner&utm_medium=linkedin&puid=3aedcac8fac8ddcb39ebgdde39eb89dc3a&splitab=1&action=emailAlert"));
        
        jobs.push(new Job("Public service trainee", "Learn how things work in the public service sector and the airport", "Cupertino High School", "https://www.glassdoor.com/job-listing/public-service-trainee-2018-high-school-summer-internship-san-francisco-department-of-public-works-JV_IC1147401_KO0,57_KE58,98.htm?jl=2619756971&utm_source=google_jobs&utm_medium=organic"));
        
        jobs.push(new Job("Summer 2018 technology intern","Learn about technology and how to enter the tech market" , "SalesForce, San Francisco, CA", "https://www.helpwanted.com/577158eac9474-Summer-2018-Intern-Technology-Compliance-job-listings"));
        
        jobs.push(new Job("Developing Associate", "learn the art of data management and how data works.", "developing Associate", "http://www.genesysworks.org/about-us/careers/development-associate-bay-area/"));
        
        jobs.push(new Job("Part Time social media intern", "Learn about the dfferent aspects of media and journalism through youtube.", "GlobalGirlMedia", "https://www.tun.com/jobs/job/part-time-social-media-intern-for-video-trainingjournalism-ngo/amp/"));

        
        
        //setup onkeydown 
        document.getElementById("JobText").onkeydown = function(e){
           if(e.keyCode == 13){
             Search();
               window.scrollTo(10000, offset(document.getElementById("JobResultTitle")).top);
           }
        };
    }    
        
    function Search() {
        var str = document.getElementById("JobText").value;
        tags = str.split(' ');
        for (var t in tags) {
            console.log(tags[t]);
        }
        var firstJob = false;
        console.log(firstJob);
        for (var i = 0; i < jobs.length; i++) {
            var jb = jobs[i];
            for (var j = 0; j < tags.length; j++) {
                var tag = tags[j];
                if (jb.description.toLowerCase().indexOf(tag.toLowerCase()) != -1) {
                    
                    if (!firstJob) {
                        while (document.getElementById("JobList").firstChild) {
                            document.getElementById("JobList").removeChild(document.getElementById("JobList").firstChild);
                        }
                        firstJob = true;
                    }
                    jb.Print();
                } else if (jb.description.toLowerCase().indexOf(tag.toLowerCase()) != -1) {
                    
                    if (!firstJob) {
                        while (document.getElementById("JobList").firstChild) {
                            document.getElementById("JobList").removeChild(document.getElementById("JobList").firstChild);
                        }
                        firstJob = true;
                    }
                    jb.Print();
                }
            }
        }
    }
    //function that get the x and y position of the elemnt
    function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
