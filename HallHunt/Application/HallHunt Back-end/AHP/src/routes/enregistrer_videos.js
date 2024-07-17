
const {Videos_upload}= require('../db/sequelize')


const path= require("path")
const multer =require("multer");

const cors= require("cors")


const uploadDir = path.join(__dirname, './public/data/uploads');
//const imagePath = path.join(uploadDir, 'uploads', `${filename}.jpg`);


const  MIME_TYPES={
  "video/mp4" : "mp4",
 }
const storage =multer.diskStorage({
  destination : (req,file,cb)=>
  {
     cb(null,"./public/data/uploads/videos")
  },
  filename : (req,file,cb)=>{
    const name=file.originalname.split(" ").join("_")
    const extention= MIME_TYPES[file.mimetype]
    
    cb(null, name+ "_"+Date.now()+ "."+extention);
  }
})


 const upload= multer({storage:storage,
  
  }
  ).any('file')



module.exports= (server) => {

  server.post('/api/uploads/video/:id',upload,cors(),async (req,res)=>{
    var videos
try{
    
    let  hote="https://mighty-basin-23915-3716ff42a384.herokuapp.com"
     let  videos = req.files.map(file=>({path:hote+file.path.replace(/\\/g, "/"),chemin:file.path.replace(/\\/g, "/"),nom:file.originalname,id_repertoire:req.params.id}));
     await Videos_upload.bulkCreate(videos)
     res.json({videos})
   }
    catch(error) {
  
  const message="la formations n'a pas pue etre ajouter"

  console.log(error);
  res.status(500).json({message, data:error})
  
}})
}
  
  

  