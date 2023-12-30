import styles from '../styles/card.module.css';

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
                    <img className={styles.cardImage}
                        src={imageSrc}
                        alt={imageAlt}
                    />
                </div>
                <div className={styles.cardText}>
                    <h1 className={styles.cardTitle}>
                        {title}
                    </h1>
                    <p className={styles.cardDescription}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card;