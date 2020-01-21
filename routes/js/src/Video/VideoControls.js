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
        icon: {
            color: theme.palette.background["default"],
            fontSize: 80
        },
        padding: {
            paddingLeft: '4px'
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
    return (react_1.createElement(core_2.Grid, { container: true, className: className },
        react_1.createElement(core_2.Grid, { item: true, xs: 3 },
            avState.audio &&
                react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return setMic(false); } },
                    react_1.createElement(icons_1.MicOffOutlined, { className: classes.icon })),
            avState.audio === false &&
                react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return setMic(true); } },
                    react_1.createElement(icons_1.MicOutlined, { className: classes.icon }))),
        react_1.createElement(core_2.Grid, { item: true, xs: 3 }),
        react_1.createElement(core_2.Grid, { item: true, xs: 5 },
            react_1.createElement(core_1.Box, { border: 8, borderColor: "white", borderRadius: "0%" },
                react_1.createElement(react_router_dom_1.Link, { to: {
                        pathname: '/'
                    } },
                    react_1.createElement(core_1.Button, { className: classes.widthHundred, color: "primary", size: "large", variant: "outlined", onClick: function () { return endSession(); } }, "End Session")))),
        react_1.createElement(core_2.Grid, { item: true, xs: 1 }),
        react_1.createElement(core_2.Grid, { item: true, xs: 3 },
            avState.video &&
                react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return setVidFeed(false); } },
                    react_1.createElement(icons_1.VideocamOffOutlined, { className: classes.icon })),
            avState.video === false &&
                react_1.createElement(core_1.IconButton, { className: classes.padding, onClick: function () { return setVidFeed(true); } },
                    react_1.createElement(icons_1.VideocamOutlined, { className: classes.icon }))),
        react_1.createElement(core_2.Grid, { item: true, xs: 2 },
            avState.volume > 0 &&
                react_1.createElement(core_1.IconButton, { onClick: function () { return setVolume(0); } },
                    react_1.createElement(icons_1.VolumeUpOutlined, { className: classes.icon })),
            avState.volume === 0 &&
                react_1.createElement(core_1.IconButton, { onClick: function () { return setVolume(30); } },
                    react_1.createElement(icons_1.VolumeOffOutlined, { className: classes.icon }))),
        react_1.createElement(core_2.Grid, { item: true, xs: 1 }),
        react_1.createElement(core_2.Grid, { item: true, xs: 5 },
            react_1.createElement(core_1.Slider, { value: avState.volume, style: { width: "230px" }, onChange: onVolumeChange }))));
}
exports["default"] = VideoControls;
