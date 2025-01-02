const wordsData = {
    noun: [
        {
            "german": "Jahr",
            "english": "year",
            "article": "das",
            "forms": [
                {"form": "Jahr", "explanation": "Singular Nominative/Accusative"},
                {"form": "Jahre", "explanation": "Plural Nominative/Accusative or Singular Dative"},
                {"form": "Jahren", "explanation": "Plural Dative"}
            ],
            "sentence": {
                "german": "Ein Jahr hat zwölf Monate.",
                "english": "A year has twelve months."
            }
        },
        {
            "german": "Mal",
            "english": "time (occurrence)",
            "article": "das",
            "forms": [
                {"form": "Mal", "explanation": "Singular Nominative/Accusative"},
                {"form": "Male", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Das nächste Mal komme ich früher.",
                "english": "Next time I'll come earlier."
            }
        },
        {
            "german": "Beispiel",
            "english": "example",
            "article": "das",
            "forms": [
                {"form": "Beispiel", "explanation": "Singular Nominative/Accusative"},
                {"form": "Beispiele", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Zum Beispiel kannst du es so machen.",
                "english": "For example, you can do it like this."
            }
        },
        {
            "german": "Zeit",
            "english": "time (hour)",
            "article": "die",
            "forms": [
                {"form": "Zeit", "explanation": "Singular Nominative/Accusative"},
                {"form": "Zeiten", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Ich habe keine Zeit.",
                "english": "I have no time."
            }
        },
        {
            "german": "Frau",
            "english": "woman, wife, Mrs.",
            "article": "die",
            "forms": [
                {"form": "Frau", "explanation": "Singular Nominative/Accusative"},
                {"form": "Frauen", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Die Frau liest ein Buch.",
                "english": "The woman is reading a book."
            }
        },
        {
            "german": "Mensch",
            "english": "human being, man",
            "article": "der",
            "forms": [
                {"form": "Mensch", "explanation": "Singular Nominative"},
                {"form": "Menschen", "explanation": "Singular Accusative/Dative and Plural Forms"}
            ],
            "sentence": {
                "german": "Der Mensch ist ein soziales Wesen.",
                "english": "The human being is a social creature."
            }
        },
        {
            "german": "Deutsch",
            "english": "German",
            "article": "das",
            "forms": [
                {"form": "Deutsch", "explanation": "Uncountable Noun"}
            ],
            "sentence": {
                "german": "Ich lerne Deutsch.",
                "english": "I am learning German."
            }
        },
        {
            "german": "Kind",
            "english": "child",
            "article": "das",
            "forms": [
                {"form": "Kind", "explanation": "Singular Nominative/Accusative"},
                {"form": "Kinder", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Das Kind spielt im Garten.",
                "english": "The child is playing in the garden."
            }
        },
        {
            "german": "Tag",
            "english": "day",
            "article": "der",
            "forms": [
                {"form": "Tag", "explanation": "Singular Nominative/Accusative"},
                {"form": "Tage", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Der Tag ist schön.",
                "english": "The day is beautiful."
            }
        },
        {
            "german": "Mann",
            "english": "man",
            "article": "der",
            "forms": [
                {"form": "Mann", "explanation": "Singular Nominative/Accusative"},
                {"form": "Männer", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Der Mann arbeitet hart.",
                "english": "The man works hard."
            }
        },
        {
            "german": "Land",
            "english": "land, country, state",
            "article": "das",
            "forms": [
                {"form": "Land", "explanation": "Singular Nominative/Accusative"},
                {"form": "Länder", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Deutschland ist ein schönes Land.",
                "english": "Germany is a beautiful country."
            }
        },
        {
            "german": "Frage",
            "english": "question",
            "article": "die",
            "forms": [
                {"form": "Frage", "explanation": "Singular Nominative/Accusative"},
                {"form": "Fragen", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Ich habe eine Frage.",
                "english": "I have a question."
            }
        },
        {
            "german": "Haus",
            "english": "house",
            "article": "das",
            "forms": [
                {"form": "Haus", "explanation": "Singular Nominative/Accusative"},
                {"form": "Häuser", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Das Haus ist groß.",
                "english": "The house is big."
            }
        },
        {
            "german": "Fall",
            "english": "case",
            "article": "der",
            "forms": [
                {"form": "Fall", "explanation": "Singular Nominative/Accusative"},
                {"form": "Fälle", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "In jedem Fall werde ich dich anrufen.",
                "english": "In any case, I will call you."
            }
        },
        {
            "german": "Leute",
            "english": "people",
            "article": "die",
            "forms": [
                {"form": "Leute", "explanation": "Plural Nominative/Accusative"}
            ],
            "sentence": {
                "german": "Viele Leute sind gekommen.",
                "english": "Many people came."
            }
        }
    ],
    verb: [
        {
            "german": "sein",
            "english": "to be",
            "subtype": "Irregular",
            "forms": [
                {"form": "sein", "explanation": "Infinitive"},
                {"form": "bin", "explanation": "1st Person Singular Present"},
                {"form": "bist", "explanation": "2nd Person Singular Present"},
                {"form": "ist", "explanation": "3rd Person Singular Present"},
                {"form": "sind", "explanation": "1st/3rd Person Plural Present"},
                {"form": "seid", "explanation": "2nd Person Plural Present and Imperative Plural Informal"},
                {"form": "sei", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Ich bin müde.",
                "english": "I am tired."
            }
        },
        {
            "german": "haben",
            "english": "to have",
            "subtype": "Irregular",
            "forms": [
                {"form": "haben", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "habe", "explanation": "1st Person Singular Present"},
                {"form": "hast", "explanation": "2nd Person Singular Present"},
                {"form": "hat", "explanation": "3rd Person Singular Present"},
                {"form": "habt", "explanation": "2nd Person Plural Present and Imperative Plural Informal"},
                {"form": "hab", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Ich habe Hunger.",
                "english": "I am hungry."
            }
        },
        {
            "german": "werden",
            "english": "to become, get",
            "subtype": "Irregular",
            "forms": [
                {"form": "werden", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "werde", "explanation": "1st Person Singular Present and Imperative Singular Informal"},
                {"form": "wirst", "explanation": "2nd Person Singular Present"},
                {"form": "wird", "explanation": "3rd Person Singular Present"},
                {"form": "werdet", "explanation": "2nd Person Plural Present and Imperative Plural Informal"}
            ],
            "sentence": {
                "german": "Es wird kalt.",
                "english": "It is getting cold."
            }
        },
        {
            "german": "können",
            "english": "can, to be able to",
            "subtype": "Modal",
            "forms": [
                {"form": "können", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "kann", "explanation": "1st/3rd Person Singular Present and Imperative Singular Informal"},
                {"form": "kannst", "explanation": "2nd Person Singular Present"},
                {"form": "könnt", "explanation": "2nd Person Plural Present and Imperative Plural Informal"}
            ],
            "sentence": {
                "german": "Ich kann schwimmen.",
                "english": "I can swim."
            }
        },
        {
            "german": "müssen",
            "english": "must, to have to",
            "subtype": "Modal",
            "forms": [
                {"form": "müssen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "muss", "explanation": "1st/3rd Person Singular Present and Imperative Singular Informal"},
                {"form": "musst", "explanation": "2nd Person Singular Present"},
                {"form": "müsst", "explanation": "2nd Person Plural Present and Imperative Plural Informal"}
            ],
            "sentence": {
                "german": "Ich muss gehen.",
                "english": "I have to go."
            }
        },
        {
            "german": "sagen",
            "english": "to say",
            "subtype": null,
            "forms": [
                {"form": "sagen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "sage", "explanation": "1st Person Singular Present"},
                {"form": "sagst", "explanation": "2nd Person Singular Present"},
                {
                    "form": "sagt",
                    "explanation": "3rd Person Singular Present / 2nd Person Plural Present and Imperative Plural Informal"
                },
                {"form": "sag", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Was sagst du?",
                "english": "What are you saying?"
            }
        },
        {
            "german": "machen",
            "english": "to make, do",
            "subtype": null,
            "forms": [
                {"form": "machen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "mache", "explanation": "1st Person Singular Present"},
                {"form": "machst", "explanation": "2nd Person Singular Present"},
                {
                    "form": "macht",
                    "explanation": "3rd Person Singular Present / 2nd Person Plural Present and Imperative Plural Informal"
                },
                {"form": "mach", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Was machst du?",
                "english": "What are you doing?"
            }
        },
        {
            "german": "geben",
            "english": "to give",
            "subtype": "Irregular",
            "forms": [
                {"form": "geben", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "gebe", "explanation": "1st Person Singular Present"},
                {"form": "gibst", "explanation": "2nd Person Singular Present"},
                {"form": "gibt", "explanation": "3rd Person Singular Present"},
                {"form": "gebt", "explanation": "2nd Person Plural Present and Imperative Plural Informal"},
                {"form": "gib", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Es gibt ein Problem.",
                "english": "There is a problem."
            }
        },
        {
            "german": "kommen",
            "english": "to come",
            "subtype": null,
            "forms": [
                {"form": "kommen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "komme", "explanation": "1st Person Singular Present"},
                {"form": "kommst", "explanation": "2nd Person Singular Present"},
                {
                    "form": "kommt",
                    "explanation": "3rd Person Singular Present / 2nd Person Plural Present and Imperative Plural Informal"
                },
                {"form": "komm", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Kommst du mit?",
                "english": "Are you coming along?"
            }
        },
        {
            "german": "sollen",
            "english": "should, ought to",
            "subtype": "Modal",
            "forms": [
                {"form": "sollen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "soll", "explanation": "1st/3rd Person Singular Present and Imperative Singular Informal"},
                {"form": "sollst", "explanation": "2nd Person Singular Present"},
                {"form": "sollt", "explanation": "2nd Person Plural Present and Imperative Plural Informal"}
            ],
            "sentence": {
                "german": "Du sollst das machen.",
                "english": "You should do that."
            }
        },
        {
            "german": "wollen",
            "english": "to want to",
            "subtype": "Modal",
            "forms": [
                {"form": "wollen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "will", "explanation": "1st/3rd Person Singular Present and Imperative Singular Informal"},
                {"form": "willst", "explanation": "2nd Person Singular Present"},
                {"form": "wollt", "explanation": "2nd Person Plural Present and Imperative Plural Informal"}
            ],
            "sentence": {
                "german": "Ich will schlafen.",
                "english": "I want to sleep."
            }
        },
        {
            "german": "gehen",
            "english": "to go",
            "subtype": null,
            "forms": [
                {"form": "gehen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "gehe", "explanation": "1st Person Singular Present"},
                {"form": "gehst", "explanation": "2nd Person Singular Present"},
                {
                    "form": "geht",
                    "explanation": "3rd Person Singular Present / 2nd Person Plural Present and Imperative Plural Informal"
                },
                {"form": "geh", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Wir gehen ins Kino.",
                "english": "We are going to the cinema."
            }
        },
        {
            "german": "wissen",
            "english": "to know",
            "subtype": "Irregular",
            "forms": [
                {"form": "wissen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "weiß", "explanation": "1st/3rd Person Singular Present and Imperative Singular Informal"},
                {"form": "weißt", "explanation": "2nd Person Singular Present"},
                {"form": "wisst", "explanation": "2nd Person Plural Present and Imperative Plural Informal"}
            ],
            "sentence": {
                "german": "Ich weiß es nicht.",
                "english": "I don't know."
            }
        },
        {
            "german": "sehen",
            "english": "to see",
            "subtype": "Irregular",
            "forms": [
                {"form": "sehen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "sehe", "explanation": "1st Person Singular Present"},
                {"form": "siehst", "explanation": "2nd Person Singular Present"},
                {"form": "sieht", "explanation": "3rd Person Singular Present"},
                {"form": "seht", "explanation": "2nd Person Plural Present and Imperative Plural Informal"},
                {"form": "seh", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Ich sehe dich.",
                "english": "I see you."
            }
        },
        {
            "german": "lassen",
            "english": "to let, allow, have done",
            "subtype": "Irregular",
            "forms": [
                {"form": "lassen", "explanation": "Infinitive and 1st/3rd Person Plural Present"},
                {"form": "lasse", "explanation": "1st Person Singular Present"},
                {"form": "lässt", "explanation": "2nd/3rd Person Singular Present"},
                {"form": "lasst", "explanation": "2nd Person Plural Present and Imperative Plural Informal"},
                {"form": "lass", "explanation": "Imperative Singular Informal"}
            ],
            "sentence": {
                "german": "Lass mich in Ruhe.",
                "english": "Leave me alone."
            }
        }
    ],
    adjective: [
        {
            "german": "ganz",
            "english": "whole, entire",
            "forms": [
                {"form": "ganz", "explanation": "Positive Degree"},
                {"form": "ganze", "explanation": "Feminine Singular/Plural"},
                {"form": "ganzer", "explanation": "Masculine Singular Nominative"},
                {"form": "ganzes", "explanation": "Neuter Singular"},
                {"form": "ganzen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Ich habe den ganzen Tag gearbeitet.",
                "english": "I worked the whole day."
            }
        },
        {
            "german": "groß",
            "english": "big, large, great",
            "forms": [
                {"form": "groß", "explanation": "Positive Degree"},
                {"form": "große", "explanation": "Feminine Singular/Plural"},
                {"form": "großer", "explanation": "Masculine Singular Nominative"},
                {"form": "großes", "explanation": "Neuter Singular"},
                {"form": "großen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Das ist ein großes Haus.",
                "english": "That is a big house."
            }
        },
        {
            "german": "gut",
            "english": "good",
            "forms": [
                {"form": "gut", "explanation": "Positive Degree"},
                {"form": "gute", "explanation": "Feminine Singular/Plural"},
                {"form": "guter", "explanation": "Masculine Singular Nominative"},
                {"form": "gutes", "explanation": "Neuter Singular"},
                {"form": "guten", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Das Essen schmeckt gut.",
                "english": "The food tastes good."
            }
        },
        {
            "german": "neu",
            "english": "new",
            "forms": [
                {"form": "neu", "explanation": "Positive Degree"},
                {"form": "neue", "explanation": "Feminine Singular/Plural"},
                {"form": "neuer", "explanation": "Masculine Singular Nominative"},
                {"form": "neues", "explanation": "Neuter Singular"},
                {"form": "neuen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Ich habe ein neues Handy gekauft.",
                "english": "I bought a new cellphone."
            }
        },
        {
            "german": "erste",
            "english": "first",
            "forms": [
                {"form": "erste", "explanation": "Feminine Singular/Plural"},
                {"form": "erster", "explanation": "Masculine Singular Nominative"},
                {"form": "erstes", "explanation": "Neuter Singular"},
                {"form": "ersten", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Er ist mein erster Freund.",
                "english": "He is my first boyfriend."
            }
        },
        {
            "german": "lang",
            "english": "long",
            "forms": [
                {"form": "lang", "explanation": "Positive Degree"},
                {"form": "lange", "explanation": "Feminine Singular/Plural"},
                {"form": "langer", "explanation": "Masculine Singular Nominative"},
                {"form": "langes", "explanation": "Neuter Singular"},
                {"form": "langen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Sie hat eine lange Reise gemacht.",
                "english": "She took a long journey."
            }
        },
        {
            "german": "deutsch",
            "english": "German",
            "forms": [
                {"form": "deutsch", "explanation": "Positive Degree"},
                {"form": "deutsche", "explanation": "Feminine Singular/Plural"},
                {"form": "deutscher", "explanation": "Masculine Singular Nominative"},
                {"form": "deutsches", "explanation": "Neuter Singular"},
                {"form": "deutschen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Er liest ein deutsches Buch.",
                "english": "He is reading a German book."
            }
        },
        {
            "german": "klein",
            "english": "small, little",
            "forms": [
                {"form": "klein", "explanation": "Positive Degree"},
                {"form": "kleine", "explanation": "Feminine Singular/Plural"},
                {"form": "kleiner", "explanation": "Masculine Singular Nominative"},
                {"form": "kleines", "explanation": "Neuter Singular"},
                {"form": "kleinen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Das ist ein kleines Problem.",
                "english": "That is a small problem."
            }
        },
        {
            "german": "alt",
            "english": "old",
            "forms": [
                {"form": "alt", "explanation": "Positive Degree"},
                {"form": "alte", "explanation": "Feminine Singular/Plural"},
                {"form": "alter", "explanation": "Masculine Singular Nominative"},
                {"form": "altes", "explanation": "Neuter Singular"},
                {"form": "alten", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Mein Auto ist sehr alt.",
                "english": "My car is very old."
            }
        },
        {
            "german": "hoch",
            "english": "high, tall",
            "forms": [
                {"form": "hoch", "explanation": "Positive Degree"},
                {"form": "hohe", "explanation": "Feminine Singular/Plural"},
                {"form": "hoher", "explanation": "Masculine Singular Nominative"},
                {"form": "hohes", "explanation": "Neuter Singular"},
                {"form": "hohen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Das ist ein hoher Berg.",
                "english": "That is a high mountain."
            }
        },
        {
            "german": "einfach",
            "english": "simple, easy",
            "forms": [
                {"form": "einfach", "explanation": "Positive Degree"},
                {"form": "einfache", "explanation": "Feminine Singular/Plural"},
                {"form": "einfacher", "explanation": "Masculine Singular Nominative"},
                {"form": "einfaches", "explanation": "Neuter Singular"},
                {"form": "einfachen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Die Aufgabe ist einfach.",
                "english": "The task is easy."
            }
        },
        {
            "german": "letzte",
            "english": "last",
            "forms": [
                {"form": "letzte", "explanation": "Feminine Singular/Plural"},
                {"form": "letzter", "explanation": "Masculine Singular Nominative"},
                {"form": "letztes", "explanation": "Neuter Singular"},
                {"form": "letzten", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Das ist meine letzte Chance.",
                "english": "This is my last chance."
            }
        },
        {
            "german": "gleich",
            "english": "same, immediate",
            "forms": [
                {"form": "gleich", "explanation": "Positive Degree"},
                {"form": "gleiche", "explanation": "Feminine Singular/Plural"},
                {"form": "gleicher", "explanation": "Masculine Singular Nominative"},
                {"form": "gleiches", "explanation": "Neuter Singular"},
                {"form": "gleichen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Wir haben die gleiche Idee.",
                "english": "We have the same idea."
            }
        },
        {
            "german": "möglich",
            "english": "possible",
            "forms": [
                {"form": "möglich", "explanation": "Positive Degree"},
                {"form": "mögliche", "explanation": "Feminine Singular/Plural"},
                {"form": "möglicher", "explanation": "Masculine Singular Nominative"},
                {"form": "mögliches", "explanation": "Neuter Singular"},
                {"form": "möglichen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Alles ist möglich.",
                "english": "Everything is possible."
            }
        },
        {
            "german": "eigen",
            "english": "own",
            "forms": [
                {"form": "eigen", "explanation": "Positive Degree"},
                {"form": "eigene", "explanation": "Feminine Singular/Plural"},
                {"form": "eigener", "explanation": "Masculine Singular Nominative"},
                {"form": "eigenes", "explanation": "Neuter Singular"},
                {"form": "eigenen", "explanation": "Masculine Accusative or Plural"}
            ],
            "sentence": {
                "german": "Sie hat ihre eigene Firma.",
                "english": "She has her own company."
            }
        }
    ],
    adverb: [
        {
            "german": "auch",
            "english": "also, too",
            "forms": [
                {"form": "auch", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Ich komme auch.",
                "english": "I'm coming too."
            }
        },
        {
            "german": "so",
            "english": "so, thus",
            "forms": [
                {"form": "so", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Warum ist das so?",
                "english": "Why is that so?"
            }
        },
        {
            "german": "dann",
            "english": "then",
            "forms": [
                {"form": "dann", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Wir treffen uns dann.",
                "english": "We'll meet then."
            }
        },
        {
            "german": "da",
            "english": "there",
            "forms": [
                {"form": "da", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Ich war noch nie da.",
                "english": "I've never been there."
            }
        },
        {
            "german": "noch",
            "english": "still, yet",
            "forms": [
                {"form": "noch", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Es ist noch früh.",
                "english": "It is still early."
            }
        },
        {
            "german": "also",
            "english": "so",
            "forms": [
                {"form": "also", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Also, was machen wir jetzt?",
                "english": "So, what are we doing now?"
            }
        },
        {
            "german": "nur",
            "english": "only",
            "forms": [
                {"form": "nur", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Ich habe nur noch fünf Minuten.",
                "english": "I only have five minutes left."
            }
        },
        {
            "german": "schon",
            "english": "already",
            "forms": [
                {"form": "schon", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Er ist schon gegangen.",
                "english": "He has already left."
            }
        },
        {
            "german": "mehr",
            "english": "more",
            "forms": [
                {"form": "mehr", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Ich möchte mehr Kaffee.",
                "english": "I would like more coffee."
            }
        },
        {
            "german": "jetzt",
            "english": "now",
            "forms": [
                {"form": "jetzt", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Ich muss jetzt gehen.",
                "english": "I have to go now."
            }
        },
        {
            "german": "immer",
            "english": "always",
            "forms": [
                {"form": "immer", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Sie ist immer pünktlich.",
                "english": "She is always punctual."
            }
        },
        {
            "german": "sehr",
            "english": "very",
            "forms": [
                {"form": "sehr", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Das gefällt mir sehr.",
                "english": "I like that very much."
            }
        },
        {
            "german": "hier",
            "english": "here",
            "forms": [
                {"form": "hier", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Ich wohne hier.",
                "english": "I live here."
            }
        },
        {
            "german": "doch",
            "english": "but, still",
            "forms": [
                {"form": "doch", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Das ist doch nicht wahr!",
                "english": "But that's not true!"
            }
        },
        {
            "german": "wieder",
            "english": "again",
            "forms": [
                {"form": "wieder", "explanation": "Adverb"}
            ],
            "sentence": {
                "german": "Wir sehen uns wieder.",
                "english": "We will see each other again."
            }
        }
    ],
    pronoun: [
        {
            "german": "ich",
            "english": "I",
            "sentence": [
                {"german": "Ich gehe nach Hause.", "english": "I am going home."}
            ]
        },
        {
            "german": "mich",
            "english": "me (direct)",
            "sentence": [
                {"german": "Er sieht mich.", "english": "He sees me."}
            ]
        },
        {
            "german": "mir",
            "english": "to me (indirect)",
            "sentence": [
                {"german": "Er gibt mir das Buch.", "english": "He gives me the book."}
            ]
        },
        {
            "german": "du",
            "english": "you (singular)",
            "sentence": [
                {"german": "Du bist mein Freund.", "english": "You are my friend."}
            ]
        },
        {
            "german": "dich",
            "english": "you (direct, singular)",
            "sentence": [
                {"german": "Ich höre dich.", "english": "I hear you."}
            ]
        },
        {
            "german": "dir",
            "english": "to you (indirect, singular)",
            "sentence": [
                {"german": "Ich helfe dir.", "english": "I help you."}
            ]
        },
        {
            "german": "er",
            "english": "he",
            "sentence": [
                {"german": "Er liest ein Buch.", "english": "He is reading a book."}
            ]
        },
        {
            "german": "ihn",
            "english": "him",
            "sentence": [
                {"german": "Ich sehe ihn.", "english": "I see him."}
            ]
        },
        {
            "german": "ihm",
            "english": "to him/to it",
            "sentence": [
                {"german": "Ich gebe ihm einen Apfel.", "english": "I give him an apple."}
            ]
        },
        {
            "german": "sie",
            "english": "she/her/they/them",
            "sentence": [
                {"german": "Sie spielt Klavier.", "english": "She is playing the piano."},
                {"german": "Ich sehe sie.", "english": "I see her/them."},
                {"german": "Sie spielen im Park.", "english": "They are playing in the park."}
            ]
        },
        {
            "german": "es",
            "english": "it",
            "sentence": [
                {"german": "Es regnet heute.", "english": "It is raining today."},
                {"german": "Ich sehe es.", "english": "I see it."}
            ]
        },
        {
            "german": "wir",
            "english": "we",
            "sentence": [
                {"german": "Wir gehen ins Kino.", "english": "We are going to the cinema."}
            ]
        },
        {
            "german": "uns",
            "english": "us/to us",
            "sentence": [
                {"german": "Er sieht uns.", "english": "He sees us."},
                {"german": "Er gibt uns das Buch.", "english": "He gives us the book."}
            ]
        },
        {
            "german": "ihr",
            "english": "you (plural)/to her",
            "sentence": [
                {"german": "Ihr seid willkommen.", "english": "You are welcome."},
                {"german": "Ich helfe ihr.", "english": "I help her."},
                {"german": "Ich gebe euch das Buch.", "english": "I give you all the book."}
            ]
        },

        {
            "german": "euch",
            "english": "you/to you (both plural)",
            "sentence": [
                {"german": "Ich höre euch.", "english": "I hear you all."}
            ]
        },
        {
            "german": "ihnen",
            "english": "to them",
            "sentence": [
                {"german": "Ich schreibe ihnen eine E-Mail.", "english": "I write them an email."}
            ]
        },
        {
            "german": "Sie",
            "english": "you (formal, singular and plural)",
            "sentence": [
                {"german": "Wie geht es Ihnen?", "english": "How are you?"},
                {"german": "Ich sehe Sie.", "english": "I see you (formal)."}
            ]
        },
        {
            "german": "Ihnen",
            "english": "to you (formal, singular and plural)",
            "sentence": [
                {"german": "Ich danke Ihnen.", "english": "I thank you (formal)."}
            ]
        }
    ],
    preposition: [
        {
            "german": "in",
            "english": "in",
            "case": ["accusative", "dative"],
            "sentence": [
                {
                    "german": "Ich gehe in das Haus.",
                    "english": "I am going into the house. (Accusative)"
                },
                {
                    "german": "Ich bin in dem Haus.",
                    "english": "I am in the house. (Dative)"
                }
            ]
        },
        {
            "german": "zu",
            "english": "to, at",
            "case": ["dative"],
            "sentence": {
                "german": "Ich gehe zu meinem Freund.",
                "english": "I am going to my friend's house."
            }
        },
        {
            "german": "von",
            "english": "from, of",
            "case": ["dative"],
            "sentence": {
                "german": "Das Geschenk ist von meinem Freund.",
                "english": "The gift is from my friend."
            }
        },
        {
            "german": "mit",
            "english": "with",
            "case": ["dative"],
            "sentence": {
                "german": "Ich fahre mit dem Bus.",
                "english": "I am traveling by bus."
            }
        },
        {
            "german": "auf",
            "english": "on, at",
            "case": ["accusative", "dative"],
            "sentence": [
                {
                    "german": "Ich lege das Buch auf den Tisch.",
                    "english": "I am putting the book on the table. (Accusative)"
                },
                {
                    "german": "Das Buch liegt auf dem Tisch.",
                    "english": "The book is lying on the table. (Dative)"
                }
            ]
        },
        {
            "german": "für",
            "english": "for",
            "case": ["accusative"],
            "sentence": {
                "german": "Das ist ein Geschenk für dich.",
                "english": "This is a gift for you."
            }
        },
        {
            "german": "an",
            "english": "on (vertical), at",
            "case": ["accusative", "dative"],
            "sentence": [
                {
                    "german": "Ich hänge das Bild an die Wand.",
                    "english": "I am hanging the picture on the wall. (Accusative)"
                },
                {
                    "german": "Das Bild hängt an der Wand.",
                    "english": "The picture is hanging on the wall. (Dative)"
                }
            ]
        },
        {
            "german": "bei",
            "english": "by, near, at",
            "case": ["dative"],
            "sentence": {
                "german": "Ich bin bei meiner Tante.",
                "english": "I am at my aunt's house."
            }
        },
        {
            "german": "nach",
            "english": "to, toward, after",
            "case": ["dative"],
            "sentence": {
                "german": "Nach der Schule gehe ich nach Hause.",
                "english": "After school, I am going home."
            }
        },
        {
            "german": "aus",
            "english": "from, out of",
            "case": ["dative"],
            "sentence": {
                "german": "Ich komme aus Deutschland.",
                "english": "I come from Germany."
            }
        },
        {
            "german": "um",
            "english": "around, at (time)",
            "case": ["accusative"],
            "sentence": {
                "german": "Wir treffen uns um 8 Uhr.",
                "english": "We are meeting at 8 o'clock."
            }
        },
        {
            "german": "über",
            "english": "over, above",
            "case": ["accusative", "dative"],
            "sentence": [
                {
                    "german": "Ich hänge die Lampe über den Tisch.",
                    "english": "I am hanging the lamp above the table. (Accusative)"
                },
                {
                    "german": "Die Lampe hängt über dem Tisch.",
                    "english": "The lamp is hanging above the table. (Dative)"
                }
            ]
        },
        {
            "german": "vor",
            "english": "in front of, before",
            "case": ["accusative", "dative"],
            "sentence": [
                {
                    "german": "Ich stelle das Auto vor das Haus.",
                    "english": "I am parking the car in front of the house. (Accusative)"
                },
                {
                    "german": "Das Auto steht vor dem Haus.",
                    "english": "The car is parked in front of the house. (Dative)"
                }
            ]
        },
        {
            "german": "durch",
            "english": "through",
            "case": ["accusative"],
            "sentence": {
                "german": "Wir gehen durch den Park.",
                "english": "We are walking through the park."
            }
        },
        {
            "german": "bis",
            "english": "until, up to",
            "case": ["accusative"],
            "sentence": {
                "german": "Ich bleibe bis nächsten Montag.",
                "english": "I will stay until next Monday."
            }
        },
        {
            "german": "unter",
            "english": "under",
            "case": ["accusative", "dative"],
            "sentence": [
                {
                    "german": "Ich lege die Zeitung unter das Sofa.",
                    "english": "I am putting the newspaper under the sofa. (Accusative)"
                },
                {
                    "german": "Die Zeitung liegt unter dem Sofa.",
                    "english": "The newspaper is lying under the sofa. (Dative)"
                }
            ]
        },
        {
            "german": "zwischen",
            "english": "between",
            "case": ["accusative", "dative"],
            "sentence": [
                {
                    "german": "Ich stelle den Tisch zwischen die Stühle.",
                    "english": "I am placing the table between the chairs. (Accusative)"
                },
                {
                    "german": "Der Tisch steht zwischen den Stühlen.",
                    "english": "The table is standing between the chairs. (Dative)"
                }
            ]
        },
        {
            "german": "gegen",
            "english": "against",
            "case": ["accusative"],
            "sentence": {
                "german": "Das Auto fuhr gegen den Baum.",
                "english": "The car drove into the tree."
            }
        },
        {
            "german": "ohne",
            "english": "without",
            "case": ["accusative"],
            "sentence": {
                "german": "Ich gehe ohne meinen Bruder.",
                "english": "I am going without my brother."
            }
        },
        {
            "german": "seit",
            "english": "since, for (time)",
            "case": ["dative"],
            "sentence": {
                "german": "Ich wohne hier seit einem Jahr.",
                "english": "I have lived here for a year."
            }
        }
    ],
};

export default wordsData;

