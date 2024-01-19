import Image from 'next/image';

import styles from '@/styles/card.module.css';

function Card({
    imageSrc,
    imageAlt,
    title,
    description,
    buttonText,
    link,
    width
}) {
    return (
        <div className={styles.cardContainer+' disableTextSelection'} style={{maxWidth: `${width}px`}}>
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
        </div>
    )
}

export default Card;