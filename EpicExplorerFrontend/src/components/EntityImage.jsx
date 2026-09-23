import { useState } from "react";
import PropTypes from "prop-types";
import { ENTITY_IMAGE_FALLBACKS, getEntityImage } from "../utils/entityImages";

const EntityImage = ({ entity, src: imageValue, type, alt, className = "" }) => {
  const fallback = ENTITY_IMAGE_FALLBACKS[type];
  const [src, setSrc] = useState(() =>
    getEntityImage(imageValue ?? entity?.image ?? entity?.pic, type)
  );

  return (
    <img
      src={src}
      alt={alt || entity?.name || type}
      className={className}
      onError={() => setSrc((current) => (current === fallback ? current : fallback))}
    />
  );
};

EntityImage.propTypes = {
  entity: PropTypes.shape({
    image: PropTypes.string,
    pic: PropTypes.string,
    name: PropTypes.string,
  }),
  src: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(ENTITY_IMAGE_FALLBACKS)).isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default EntityImage;
