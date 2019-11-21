import React from 'react';
import Speech from './Speech';

interface TestProps {
    i: number;
}

interface TestState {
    i: number;
}

export default class Transcript_Tests extends React.Component<TestProps, TestState> {
    private timer: any
    private allwords: Map<string, number> = new Map()
    private allwords_keys: string[] = []
    private allwords_values: number[] = []
    private i: number = 0
  
    constructor(props: TestProps) {
      super(props);
      this.setState({
        i: props.i
      });
    }

    change_text() {
        if (this.i === 7 || this.i === 19 || this.i === 30 || this.i === 32 
            || this.i === 35 || this.i === 38 || this.i === 40 || this.i === 43) {
            globalThis.words.clear();
            globalThis.point_in_transcript = 0;
            globalThis.phrase_count = 0;
        }
        if (this.i === 45) {
            globalThis.words.clear();
            globalThis.point_in_transcript = 0;
            globalThis.phrase_count = 0;
            this.i = 0;
        }
        if (this.i < this.allwords_keys.length) {
            globalThis.words.set(this.allwords_keys[this.i], this.allwords_values[this.i]);
            this.i = this.i + 1;
        }

        // All this global array/variable code is so that Speech can function properly
        globalThis.display_words = Array.from( globalThis.words.keys() );
        globalThis.sentiment = Array.from( globalThis.words.values() );

        if (globalThis.display_words.length !== globalThis.phrase_count) {
            globalThis.phrase_count = globalThis.display_words.length;
        }

        if (globalThis.point_in_transcript + 3 !== globalThis.phrase_count) {
            globalThis.point_in_transcript = globalThis.phrase_count - 3;
            if (globalThis.point_in_transcript < 0) {
                globalThis.point_in_transcript = 0;
            }
        }

        this.setState({
            i: 0
        });

        return null
    }

    componentDidMount() {
            
        globalThis.words = new Map();
        globalThis.display_words = Array.from( globalThis.words.keys() );
        globalThis.sentiment = Array.from( globalThis.words.values() ); 
        this.i = 0;
    
        // Predicting the future for testing purposes
        this.allwords = new Map();
        
        // TNG test
        this.allwords.set("I did not know how many days it had been.", 0);
        this.allwords.set("I did not know if they were still searching for me.", 2);
        this.allwords.set("I...forgive me, I need a moment.", 2);
        this.allwords.set("Just before I was rescued, he offered me freedom.", 1);
        this.allwords.set("Anything I wanted, if I would just tell him how many lights I saw.", 0);
        this.allwords.set("The thing is...", 0);
        this.allwords.set("In the end, I really did see 5 lights.", 2);
    
        // YMXD test
        this.allwords.set("My beliefs are not as concrete as they once were.", 2);
        this.allwords.set("The world is not as simple as black and white.", 0);
        this.allwords.set("Yesterday, I judged an innocent man as guilty.", 2);
        this.allwords.set("It was a simple mistake.", 0);
        this.allwords.set("Anyone could have made it.", 0);
        this.allwords.set("Yet, I shouldn't be making any mistakes.", 0);
        this.allwords.set("I'm grateful that my aide managed to bring him back to the courtroom.", 1);
        this.allwords.set("But she doesn't deserve the pressure I'm putting on her.", 2);
        this.allwords.set("I fear that I cannot live up to the standard required of me.", 2);
        this.allwords.set("I fear that I've never been able to.", 2);
        this.allwords.set("I will surely be replaced soon.", 0);
        this.allwords.set("When I am judged, I hope they will be kind.", 1);
    
        // LL test
        this.allwords.set("Ah, we met yesterday!", 1);
        this.allwords.set("She had bought two tickets to the aquarium up in the city.", 0);
        this.allwords.set("It went really well!", 1);
        this.allwords.set("We even ran into some of our friends from the group.", 1);
        this.allwords.set("They were doing well, too.", 1);
        this.allwords.set("Last I heard, they were going through a rough patch.", 2);
        this.allwords.set("So it was a relief to see them out on a date.", 1);
        this.allwords.set("Nico even told me that they're planning to move in together.", 1);
        this.allwords.set("Um, let me think...", 0);
        this.allwords.set("Well, we did have an argument about maintaining a relationship while she's traveling for work.", 2);
        this.allwords.set("But we worked it out, and we're doing fine now.", 1);
    
        // ENP test
        this.allwords.set("Do you believe in gravity?", 0);
        this.allwords.set("It's the force that draws people together.", 0);
    
        // FV test
        this.allwords.set("When you're sitting at a table, with a napkin on either side, which one do you take?", 0);
        this.allwords.set("Right or left? Any choice is correct.", 1);
        this.allwords.set("As long as you take your napkin first, the others will have no choice but to follow your example.", 0);
    
        // SMTN test
        this.allwords.set("We lost everything.", 2);
        this.allwords.set("But he was still alive.", 1);
        this.allwords.set("Still, I'm not sure if it's a life worth living.", 2);
    
        // MTLCA test
        this.allwords.set("Without iron, your blood cells cannot carry oxygen throughout your body.", 2);
        this.allwords.set("You can breathe as hard as you like and still suffocate.", 2);
    
        // CZD test
        this.allwords.set("I can fix anything.", 1);
        this.allwords.set("But even I can't bring back the dead.", 2);
        this.allwords.set("It's just a fact.", 0);
    
        // JSPH test
        this.allwords.set("Yeah, I tend not to think things through, but everything usually turns out alright.", 1);
        this.allwords.set("Nothing's killing me but old age.", 1);
    
        this.allwords_keys = Array.from( this.allwords.keys() );
        this.allwords_values = Array.from( this.allwords.values() );

        this.timer = setInterval(() => {
          this.change_text();
        }, 3000);
      }
    
    componentWillUnmount() {
          clearInterval(this.timer)
        }
  
      render() {    
        return(<Speech />);
      }
}