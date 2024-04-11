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
                <p>Click on the <FontAwesomeIcon icon={farHeart}/> next to a word to
                    mark it as a favorite and add it here.
                </p>

                <br></br>

                <p>Click on a word from this list to switch to <strong>Favorite Words</strong> mode.</p>

                <br></br>

                <p>To go back to using the <strong>All Words</strong> mode you can select a word from the right side
                    list.</p>
            </div>)}
    </div>);
};

export default FavoritesList;
