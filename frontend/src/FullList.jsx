import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'; // Empty heart
import {
    faEdit, faHeart as fasHeart, faTrash
} from '@fortawesome/free-solid-svg-icons'; // Filled heart

const FullList = ({
                      words, onSelectWord, currentSelectedWord, toggleFavorite, onAddNewWord, onEditWord, onDeleteWord
                  }) => {
    return (<div className="wordList">


        <div className="wordItem addNewWord" onClick={onAddNewWord}>
            Add new word
        </div>

        {words.map((word) => {
            const isSelected = word.english === currentSelectedWord;
            const itemClasses = isSelected ? 'wordItem current' : `wordItem ${word.attemptStatus}`;

            return (<div key={word.english}
                         className={itemClasses}
                         onClick={() => onSelectWord(word.english)}>
                {word.english}
                <div className="actions">
                    <span className="actionIcon favoriteIcon" onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(word.english);
                    }}>
                                <FontAwesomeIcon icon={word.isFavorite ? fasHeart : farHeart}/>
                            </span>
                    <span className="actionIcon editIcon" onClick={(e) => {
                        e.stopPropagation(); // Prevent the list item's onClick
                        onEditWord({
                            ...word, // Spread the word object
                            id: word.id, // Ensure the ID is included
                        });
                    }}>
    <FontAwesomeIcon icon={faEdit}/>
</span>
                    <span className="actionIcon deleteIcon" onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the onSelectWord click event
                        onDeleteWord(word.id);
                    }}>
    <FontAwesomeIcon icon={faTrash}/>
</span>

                </div>
            </div>);
        })}
    </div>);
};


export default FullList;
