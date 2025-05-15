import mongoose from 'mongoose'

const ConnectDB = async () => { 
    try {
        await mongoose.connect(process.env.DATABASE_URL!)
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }    
}

export default ConnectDB