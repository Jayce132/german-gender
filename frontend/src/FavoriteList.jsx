import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as fasHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";

const FavoritesList = ({words, onSelectWord, currentSelectedWord, toggleFavorite}) => {
    // Check if there are any favorite words
    const hasFavorites = words.length > 0;

    return (<div className="favoritesList" style={{maxHeight: '90vh', overflowY: 'auto', width: '30vh'}}>
        <h1><FontAwesomeIcon icon={hasFavorites ? fasHeart : farHeart}/> Favorites</h1>
        {hasFavorites ? (words.map((word) => {
            const isSelected = word.english === currentSelectedWord;
            const itemClasses = isSelected ? 'wordItem current' : `wordItem ${word.attemptStatus}`;

            return (<div key={word.english}
                         className={itemClasses}
                         onClick={() => onSelectWord(word.english)}>
                {word.english}
                <span onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div onClick
                    toggleFavorite(word.english);
                }} className="favoriteIcon">
                            <FontAwesomeIcon icon={word.isFavorite ? fasHeart : farHeart}/>
                        </span>
            </div>);
        })) : (// Display a helpful message when there are no favorite words
            <div className="noFavoritesMessage">
                {/*<p>This section will display your selected favorite words for easy access.</p>*/}

                <p>Click the heart icon next to a word to mark it as a favorite.</p>

                <p>Selecting a word from here will make the app only use your favorite words.</p>

                <p>To go back to using the full list of words you can select a word on the right.</p>
            </div>)}
    </div>);
};

export default FavoritesList;
