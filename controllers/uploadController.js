

module.exports.getHomePage = (req, res) => {
    res.render("upload", { title: "Home Page", user: req.user});
}

module.exports.uploadFile = async (req, res) => {
    console.log("Uploaded file: ", req.file);
    try {
        if (!req.file) {
            return res.render("message", {
                title: "Status01",
                header: "Upload Failed",
                message: "No file uploaded."
            })
        }

        console.log("File saved to DB:", req.file);

        res.render("message", {
            title: "Status",
            header: "Upload Success",
            message: "File uploaded to database successfully."
        })
    } catch (error) {
        console.error("Error saving file to DB: ", error);
        res.render("message", {
            title: "Status02",
            header: "Upload Error",
            message: "There was an error saving your file."
        });
    }
}