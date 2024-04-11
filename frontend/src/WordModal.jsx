import React, { useState } from 'react';

const WordModal = ({ onClose, onSave, wordDetails = null, isEditMode = false }) => {
    const [english, setEnglish] = useState(wordDetails?.english || '');
    const [german, setGerman] = useState(wordDetails?.german || '');
    const [article, setArticle] = useState(wordDetails?.article || '');
    const [translation, setTranslation] = useState(wordDetails?.translation || '');
    const [image, setImage] = useState(wordDetails?.image || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass both the word data and the word's ID (if in edit mode)
        onSave({ english, german, article, translation, image }, isEditMode ? wordDetails.id : null);
    };

    return (
        <div className="modalBackdrop">
            <div className="modalContent">
                <form onSubmit={handleSubmit} className="modalForm">
                    <input type="text" placeholder="English" value={english} onChange={(e) => setEnglish(e.target.value)} />
                    <input type="text" placeholder="German" value={german} onChange={(e) => setGerman(e.target.value)} />
                    <input type="text" placeholder="Article" value={article} onChange={(e) => setArticle(e.target.value)} />
                    <input type="text" placeholder="Translation" value={translation} onChange={(e) => setTranslation(e.target.value)} />
                    <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                    <div className="formActions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WordModal;
