const togglers = document.querySelectorAll(".caret");
const addBtns = document.querySelectorAll(".add-btn");
const modal = document.querySelector(".modal");
const clsBtn = document.querySelector(".clsBtn");

const fileFolderInput = document.getElementById("folderId");
const newFolderInput = document.getElementById("parentId");

for (let i = 0; i < togglers.length; i++) {
    togglers[i].addEventListener("click", function() {
        const nested = this.nextElementSibling?.tagName == "UL"
            ? this.nextElementSibling
            : this.nextElementSibling.nextElementSibling;

        if (nested && nested.tagName === "UL") {
            nested.classList.toggle("nested");
        }

        this.classList.toggle("caret-down");

        const addBtn = this.parentElement.querySelector(".add-btn");
        if (addBtn) {
            addBtn.classList.toggle("hidden");
        }
    })
}



addBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const folderId = btn.dataset.id || "";
        fileFolderInput.value = folderId;
        newFolderInput.value = folderId;
        console.log(folderId);
        
        modal.show();
    })
})

clsBtn.addEventListener("click", () => {
    modal.close();
})