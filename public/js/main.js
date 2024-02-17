function deleteJob(id){
    if(confirm("Are you sure to delete this job posting?")){
        fetch(`/jobs/${id}`, {
            method: "DELETE"
        })
        .then((response) => {
            if(response.ok){
                window.location.replace("/jobs")
            }
        })
    }
}