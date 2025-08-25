const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

function buildFolerOptions (folders, parentId = null, depth = 0) {
    let results = [];
    folders
        .filter(f => f.parentId === parentId)
        .forEach(f => {
            results.push({
                id: f.id,
                name: "-".repeat(depth * 2) + " " + f.folderName
            });
            results = results.concat(buildFolerOptions(folders, f.id, depth + 1));
        });
    return results;
}


module.exports.getHomePage = async (req, res) => {
    const folders = await prisma.folder.findMany();
    const files = await prisma.file.findMany();
    const folderOptions = buildFolerOptions(folders);
    res.render("upload", { title: "Home Page", user: req.user, folders: folders, folderOptions, files });
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

        const folderId = req.body.folderId ? parseInt(req.body.folderId) : 1;

        const fileRecord = await prisma.file.create({
            data: {
                userId: req.user.id,
                folderId: folderId,
                fieldName: req.file.fieldname,
                originalName: req.file.originalname,
                encoding: req.file.encoding,
                mimeType: req.file.mimetype,
                size: req.file.size,
                destination: req.file.destination,
                fileName: req.file.filename,
                path: req.file.path,
                buffer: req.file.buffer,
            }
        });

        console.log("File saved to DB:", fileRecord);

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

module.exports.createFolder = async (req, res) => {
    try {
        const { folderName, parentId } = req.body;

        const newFolder = await prisma.folder.create({
            data: {
                parentId: parentId ? parseInt(parentId) : 1,
                folderName: folderName
            }
        });
        console.log("Created folder: , ", newFolder);
        res.redirect("/");
    } catch (error) {
        console.error("Error creating folder: ", error);
        res.render("message", {
            title: "Status04",
            header: "Folder Error",
            message: "Failed to create folder."
        });
    }
}

module.exports.downloadFile = async (req, res) => {
    try {
        const fileId = parseInt(req.params.id);
        const file = await prisma.file.findUnique({
            where: { id: fileId }
        });

        if (!file) {
            return res.render("message", {
                title: "Status05",
                header: "Error",
                message: "File was not found."
            });
        }

        res.setHeader("Content-Disposition", `attachment; filename="${file.originalName}"`);
        res.setHeader("Content-Type", file.mimeType);

        res.send(file.buffer);
    } catch (error) {
        console.error("Error downloading file: ", error);
        res.render("message", {
            title: "Status05",
            header: "Error",
            message: "There was an error downloading the file."
        });
    }
}