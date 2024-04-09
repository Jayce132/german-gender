import React, {useState} from 'react';
import './App.css';

const words = [
    {
        "english": "apple",
        "german": "Apfel",
        "article": "der",
        "translation": "the apple",
        "image": "https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "car",
        "german": "Auto",
        "article": "das",
        "translation": "the car",
        "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "tree",
        "german": "Baum",
        "article": "der",
        "translation": "the tree",
        "image": "https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "house",
        "german": "Haus",
        "article": "das",
        "translation": "the house",
        "image": "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "flower",
        "german": "Blume",
        "article": "die",
        "translation": "the flower",
        "image": "https://images.pexels.com/photos/1242286/pexels-photo-1242286.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "bicycle",
        "german": "Fahrrad",
        "article": "das",
        "translation": "the bicycle",
        "image": "https://images.pexels.com/photos/20814059/pexels-photo-20814059/free-photo-of-minimal-pic.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "sun",
        "german": "Sonne",
        "article": "die",
        "translation": "the sun",
        "image": "https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "moon",
        "german": "Mond",
        "article": "der",
        "translation": "the moon",
        "image": "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "star",
        "german": "Stern",
        "article": "der",
        "translation": "the star",
        "image": "https://images.pexels.com/photos/980859/pexels-photo-980859.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "english": "water",
        "german": "Wasser",
        "article": "das",
        "translation": "the water",
        "image": "https://images.pexels.com/photos/261403/pexels-photo-261403.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

const App = () => {
    const [selectedGender, setSelectedGender] = useState('');
    const [germanNoun, setGermanNoun] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0); // This way the app knows the current word we are at
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState(''); // For styling feedback message
    const [isReview, setIsReview] = useState(false); // Don't continue immediately after Submit

    const {english, german, article, image: imageUrl} = words[currentIndex];

    const handleAnswerCheck = () => {
        if (selectedGender === article && germanNoun.toLowerCase() === german.toLowerCase()) {
            setFeedback("Correct!");
            setFeedbackClass("text-success");
        } else {
            setFeedback(`Correct answer: ${article} ${german}`);
            setFeedbackClass("text-error");
        }
        setIsReview(true);
    };

    const handleContinue = () => {
        const nextIndex = currentIndex + 1 < words.length ? currentIndex + 1 : 0;
        setCurrentIndex(nextIndex);
        setSelectedGender('');
        setGermanNoun('');
        setFeedback('');
        setIsReview(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isReview) {
            handleAnswerCheck();
        } else {
            handleContinue();
        }
    };

    return (
        <div className="App"
             style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
            <div>
                <img src={imageUrl} alt={english} style={{
                    maxWidth: '100%',
                    height: '30vh',
                    objectFit: 'cover',
                    display: 'block',
                    margin: '0 auto'
                }}/>
                <p style={{textAlign: 'center'}}>{`the ${english}`}</p>
            </div>
            <div>
                {['der', 'die', 'das'].map((gender) => (
                    <button
                        key={gender}
                        onClick={() => setSelectedGender(gender)}
                        className={selectedGender === gender ? 'selected' : ''}
                        style={{margin: '0 10px'}}
                        disabled={isReview}
                    >
                        {gender}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit}
                  style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
                <input
                    type="text"
                    value={germanNoun}
                    onChange={(e) => setGermanNoun(e.target.value)}
                    placeholder="Type the German noun"
                    required
                    style={{marginBottom: '10px'}}
                    disabled={isReview}
                />
                <button type="submit">{isReview ? 'Continue' : 'Submit'}</button>
            </form>
            {feedback && <p className={feedbackClass}>{feedback}</p>}
        </div>
    );
};

export default App;
