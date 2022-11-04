var ImgName,ImgUrl;
var files=[];
var reader;
var i=1;
//config
const firebaseConfig = {
apiKey: "AIzaSyASbdInIwg6YBni_bHpZp_UiHqSmlvq5SI",
authDomain: "fir-1bb2b.firebaseapp.com",
databaseURL: "https://fir-1bb2b-default-rtdb.firebaseio.com",
projectId: "fir-1bb2b",
storageBucket: "fir-1bb2b.appspot.com",
messagingSenderId: "430569687878",
appId: "1:430569687878:web:1b8b4cc8574ea52c633347"
};
firebase.initializeApp(firebaseConfig)

document.getElementById("select").onclick=function(e){
var input=document.createElement('input')
input.type='file'

input.onchange= e =>{
    files=e.target.files;
    reader=new FileReader();
    reader.onload=function(){
        document.getElementById("myimg").src=reader.result;
    }
    reader.readAsDataURL(files[0])
}
input.click();
}
// uploading picture to storage
document.getElementById('upload').onclick=function(){
ImgName=document.getElementById('namebox').value;
var uploadTask=firebase.storage().ref('Images/'+ImgName+".png").put(files[0]);
uploadTask.on('state_changed',function(snapshot){
var UpProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
document.getElementById("UpProgress").innerHTML='Upload'+UpProgress+'%';
},
function(error){alert("error in saving the image")},
function(){
    uploadTask.snapshot.ref.getDownloadURL().then(function(url){
        ImgUrl=url;
        firebase.database().ref('Pictures/'+ImgName).set({
       Name:ImgName,
       Link:ImgUrl ,
    });
    alert("Image added Successfully");
    }
    );
   
});
}

//Retrieve Images
function addItemToList(desc,link){
    var post=document.getElementById('posts')
    var image=document.createElement('img')
    image.src=link;
    var cap=document.createElement('span')
    cap.innerHTML=`${desc}`
post.appendChild(image)
post.appendChild(cap)
}

function FetchAllData(){
    var db=firebase.database().ref().child("Pictures")
    db.on("value", function(b)
    {
    console.log(b);
    })
}
        

window.onload=FetchAllData()