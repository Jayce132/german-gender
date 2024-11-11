const wordsData = {
    noun: [
        {
            german: 'Jahr',
            english: 'year',
            article: 'das',
            forms: [
                { form: 'Jahr', explanation: 'Singular Nominative/Accusative' },
                { form: 'Jahre', explanation: 'Plural Nominative/Accusative or Singular Dative' },
                { form: 'Jahren', explanation: 'Plural Dative' },
            ],
        },
        {
            german: 'Mal',
            english: 'time (occurrence)',
            article: 'das',
            forms: [
                { form: 'Mal', explanation: 'Singular Nominative/Accusative' },
                { form: 'Male', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Beispiel',
            english: 'example',
            article: 'das',
            forms: [
                { form: 'Beispiel', explanation: 'Singular Nominative/Accusative' },
                { form: 'Beispiele', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Zeit',
            english: 'time (hour)',
            article: 'die',
            forms: [
                { form: 'Zeit', explanation: 'Singular Nominative/Accusative' },
                { form: 'Zeiten', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Frau',
            english: 'woman, wife, Mrs.',
            article: 'die',
            forms: [
                { form: 'Frau', explanation: 'Singular Nominative/Accusative' },
                { form: 'Frauen', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Mensch',
            english: 'human being, man',
            article: 'der',
            forms: [
                { form: 'Mensch', explanation: 'Singular Nominative' },
                { form: 'Menschen', explanation: 'Singular Accusative/Dative and Plural Forms' },
            ],
        },
        {
            german: 'Deutsch',
            english: 'German',
            article: 'das',
            forms: [
                { form: 'Deutsch', explanation: 'Uncountable Noun' },
            ],
        },
        {
            german: 'Kind',
            english: 'child',
            article: 'das',
            forms: [
                { form: 'Kind', explanation: 'Singular Nominative/Accusative' },
                { form: 'Kinder', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Tag',
            english: 'day',
            article: 'der',
            forms: [
                { form: 'Tag', explanation: 'Singular Nominative/Accusative' },
                { form: 'Tage', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Mann',
            english: 'man',
            article: 'der',
            forms: [
                { form: 'Mann', explanation: 'Singular Nominative/Accusative' },
                { form: 'Männer', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Land',
            english: 'land, country, state',
            article: 'das',
            forms: [
                { form: 'Land', explanation: 'Singular Nominative/Accusative' },
                { form: 'Länder', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Frage',
            english: 'question',
            article: 'die',
            forms: [
                { form: 'Frage', explanation: 'Singular Nominative/Accusative' },
                { form: 'Fragen', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Haus',
            english: 'house',
            article: 'das',
            forms: [
                { form: 'Haus', explanation: 'Singular Nominative/Accusative' },
                { form: 'Häuser', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Fall',
            english: 'case',
            article: 'der',
            forms: [
                { form: 'Fall', explanation: 'Singular Nominative/Accusative' },
                { form: 'Fälle', explanation: 'Plural Nominative/Accusative' },
            ],
        },
        {
            german: 'Leute',
            english: 'people',
            article: 'die',
            forms: [
                { form: 'Leute', explanation: 'Plural Nominative/Accusative' },
            ],
        },
    ],
    verb: [
        {
            german: 'sein',
            english: 'to be',
            forms: [
                { form: 'sein', explanation: 'Infinitive' },
                { form: 'bin', explanation: '1st Person Singular Present' },
                { form: 'bist', explanation: '2nd Person Singular Present' },
                { form: 'ist', explanation: '3rd Person Singular Present' },
                { form: 'sind', explanation: '1st/3rd Person Plural Present' },
                { form: 'seid', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'haben',
            english: 'to have',
            forms: [
                { form: 'haben', explanation: 'Infinitive' },
                { form: 'habe', explanation: '1st Person Singular Present' },
                { form: 'hast', explanation: '2nd Person Singular Present' },
                { form: 'hat', explanation: '3rd Person Singular Present' },
                { form: 'haben', explanation: '1st/3rd Person Plural Present' },
                { form: 'habt', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'werden',
            english: 'to become, get',
            forms: [
                { form: 'werden', explanation: 'Infinitive' },
                { form: 'werde', explanation: '1st Person Singular Present' },
                { form: 'wirst', explanation: '2nd Person Singular Present' },
                { form: 'wird', explanation: '3rd Person Singular Present' },
                { form: 'werden', explanation: '1st/3rd Person Plural Present' },
                { form: 'werdet', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'können',
            english: 'can, to be able to',
            forms: [
                { form: 'können', explanation: 'Infinitive' },
                { form: 'kann', explanation: '1st/3rd Person Singular Present' },
                { form: 'kannst', explanation: '2nd Person Singular Present' },
                { form: 'können', explanation: '1st/3rd Person Plural Present' },
                { form: 'könnt', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'müssen',
            english: 'must, to have to',
            forms: [
                { form: 'müssen', explanation: 'Infinitive' },
                { form: 'muss', explanation: '1st/3rd Person Singular Present' },
                { form: 'musst', explanation: '2nd Person Singular Present' },
                { form: 'müssen', explanation: '1st/3rd Person Plural Present' },
                { form: 'müsst', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'sagen',
            english: 'to say',
            forms: [
                { form: 'sagen', explanation: 'Infinitive' },
                { form: 'sage', explanation: '1st Person Singular Present' },
                { form: 'sagst', explanation: '2nd Person Singular Present' },
                { form: 'sagt', explanation: '3rd Person Singular Present / 2nd Person Plural Present' },
                { form: 'sagen', explanation: '1st/3rd Person Plural Present' },
            ],
        },
        {
            german: 'machen',
            english: 'to make, do',
            forms: [
                { form: 'machen', explanation: 'Infinitive' },
                { form: 'mache', explanation: '1st Person Singular Present' },
                { form: 'machst', explanation: '2nd Person Singular Present' },
                { form: 'macht', explanation: '3rd Person Singular Present / 2nd Person Plural Present' },
                { form: 'machen', explanation: '1st/3rd Person Plural Present' },
            ],
        },
        {
            german: 'geben',
            english: 'to give',
            forms: [
                { form: 'geben', explanation: 'Infinitive' },
                { form: 'gebe', explanation: '1st Person Singular Present' },
                { form: 'gibst', explanation: '2nd Person Singular Present' },
                { form: 'gibt', explanation: '3rd Person Singular Present' },
                { form: 'geben', explanation: '1st/3rd Person Plural Present' },
                { form: 'gebt', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'kommen',
            english: 'to come',
            forms: [
                { form: 'kommen', explanation: 'Infinitive' },
                { form: 'komme', explanation: '1st Person Singular Present' },
                { form: 'kommst', explanation: '2nd Person Singular Present' },
                { form: 'kommt', explanation: '3rd Person Singular Present / 2nd Person Plural Present' },
                { form: 'kommen', explanation: '1st/3rd Person Plural Present' },
            ],
        },
        {
            german: 'sollen',
            english: 'should, ought to',
            forms: [
                { form: 'sollen', explanation: 'Infinitive' },
                { form: 'soll', explanation: '1st/3rd Person Singular Present' },
                { form: 'sollst', explanation: '2nd Person Singular Present' },
                { form: 'sollen', explanation: '1st/3rd Person Plural Present' },
                { form: 'sollt', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'wollen',
            english: 'to want to',
            forms: [
                { form: 'wollen', explanation: 'Infinitive' },
                { form: 'will', explanation: '1st/3rd Person Singular Present' },
                { form: 'willst', explanation: '2nd Person Singular Present' },
                { form: 'wollen', explanation: '1st/3rd Person Plural Present' },
                { form: 'wollt', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'gehen',
            english: 'to go',
            forms: [
                { form: 'gehen', explanation: 'Infinitive' },
                { form: 'gehe', explanation: '1st Person Singular Present' },
                { form: 'gehst', explanation: '2nd Person Singular Present' },
                { form: 'geht', explanation: '3rd Person Singular Present / 2nd Person Plural Present' },
                { form: 'gehen', explanation: '1st/3rd Person Plural Present' },
            ],
        },
        {
            german: 'wissen',
            english: 'to know',
            forms: [
                { form: 'wissen', explanation: 'Infinitive' },
                { form: 'weiß', explanation: '1st/3rd Person Singular Present' },
                { form: 'weißt', explanation: '2nd Person Singular Present' },
                { form: 'wissen', explanation: '1st/3rd Person Plural Present' },
                { form: 'wisst', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'sehen',
            english: 'to see',
            forms: [
                { form: 'sehen', explanation: 'Infinitive' },
                { form: 'sehe', explanation: '1st Person Singular Present' },
                { form: 'siehst', explanation: '2nd Person Singular Present' },
                { form: 'sieht', explanation: '3rd Person Singular Present' },
                { form: 'sehen', explanation: '1st/3rd Person Plural Present' },
                { form: 'seht', explanation: '2nd Person Plural Present' },
            ],
        },
        {
            german: 'lassen',
            english: 'to let, allow, have done',
            forms: [
                { form: 'lassen', explanation: 'Infinitive' },
                { form: 'lasse', explanation: '1st Person Singular Present' },
                { form: 'lässt', explanation: '2nd/3rd Person Singular Present' },
                { form: 'lassen', explanation: '1st/3rd Person Plural Present' },
                { form: 'lasst', explanation: '2nd Person Plural Present' },
            ],
        },
    ],
    adjective: [
        {
            german: 'ganz',
            english: 'whole, entire',
            forms: [
                { form: 'ganz', explanation: 'Positive Degree' },
                { form: 'ganze', explanation: 'Feminine Singular/Plural' },
                { form: 'ganzer', explanation: 'Masculine Singular Nominative' },
                { form: 'ganzes', explanation: 'Neuter Singular' },
                { form: 'ganzen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'groß',
            english: 'big, large, great',
            forms: [
                { form: 'groß', explanation: 'Positive Degree' },
                { form: 'große', explanation: 'Feminine Singular/Plural' },
                { form: 'großer', explanation: 'Masculine Singular Nominative' },
                { form: 'großes', explanation: 'Neuter Singular' },
                { form: 'großen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'gut',
            english: 'good',
            forms: [
                { form: 'gut', explanation: 'Positive Degree' },
                { form: 'gute', explanation: 'Feminine Singular/Plural' },
                { form: 'guter', explanation: 'Masculine Singular Nominative' },
                { form: 'gutes', explanation: 'Neuter Singular' },
                { form: 'guten', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'neu',
            english: 'new',
            forms: [
                { form: 'neu', explanation: 'Positive Degree' },
                { form: 'neue', explanation: 'Feminine Singular/Plural' },
                { form: 'neuer', explanation: 'Masculine Singular Nominative' },
                { form: 'neues', explanation: 'Neuter Singular' },
                { form: 'neuen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'erste',
            english: 'first',
            forms: [
                { form: 'erste', explanation: 'Feminine Singular/Plural' },
                { form: 'erster', explanation: 'Masculine Singular Nominative' },
                { form: 'erstes', explanation: 'Neuter Singular' },
                { form: 'ersten', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'lang',
            english: 'long',
            forms: [
                { form: 'lang', explanation: 'Positive Degree' },
                { form: 'lange', explanation: 'Feminine Singular/Plural' },
                { form: 'langer', explanation: 'Masculine Singular Nominative' },
                { form: 'langes', explanation: 'Neuter Singular' },
                { form: 'langen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'deutsch',
            english: 'German',
            forms: [
                { form: 'deutsch', explanation: 'Positive Degree' },
                { form: 'deutsche', explanation: 'Feminine Singular/Plural' },
                { form: 'deutscher', explanation: 'Masculine Singular Nominative' },
                { form: 'deutsches', explanation: 'Neuter Singular' },
                { form: 'deutschen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'klein',
            english: 'small, little',
            forms: [
                { form: 'klein', explanation: 'Positive Degree' },
                { form: 'kleine', explanation: 'Feminine Singular/Plural' },
                { form: 'kleiner', explanation: 'Masculine Singular Nominative' },
                { form: 'kleines', explanation: 'Neuter Singular' },
                { form: 'kleinen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'alt',
            english: 'old',
            forms: [
                { form: 'alt', explanation: 'Positive Degree' },
                { form: 'alte', explanation: 'Feminine Singular/Plural' },
                { form: 'alter', explanation: 'Masculine Singular Nominative' },
                { form: 'altes', explanation: 'Neuter Singular' },
                { form: 'alten', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'hoch',
            english: 'high, tall',
            forms: [
                { form: 'hoch', explanation: 'Positive Degree' },
                { form: 'hohe', explanation: 'Feminine Singular/Plural' },
                { form: 'hoher', explanation: 'Masculine Singular Nominative' },
                { form: 'hohes', explanation: 'Neuter Singular' },
                { form: 'hohen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'einfach',
            english: 'simple, easy',
            forms: [
                { form: 'einfach', explanation: 'Positive Degree' },
                { form: 'einfache', explanation: 'Feminine Singular/Plural' },
                { form: 'einfacher', explanation: 'Masculine Singular Nominative' },
                { form: 'einfaches', explanation: 'Neuter Singular' },
                { form: 'einfachen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'letzte',
            english: 'last',
            forms: [
                { form: 'letzte', explanation: 'Feminine Singular/Plural' },
                { form: 'letzter', explanation: 'Masculine Singular Nominative' },
                { form: 'letztes', explanation: 'Neuter Singular' },
                { form: 'letzten', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'gleich',
            english: 'same, immediate',
            forms: [
                { form: 'gleich', explanation: 'Positive Degree' },
                { form: 'gleiche', explanation: 'Feminine Singular/Plural' },
                { form: 'gleicher', explanation: 'Masculine Singular Nominative' },
                { form: 'gleiches', explanation: 'Neuter Singular' },
                { form: 'gleichen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'möglich',
            english: 'possible',
            forms: [
                { form: 'möglich', explanation: 'Positive Degree' },
                { form: 'mögliche', explanation: 'Feminine Singular/Plural' },
                { form: 'möglicher', explanation: 'Masculine Singular Nominative' },
                { form: 'mögliches', explanation: 'Neuter Singular' },
                { form: 'möglichen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
        {
            german: 'eigen',
            english: 'own',
            forms: [
                { form: 'eigen', explanation: 'Positive Degree' },
                { form: 'eigene', explanation: 'Feminine Singular/Plural' },
                { form: 'eigener', explanation: 'Masculine Singular Nominative' },
                { form: 'eigenes', explanation: 'Neuter Singular' },
                { form: 'eigenen', explanation: 'Masculine Accusative or Plural' },
            ],
        },
    ],
    adverb: [
        {
            german: 'auch',
            english: 'also, too',
            forms: [
                { form: 'auch', explanation: 'Adverb' },
            ],
        },
        {
            german: 'so',
            english: 'so, thus',
            forms: [
                { form: 'so', explanation: 'Adverb' },
            ],
        },
        {
            german: 'dann',
            english: 'then',
            forms: [
                { form: 'dann', explanation: 'Adverb' },
            ],
        },
        {
            german: 'da',
            english: 'there',
            forms: [
                { form: 'da', explanation: 'Adverb' },
            ],
        },
        {
            german: 'noch',
            english: 'still, yet',
            forms: [
                { form: 'noch', explanation: 'Adverb' },
            ],
        },
        {
            german: 'also',
            english: 'so',
            forms: [
                { form: 'also', explanation: 'Adverb' },
            ],
        },
        {
            german: 'nur',
            english: 'only',
            forms: [
                { form: 'nur', explanation: 'Adverb' },
            ],
        },
        {
            german: 'schon',
            english: 'already',
            forms: [
                { form: 'schon', explanation: 'Adverb' },
            ],
        },
        {
            german: 'mehr',
            english: 'more',
            forms: [
                { form: 'mehr', explanation: 'Adverb' },
            ],
        },
        {
            german: 'jetzt',
            english: 'now',
            forms: [
                { form: 'jetzt', explanation: 'Adverb' },
            ],
        },
        {
            german: 'immer',
            english: 'always',
            forms: [
                { form: 'immer', explanation: 'Adverb' },
            ],
        },
        {
            german: 'sehr',
            english: 'very',
            forms: [
                { form: 'sehr', explanation: 'Adverb' },
            ],
        },
        {
            german: 'hier',
            english: 'here',
            forms: [
                { form: 'hier', explanation: 'Adverb' },
            ],
        },
        {
            german: 'doch',
            english: 'but, still',
            forms: [
                { form: 'doch', explanation: 'Adverb' },
            ],
        },
        {
            german: 'wieder',
            english: 'again',
            forms: [
                { form: 'wieder', explanation: 'Adverb' },
            ],
        },
    ],
};

export default wordsData;
