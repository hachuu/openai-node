import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Get the uploaded file
            console.log(' handler : ', req.body)
            const file = req.body.file;

            // Generate a unique filename
            const filename = `${uuidv4()}-${file.name}`

            // Write the file to disk
            const path = join(process.cwd(), 'public', filename)
            fs.writeFileSync(path, file.data)

            // Return the filename to the client
            res.status(200).json({ filename })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'An error occurred' })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    },
}

export default handler
