import Link from "next/link";
import styles from "./ProductItem.module.scss";
import Image from "next/image";
import { priceFormat } from "@/utils/priceFormat";
import { Rating } from "react-simple-star-rating";

const ProductItem = ({ id, name, price, imageURL }) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const sortenedText = text.substring(0, n).concat("...");
      return sortenedText;
    }
    return text;
  };

  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.details}>
          <p>{shortenText(name, 10)}</p>
          <em>
            <strong style={{ color: "#cb1400" }}>{priceFormat(price)}</strong>원{" "}
          </em>
          <div>
            <Rating size={17} readonly initialRating={2} />
            <span className={styles.ratingCount}>3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
