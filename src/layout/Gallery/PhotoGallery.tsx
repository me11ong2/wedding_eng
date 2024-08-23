import { useState, useEffect } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import images from '@/layout/Gallery/Images.ts';

const PhotoGallery = () => {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }[]>([]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        images.map(image => {
          return new Promise<{ width: number; height: number }>((resolve) => {
            const img = new Image();
            img.src = image.source;
            img.onload = () => {
              resolve({
                width: img.width,
                height: img.height,
              });
            };
          });
        })
      );
      setImageDimensions(dimensions);
    };

    loadImageDimensions();
  }, []);

  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'contain',
    width: '100px',
    height: '150px',
  };

  const imageContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '150px',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  };

  return (
    <Gallery>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: 2,
        }}>
        {images.map((image, index) => {
          const dimension = imageDimensions[index] || { width: 7952, height: 5304 }; // Fallback dimensions
          return (
            <Item
              key={index}
              cropped
              original={image.source}
              thumbnail={image.source}
              width={dimension.width.toString()}
              height={dimension.height.toString()}>
              {({ ref, open }) => (
                <div style={imageContainerStyles}>
                  <img
                    style={smallItemStyles}
                    alt={image.alt}
                    src={image.source}
                    ref={ref as React.MutableRefObject<HTMLImageElement>}
                    onClick={open}
                  />
                </div>
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;