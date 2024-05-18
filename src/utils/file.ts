import fs from 'fs'
import path from 'path'

export const removeFolderContents = (folderPath: string) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err)
            return
        }
        files.forEach((file) => {
            const filePath = path.join(folderPath, file)

            fs.stat(filePath, (err, stat) => {
                if (err) {
                    console.error('Error getting file stat:', err)
                    return
                }

                if (stat.isDirectory()) {
                    // Recursively remove contents of subdirectories
                    removeFolderContents(filePath)
                } else {
                    // Remove individual files
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err)
                        }
                    })
                }
            })
        })
    })
}
