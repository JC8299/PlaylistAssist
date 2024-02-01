import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/card.module.css";

export default function Card({
    imageSrc,
    imageAlt,
    title,
    description,
    link,
}) {
    return (
        <Link
            className={`${styles.cardContainer} disableTextSelection`}
            href={link}
        >
            <div className={styles.cardContent}>
                <div className={styles.cardImageContainer}>
                    <Image
                        className={styles.cardImage}
                        src={imageSrc}
                        alt={imageAlt}
                        fill={true}
                    />
                </div>
                <div className={styles.cardText}>
                    <p className={styles.cardTitle}>
                        {title}
                    </p>
                    <p className={styles.cardDescription}>
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    )
}