import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'; // Empty heart
import {
    faEdit, faHeart as fasHeart, faTrash
} from '@fortawesome/free-solid-svg-icons'; // Filled heart

const FullList = ({words, onSelectWord, currentSelectedWord, toggleFavorite}) => {
    return (<div className="wordList" style={{maxHeight: '90vh', overflowY: 'auto', width: '30vh'}}>
        <h1>Words</h1>

        <div className="wordItem addNewWord" onClick={() => console.log("Add new word")}>
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
                            <span className="actionIcon editIcon" onClick={() => console.log('Edit', word.english)}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </span>
                    <span className="actionIcon deleteIcon" onClick={() => console.log('Delete', word.english)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </span>
                    <span className="actionIcon favoriteIcon" onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(word.english);
                    }}>
                                <FontAwesomeIcon icon={word.isFavorite ? fasHeart : farHeart}/>
                            </span>
                </div>
            </div>);
        })}
    </div>);
};


export default FullList;
