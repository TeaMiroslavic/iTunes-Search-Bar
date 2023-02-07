const ul = document.getElementById('list');
const loader = document.getElementById('loader');
const input = document.getElementById('filterInput');
const noMatch = document.getElementById('noMatch');

noMatch.textContent = '';

input.focus();

const hideloader = () => {
    loader.style.display = 'none';
};

try {
    hideloader();
    const getAPI = async (termParam) => {
        const url = `https://itunes.apple.com/search?entity=song&country=hr&term=${termParam}`;
        loader.style.display = 'block';
        const response = await fetch(url);
        const data = await response.json();
        hideloader();
        return data;
    };

    const renderData = (d) => {
        const li = `<li>${d.artistName} - ${d.trackName}</li>`;
        ul.innerHTML += li;
        noMatch.textContent = '';
    };

    const filterData = async (termInsert) => {
        noMatch.textContent = '';
        if (!termInsert) {
            ul.innerHTML = '';
            return;
        }
        const data = await getAPI(termInsert);
        if (!data.results.length) {
            noMatch.textContent = 'Sorry, no matches were found.';
            ul.innerHTML = '';
        }
        ul.innerHTML = '';
        data.results.forEach(renderData);
    };

    input.addEventListener('input', () => {
        filterData(input.value);
    });
} catch (error) {
    noMatch.textContent = '';
    ul.innerHTML = '';
    console.error('Something went wrong');
}
