const collections = [
    { english: 'muslim', arabic: 'مسلم' },
    { english: 'bukhari', arabic: 'البخاري' },
    { english: 'tirmidzi', arabic: 'الترمذي' },
    { english: 'nasai', arabic: 'النسائي' },
    { english: 'abudaud', arabic: 'أبو داود' },
    { english: 'ibnumajah', arabic: 'ابن ماجه' },
    { english: 'ahmad', arabic: 'أحمد' },
    { english: 'darimi', arabic: 'الدارمي' },
    { english: 'malik', arabic: 'مالك' }
];
const getRandomCollection = () => {
    const randomIndex = Math.floor(Math.random() * collections.length);
    return collections[randomIndex];
};
const collection = getRandomCollection();

async function getRandomHadith() {
    try {
        const response = await fetch(
            `https://api.hadith.gading.dev/books/${collection.english}?range=300-500`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const hadiths = data['data']['hadiths'];
        const randomIndex = Math.floor(Math.random() * hadiths.length);
        return hadiths[randomIndex];
    } catch (error) {
        if (error.message === 'Network response was not ok' || error.message === 'Was there a typo in the url or port?') {
            return 'No internet connection available.';
        }
        return 'An error occurred: ' + error.message;
    }
}

async function printRandomHadith() {
    try {
        const hadith = await getRandomHadith();
        hadith['book'] = collection.arabic;
        return hadith;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}

module.exports.printRandomHadith = printRandomHadith;

// let h = await printRandomHadith()
// console.log(h);
// getAyahText
