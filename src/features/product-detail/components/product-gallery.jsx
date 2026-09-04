export function ProductGallery({ image, name }) {
  return (
    <div className="product-gallery">
      <div className="main-image-container">
        <img
          src={image || '/assets/hero.png'}
          alt={name}
          className="product-gallery-main-img"
        />
      </div>
    </div>
  )
}
