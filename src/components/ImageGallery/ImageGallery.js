import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { StyledGallery } from './ImageGallery.styled';
import Button from '../Button';


function ImageGallery({images, error, status, onHandleLoadBtn, onHandleModal}) {
  
  return <>
    <StyledGallery>
        <ImageGalleryItem images={images} onImgClick={ onHandleModal}/>
    </StyledGallery>
    <Button loadMoreImages={onHandleLoadBtn} />
    </>
}
ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      galleryImg: PropTypes.string.isRequired,
      modalImg: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })),
    error: PropTypes.string,
    status: PropTypes.string.isRequired,
    onHandleModal: PropTypes.func.isRequired,
    onHandleLoadBtn: PropTypes.func.isRequired,
  }  
export default ImageGallery