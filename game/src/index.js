import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route,withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import {shuffle , sample} from 'underscore';

const authors= [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.png',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn',
                 'Life on the Mississippi',
                 'Roughing It'   ]
    }, 
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesduckens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield',
                 'A Tale of Two Cit']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.png',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter']
    },
    {
        name: 'Stephan King',
        imageUrl: 'images/authors/stephanking.png',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining',
                 'IT']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/stephanking.png',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['Hamlet',
                 'Macbeth','R&J']
    }
]; 

function getTurnData(authors){
    const allBooks = authors.reduce(function (p, c, i)
        {
            return p.concat(c.books);
        }, []);

const fourRandomBooks =  shuffle(allBooks).slice(0,4);
const answar = sample(fourRandomBooks);

return {
    books:fourRandomBooks,
    author: authors.find((author) => 
              author.books.some((title) => 
                title===answar))
  }
}
function resetState(){
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}
let state=resetState();

function onAnswerSelected(answar){
    const isCorrect = state.turnData.author.books.some((book) => book === answar);
    state.highlight= isCorrect ? 'correct' : 'wrong';
    render();
}



function App () {
    return <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected}
    onContinue ={() => {
        state = resetState();
        render();
    }} />;
}
const AuthorWrapper= withRouter(({ history }) => 
  <AddAuthorForm onAddAuthor={(author) => {
  authors.push(author)
  history.push('/');
}} />
);

function render () { 
    ReactDOM.render(<BrowserRouter>
            <React.Fragment>
                    <Route exact path="/" component={App} />
                    <Route exact path="/add" component={AuthorWrapper} />
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();
registerServiceWorker();
