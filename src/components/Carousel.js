import React from 'react';
import { Dot, FilledDot } from './Dots';
import ImageModal from './ImageModal';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      showModal: false,
      selectedIndex: -1,
    }

    this.changeImage = this.changeImage.bind(this)
    this.nextImage = this.nextImage.bind(this)
    this.prevImage = this.prevImage.bind(this)
    this.selectImage = this.selectImage.bind(this)
    this.pauseImage = this.pauseImage.bind(this)
  }
  nextImage() {
    const numberOfImages = this.props.images.length; 

    if (this.state.index === numberOfImages - 1) {
      this.setState({
        index: 0
      })
    } else {
      const newIndex = this.state.index + 1
      this.setState({
        index: newIndex
      })
    }
  }
  prevImage() {
    const numberOfImages = this.props.images.length; 

    if (this.state.index === 0) {
      this.setState({
        index: numberOfImages - 1
      })
    } else {
      const newIndex = this.state.index - 1
      this.setState({
        index: newIndex
      })
    }
  }
  changeImage() {
    const miliseconds = this.props.duration * 1000;
    const numberOfImages = this.props.images.length; 

    window.clearInterval(this.timer);

    if (this.props.images.length) {
      this.timer = setInterval(() => {
        if (this.state.index === numberOfImages - 1) {
          this.setState({
            index: 0
          })
        } else {
          const newIndex = this.state.index + 1
          this.setState({
            index: newIndex
          })
        }
      }, miliseconds)
    }
  }
  selectImage(indexBtn) {
    this.setState({
      index: indexBtn
    })
  }
  pauseImage() {
    window.clearInterval(this.timer);
  }
  componentDidMount() {
    this.changeImage()
  }
  componentDidUpdate() {
    this.changeImage()
  }
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
  render() {
    const { images } = this.props; 
    // console.log({images});
    
    return (
      <div className='slider-wrapper'>
        <div 
          className='wrapper' 
          onMouseOver={this.pauseImage}  
          onMouseOut={this.changeImage}
        >
          {images.length && images[this.state.index]?.url
            ? <a 
                href={images[this.state.index].url} 
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    selectedIndex: this.state.index,
                    showModal: true,
                  })
                  // this.props.modalcb(this.state.index)
                }}
              >
                <img 
                  src={images[this.state.index]["img"]} 
                  alt='Carousel Img Item' 
                />
              </a>
            : null
          }
          {this.props.showNavigation && <ul className='buttons-slider'>
            {images.map((image, index) => (
              <li key={index}>
                {index === this.state.index
                  ? <button className='btn'><FilledDot /></button>
                  : <button onClick={() => this.selectImage(index)} className='btn'><Dot /></button>
                }
              </li>
            ))}
          </ul>}
          <button className="slider-nav-btn prev" onClick={this.prevImage}>&larr;</button>
          <button className="slider-nav-btn next" onClick={this.nextImage}>&rarr;</button>
        </div>
      
        {
          this.state.showModal ?
            <ImageModal
              img={images[this.state.selectedIndex]['img']}
              modalcb={
                () => this.setState({
                showModal: false
                })
              }
            />
            : null
        }
      </div>
    )
  }
}