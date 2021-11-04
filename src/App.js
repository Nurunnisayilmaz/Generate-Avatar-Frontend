import {useState} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


function App() {
    const [uploadImage, setUploadImage] = useState(undefined);
    const [image, setImage] = useState([]);
    const [cartoon, setCartoon] = useState(undefined);
    const onFileChange = e => {
        setUploadImage(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0])
        console.log(e.target.files[0])
    }

    function onFileUpload() {
        if (image) {
            var formData = new FormData();
            formData.append('img', image);
            axios.post("http://127.0.0.1:5000/generateavatar", formData).then(res => {
                setCartoon(res.data)
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const download = () => {
        if (uploadImage){
            const link = document.createElement("a");
            link.href = `data:image/jpeg;base64,${cartoon}`;
            link.setAttribute("download", "avatar.jpg");
            document.body.appendChild(link);
            link.click();
        }

    }

    return (
        <>
            <header className="mb-auto">
                <div>
                    <h3 className="float-md-start mb-0">Generate Avatar</h3>
                </div>
            </header>

            <main className="px-3">
                <h2>Fotoğraftan Avatar Oluşturucu</h2>
                <p className="lead mt-3"> Solda bulunan kutuya profil fotoğrafınızı yükleyin ve sağ kutuda avatarınızın
                    oluşmasını bekleyin. </p>
                <div className="container mb-5 mt-5">
                    <div className="row">
                        <div className="col-12 col-lg-6 border border-white">
                            <div className="container">
                                <div className="row mb-4">
                                    <div className="col mt-4">
                                        {uploadImage ? <img width="350" height="450" src={uploadImage}/> :
                                            <svg className="bd-placeholder-img img-thumbnail" width="350" height="450"
                                                 xmlns="http://www.w3.org/2000/svg" role="img"
                                                 preserveAspectRatio="xMidYMid slice" focusable="false">
                                                <rect width="100%" height="100%" fill="#C0C0C0"/>
                                                <text x="50%" y="50%" dy=".3em" fill="white">Profil fotoğrafınızı seçin
                                                </text>
                                            </svg>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="file" onChange={(e) => onFileChange(e)}/>
                                        <div className="clearfix"/>
                                        <br/>
                                        <button type="button" className="btn btn-light mb-4"
                                                onClick={onFileUpload}>Oluştur
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 border border-white">
                            <div className="container">
                                <div className="row mb-4">
                                    <div className="col mt-4">
                                        {cartoon ? <img  width="400" height="450" src={`data:image/jpeg;base64,${cartoon}`}/> :
                                            <svg className="bd-placeholder-img img-thumbnail" width="350" height="450"
                                                 xmlns="http://www.w3.org/2000/svg" role="img"
                                                 preserveAspectRatio="xMidYMid slice" focusable="false">
                                                <rect width="100%" height="100%" fill="#C0C0C0"/>
                                                <text x="50%" y="50%" dy=".3em" fill="white"></text>
                                            </svg>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button type="button" className="btn btn-light" onClick={download}>Kaydet</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto"></footer>
        </>

    );
}

export default App;
