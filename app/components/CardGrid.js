'use client'

import Card from "./Card";
import styles from "@/styles/cardGrid.module.css";

export default function CardGrid({
    cardContent,
    shrink = false,
}) {
    let filler = [];
    for (let i = 0; i < 8-(cardContent.length%8); i++) {
        filler.push(i);
    }

    return (
        <div
            className={`${styles.cardGrid} ${shrink ? styles.cardGridHideRows : ""}`}
        >
            {cardContent.map((content) => (
                <Card
                    imageSrc={content.image}
                    imageAlt={content.name}
                    title={content.name}
                    description={content.description}
                    link={content.link}
                    key={content.id}
                />
            ))}
            {filler.map(() => {
                return (
                    <div />
                );
            })}
        </div>
    );
}