import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'; // Empty heart
import {
    faEdit, faHeart as fasHeart, faTrash, faUpload
} from '@fortawesome/free-solid-svg-icons'; // Filled heart

const FullList = ({words, onSelectWord, currentSelectedWord, toggleFavorite}) => {
    return (<div className="wordList" style={{maxHeight: '90vh', overflowY: 'auto', width: '30vh'}}>
        <h1>Words <FontAwesomeIcon icon={faUpload}/> <FontAwesomeIcon icon={faTrash}/> <FontAwesomeIcon
            icon={faEdit}/></h1>


        {words.map((word) => {
            // Determine if the word is the currently selected one
            const isSelected = word.english === currentSelectedWord;
            // Apply 'current' class if selected, otherwise use attemptStatus for class
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
        })}
    </div>);
};


export default FullList;
