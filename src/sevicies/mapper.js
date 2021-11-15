export default function mapper(images) {
    return images.map(({ id, webformatURL: galleryImg, largeImageURL: modalImg, tags }) => ({
        id, galleryImg, modalImg, tags
    }));
}