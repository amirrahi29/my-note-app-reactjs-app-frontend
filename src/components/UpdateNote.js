import React,{useState,useEffect} from "react";
import {useParams,useNavigate} from 'react-router-dom';

const UpdateNote = ()=>{

    //params
    const param = useParams();

    const auth = localStorage.getItem('user');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState('');
    const [loader, isLoading] = useState(false);

    //navigate
    const navigate = useNavigate();

    //getnote by id
    useEffect(()=>{
        getNoteById();
    },[]);

    const getNoteById=async()=>{
        let result = await fetch("http://localhost:9000/api/get_notes_by_id",{
            method:'post',
            body:JSON.stringify({"note_id":param.id}),
            headers:{
                'Content-Type':'application/json',
                'authorization':JSON.parse(auth).token
            }
        });

        result = await result.json();
        if(result.success === true){
            setTitle(result.data.title);
            setDescription(result.data.description);
            setImageUrl(result.data.image);
        }else{
            console.log("no response");
        }
    }


    //image handle
    const handleImageChange=(e)=>{
        console.log(e.target.files);
        setImage(e.target.files[0]);
    }

    const submitUpdateNote = async()=>{
        isLoading(true);
        const formData = new FormData();
        formData.append('note_id', param.id);
        formData.append('title',title);
        formData.append('description',description);
        formData.append('image',image);

        let result = await fetch("http://localhost:9000/api/update_note",{
            method:'post',
            body:formData,
            headers:{
                'authorization':JSON.parse(auth).token
            }
        });

        result = await result.json();
        if(result.success === true){
            console.log(result);
            isLoading(false);
            navigate('/');
        }
        else if(result.success === false){
            console.log(result.msg);
            isLoading(false);
        }
        else{
            console.log('no response');
            isLoading(false);
        }

    }

    return (
        <div>
            <div className="addNoteForm">
                <h5>Update Note</h5>
                <hr />
                <div>
                <img src={"http://localhost:9000/NotesImages/"+imageUrl} style={{borderRadius:8}}
                         height={150} width={200} />
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Title</label>
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter title" className="form-control" />
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Description</label>
                            <textarea  value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter description" className="form-control" rows={5}></textarea>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Choose Image</label>
                            <input type="file" onChange={handleImageChange}  placeholder="Enter title" className="form-control" />
                        </div>
                    </div>
                </div>

                <br />

                {loader?<div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>:<div className="row">
                    <div className="col-md-12">
                        <button className="form-control" onClick={submitUpdateNote}>Submit</button>
                    </div>
                </div>}
                
            </div>
        </div>
    )
}

export default UpdateNote;