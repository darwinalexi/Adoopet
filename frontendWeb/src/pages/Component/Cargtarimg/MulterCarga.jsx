import {Container} from "reactstrap"
import Dropzone from "react-dropzone"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
function Multerimg({props}) {
const [img, setimg]= useState({array : {}})

const handledrop=()=>{
    
}

    return(
        <Container>
            <Dropzone
            onChange={(e)=>setimg(e.target.value)}
            value={img}
            onDrop={handledrop}
            >
{({getRootProps, getInputProps})=>(
    <section>
        <div {...getRootProps({className:"dropzone"})}>
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faFile} />
            <p>coloca img aqui</p>
        </div>
    </section>
)}
            </Dropzone>
        </Container>
    )
}

export default Multerimg;