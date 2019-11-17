export default class Transcript_Tests {
}
// import Run from './index';
// 
// export default function Transcript_Tests() {
//     // Global variable for prototyping purposes
//     globalThis.words = new Map();
// 
//     // Global variables that will probably exist beyond prototyping
//     globalThis.display_words = Array.from( globalThis.words.keys() );
//     globalThis.sentiment = Array.from( globalThis.words.values() ); 
// 
//     // Predicting the future for prototyping purposes
//     let i = 0;
//     let allwords = new Map();
//     // TNG test
//     allwords.set("I did not know how many days it had been.", 0);
//     allwords.set("I did not know if they were still searching for me.", 2);
//     allwords.set("I...forgive me, I need a moment.", 2);
//     allwords.set("Just before I was rescued, he offered me freedom.", 1);
//     allwords.set("Anything I wanted, if I would just tell him how many lights I saw.", 0);
//     allwords.set("The thing is...", 0);
//     allwords.set("In the end, I really did see 5 lights.", 2);
// 
//     // YMXD test
//     allwords.set("My beliefs are not as concrete as they once were.", 2);
//     allwords.set("The world is not as simple as black and white.", 0);
//     allwords.set("Yesterday, I judged an innocent man as guilty.", 2);
//     allwords.set("It was a simple mistake.", 0);
//     allwords.set("Anyone could have made it.", 0);
//     allwords.set("Yet, I shouldn't be making any mistakes.", 0);
//     allwords.set("I'm grateful that my aide managed to bring him back to the courtroom.", 1);
//     allwords.set("But she doesn't deserve the pressure I'm putting on her.", 2);
//     allwords.set("I fear that I cannot live up to the standard required of me.", 2);
//     allwords.set("I fear that I've never been able to.", 2);
//     allwords.set("I will surely be replaced soon.", 0);
//     allwords.set("When I am judged, I hope they will be kind.", 1);
// 
//     // LL test
//     allwords.set("Ah, we met yesterday!", 1);
//     allwords.set("She had bought two tickets to the aquarium up in the city.", 0);
//     allwords.set("It went really well!", 1);
//     allwords.set("We even ran into some of our friends from the group.", 1);
//     allwords.set("They were doing well, too.", 1);
//     allwords.set("Last I heard, they were going through a rough patch.", 2);
//     allwords.set("So it was a relief to see them out on a date.", 1);
//     allwords.set("Nico even told me that they're planning to move in together.", 1);
//     allwords.set("Um, let me think...", 0);
//     allwords.set("Well, we did have an argument about maintaining a relationship while she's traveling for work.", 2);
//     allwords.set("But we worked it out, and we're doing fine now.", 1);
// 
//     // ENP test
//     allwords.set("Do you believe in gravity?", 0);
//     allwords.set("It's the force that draws people together.", 0);
// 
//     // FV test
//     allwords.set("When you're sitting at a table, with a napkin on either side, which one do you take?", 0);
//     allwords.set("Right or left? Any choice is correct.", 1);
//     allwords.set("As long as you take your napkin first, the others will have no choice but to follow your example.", 0);
// 
//     // SMTN test
//     allwords.set("We lost everything.", 2);
//     allwords.set("But he was still alive.", 1);
//     allwords.set("Still, I'm not sure if it's a life worth living.", 2);
// 
//     // MTLCA test
//     allwords.set("Without iron, your blood cells cannot carry oxygen throughout your body.", 2);
//     allwords.set("You can breathe as hard as you like and still suffocate.", 2);
// 
//     // CZD test
//     allwords.set("I can fix anything.", 1);
//     allwords.set("But even I can't bring back the dead.", 2);
//     allwords.set("It's just a fact.", 0);
// 
//     // JSPH test
//     allwords.set("Yeah, I tend not to think things through, but everything usually turns out alright.", 1);
//     allwords.set("Nothing's killing me but old age.", 1);
// 
//     let allwords_keys = Array.from( allwords.keys() );
//     let allwords_values = Array.from( allwords.values() );
// 
// 
//     let timer = setTimeout(function Time_Passes() {
//     Run();
//     if (i === 7 || i === 19 || i === 30 || i === 32 || i === 35 || i === 38 || i === 40 || i === 43) {
//         globalThis.words.clear();
//         globalThis.point_in_transcript = 0;
//         globalThis.phrase_count = 0;
//     }
//     if (i === 45) {
//         globalThis.words.clear();
//         globalThis.point_in_transcript = 0;
//         globalThis.phrase_count = 0;
//         i = 0;
//     }
//     if (i < allwords_keys.length) {
//         globalThis.words.set(allwords_keys[i], allwords_values[i]);
//         i++;
//     }
//     timer = setTimeout(Time_Passes, 3000);
//     return(0);
//     }, 3000);
// 
//     setTimeout(() => {
//     clearTimeout(timer);
//     }, 1000000);
// }
