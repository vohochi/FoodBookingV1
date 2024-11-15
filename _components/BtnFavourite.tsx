import { useState } from "react";

const BtnFavorite = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        < div
            className="rounded-circle border p-2"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 1s ease',
                boxSizing: 'border-box',
                width: '45px',
                height: '45px',
            }
            }
        >
            <i
                className={`fa fa-heart ${isFavorite ? 'favorite' : ''
                    }`}
                style={{
                    fontSize: '24px',
                    color: isFavorite ? 'red' : 'gray',
                }}
                onClick={toggleFavorite}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.2)')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                }
            ></i>
        </div >
    );
}

export default BtnFavorite;