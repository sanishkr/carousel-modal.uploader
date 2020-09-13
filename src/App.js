import React, { useState } from "react";

import Carousel from './components/Carousel';

import "./styles.css";

export default function App() {
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState([])

  const mutiFileHandler = e => {
    const errs = [] 
    const files = Array.from(e.target.files)

    // console.log({files});
    
    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time';
      errs.push(msg);
    }

    // const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    const imgs = []
    files.forEach((file, i) => {

      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }

      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }

      if (errs.length === 0) {
        imgs.push({
          img: URL.createObjectURL(file),
          url: file.name
        })
        setImages([...images, ...imgs])
        // formData.append(i, file)
      }
    })

    if (errs.length) {
      console.error(errs)
    }
    setErrors(errs)

  }

  return (
    <div className="container">
      <Carousel
        images={images}
        duration={2}
        showNavigation
      />
      
      {
        errors.map((err, i) => <span key={i+1} className="error">{err}</span>)
      }
      <label htmlFor="multi">Add one or more images to carousel (max 3 at a time)</label>
      <input type='file' id='multi' onChange={mutiFileHandler} multiple />
    
      {/* <br/>
      <button onClick={() => setImages([])}>Remove all images from carousel</button> */}
    </div>
  );
}
