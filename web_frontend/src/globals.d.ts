var words;
var display_words;
var sentiment;
var point_in_transcript;
var phrase_count;

// This should be the raw output string from the server/sentiment/frame, something like
// '{"AU":{"Blink":0,"Brow Lowerer":0,"Cheek Raiser":3.62,"Chin Raiser":0,"Dimpler":1.46,"Inner Brow Raiser":0,"Jaw Drop":1.9,"Lid Tightener":2.91,"Lip Corner Depressor":0.24,"Lip Corner Puller":3.44,"Lip Stretcher":0,"Lip Tightener":0,"Lips Part":2.65,"Nose Wrinkler":1.46,"Outer Brow Raiser":0,"Upper Lid Raiser":0,"Upper Lip Raiser":2.87},"Emotion":{"anger":"VERY_UNLIKELY","joy":"VERY_LIKELY","sorrow":"VERY_UNLIKELY","surprise":"VERY_UNLIKELY"}}'
var emotions_AUs;