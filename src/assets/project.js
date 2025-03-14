
const dialog = document.querySelector("dialog");
const add=document.getElementById("add");
const cancelButton = document.querySelector(".cancel");
const projectForm=document.getElementById("projectForm");
const projectInput=document.getElementById("projectTitle");

//when add button is clicked a dialog box opens for a new project
add.addEventListener("click",()=>{
    dialog.showModal();
});


//Closing the dialog box when cancel button is pressed
cancelButton.addEventListener("click",()=>{
    dialog.close();
});



projectForm.addEventListener("submit",(e)=>{
    e.preventDefault();


    displayProjectSidebar(projectInput);
    dialog.close();
    projectForm.reset();
})
