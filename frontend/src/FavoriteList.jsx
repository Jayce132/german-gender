import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as fasHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";

const FavoritesList = ({words, onSelectWord, currentSelectedWord, toggleFavorite}) => {
    // Check if there are any favorite words
    const hasFavorites = words.length > 0;

    return (<div className="favoritesList">
        <h1><FontAwesomeIcon icon={hasFavorites ? fasHeart : farHeart}/></h1>
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
                }} className="actionIcon">
                            <FontAwesomeIcon icon={word.isFavorite ? fasHeart : farHeart}/>
                        </span>
            </div>);
        })) : (// Display a helpful message when there are no favorite words
            <div className="noFavoritesMessage">
                <p>Click the <FontAwesomeIcon icon={farHeart}/> next to a word to
                    mark it as a favorite.
                </p>

                <p>Click on a word from this list to switch to Favorite Words mode.</p>

                <p>To go back to using the full list of words you can select a word on the right.</p>
            </div>)}
    </div>);
};

export default FavoritesList;
