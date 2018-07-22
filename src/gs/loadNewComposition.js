"use strict";

gs.loadNewComposition = function() {
	var i = 0,
		tracks = {},
		synthId, patId, keysId;

	common.smallId_i = 0;
	synthId = common.smallId();
	patId = common.smallId();
	keysId = common.smallId();
	for ( ; i < env.def_nbTracks; ++i ) {
		tracks[ common.smallId() ] = { order: i, toggle: true, name: "" };
	}
	gs.loadComposition( {
		id: common.uuid(),
		bpm: env.def_bpm,
		stepsPerBeat: env.def_stepsPerBeat,
		beatsPerMeasure: env.def_beatsPerMeasure,
		name: "",
		duration: 0,
		patterns: {
			[ patId ]: {
				name: "pat",
				type: "keys",
				keys: keysId,
				synth: synthId,
				duration: env.def_beatsPerMeasure
			}
		},
		synths: {
			[ synthId ]: {
				name: "synth",
				oscillators: {
					[ common.smallId() ]: { order: 0, type: "sine", detune: 0, pan: 0, gain: 1 },
				}
			}
		},
		tracks,
		blocks: {},
		keys: {
			[ keysId ]: {}
		}
	} ).then( function() {
		gs.openPattern( patId );
		gs.openSynth( synthId );
		ui.synths.show( synthId, true );
		gs.controls.focusOn( "main" );
	}, console.log.bind( console ) );
	return false;
};
