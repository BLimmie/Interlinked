"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var react_router_dom_1 = require("react-router-dom");
var styles_1 = require("@material-ui/core/styles");
var core_2 = require("@material-ui/core/");
var icons_1 = require("@material-ui/icons");
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        icon_on:{
            color: theme.palette.primary["main"],
            fontSize:45
        },
        icon_off:{
            color: theme.palette.background["default"],
            fontSize:45
        },
        button_box: {
            width: "5vw",
            height: "7vh"
        },
        padding: {
            paddingLeft: '15px',
        },
        widthHundred: {
            width: '100%'
        }
    });
});
exports.defaultAVState = {
    audio: true,
    video: true,
    volume: 50
};
// This function is what arranges all of the individual elements into the complete UI
function VideoControls(props) {
    var className = props.className, avState = props.avState, setAVState = props.setAVState, endSession = props.endSession;
    var classes = useStyles();
    var onVolumeChange = function (event, newValue) {
        setAVState({
            volume: newValue,
            audio: avState.audio,
            video: avState.video
        });
    };
    var setVolume = function (value) {
        setAVState({
            volume: value,
            audio: avState.audio,
            video: avState.video
        });
    };
    var setVidFeed = function (on) {
        setAVState({
            volume: avState.volume,
            audio: avState.audio,
            video: on
        });
    };
    var setMic = function (on) {
        setAVState({
            volume: avState.volume,
            audio: on,
            video: avState.video
        });
    };
    return (react_1.createElement(core_2.Grid, { container: true, spacing: 2, direction: 'row', 
                                                alignItems: 'flex-start', justify: 'flex-start' },
        react_1.createElement(core_2.Grid, { item: true },
            avState.audio &&
                react_1.createElement(core_1.Box, { className: classes.button_box, bgcolor: "#6e6b7a", justifyContent: "center" },
                    react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return setMic(false); } },
                        react_1.createElement(icons_1.MicOffSharp, { className: classes.icon_off }))),
            avState.audio === false &&
                react_1.createElement(core_1.Box, { className: classes.button_box, bgcolor: "#c7c6ce" },
                    react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return setMic(true); } },
                        react_1.createElement(icons_1.MicSharp, { className: classes.icon_on })))),
        react_1.createElement(core_2.Grid, { item: true },
            avState.video === false &&
                react_1.createElement(core_1.Box, { className: classes.button_box, bgcolor: "#6e6b7a" },
                    react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return setVidFeed(true); } },
                        react_1.createElement(icons_1.VideocamOffSharp, { className: classes.icon_off }))),
            avState.video &&
                react_1.createElement(core_1.Box, { className: classes.button_box, bgcolor: "#c7c6ce" },
                    react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return setVidFeed(false); } },
                        react_1.createElement(icons_1.VideocamSharp, { className: classes.icon_on })))),  
        react_1.createElement(core_2.Grid, { item: true },
            react_1.createElement(core_1.Box, { className: classes.button_box, bgcolor: "#d26363" },
                react_1.createElement(react_router_dom_1.Link, { to: {
                        pathname: '/'
                    } },
                    react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return endSession(); } }, 
                        react_1.createElement(icons_1.CallEndSharp, { className: classes.icon_off })))))));
}
exports["default"] = VideoControls;
