//variables
let btn = document.querySelector("#new-quote");
let quote = document.querySelector('.quote');
let person = document.querySelector('.person');

const quotes=[{
    quote: ` "I have no special talent. I am only passionately curious"`,
    person: `Albert Einstein`},
    {
        quote: `"Have the Courage to follow your heart and intuition. They somehow know what you truly want to become."`,
        person: `Steve Jobs` 
    },
    {   quote:`"However difficult life may seem, there is always something you can do and succeed at."`,
        person: `Stephen Hawking`
    },
    {   quote:`"The best way to find yourself is to lose yourself in the service of others."`,
        person: `Mahatma Gandhi`
    },
    {
        quote:`"The greatest glory in living lies not in never falling, but in rising every time we fall."`,
        person: `Nelson Mandela`
    },
    {
        quote:`"The best and most beautiful things in the world cannot be seen or even touched—they must be felt with the heart."` ,
        person: `Helen Keller`
    },
    {
        quote:`"Success is not final, failure is not fatal: It is the courage to continue that counts."`,
        person:`Winston Churchill`
    },
    {
       quote:`"Be yourself; everyone else is already taken."`,
       person:`Oscar Wilde`
  },
  {
    quote:`"Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did."`,
    person: `Mark Twain`
  },
  {
    quote: `"Stay on your G's GOD, GOAL, GROWING and GLOWING"`,
    person: `kanchan`
  }
];
btn.addEventListener('click',function(){
    let random = Math.floor(Math.random() * quotes.length);
    quote.innerText = quotes[random].quote;
    person.innerText = quotes[random].person;
})