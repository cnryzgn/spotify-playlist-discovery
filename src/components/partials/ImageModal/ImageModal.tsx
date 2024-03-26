import './ImageModal.css'

export const ImageModal = ({ image, imageModalHandler }: { image: string, imageModalHandler: any}) => {

    return (
        <div onClick={imageModalHandler} className="image-modal">
            <img  src={image} alt={image} />
        </div>
    )
}