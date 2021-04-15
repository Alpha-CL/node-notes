///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const {EventEmitter} = require('events');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * EventEmitter             //
 *
 *
 * addEvent: on(fn, callback);
 *
 * emitEvent: emit( fn [, prarams] );
 *
 * removeEvent: ee.off(fn);         // 仅可移除有命名的函数
 */

const ee = new EventEmitter();

ee.on('cusEvent', () => {
	console.log('[custom event triggered-01]');
});

ee.on('cusEvent', () => {
	console.log('[custom event triggered-02]');
});

ee.on('cusEvent', () => {
	console.log('[custom event triggered-03]');
});


ee.once('cusEvent', () => {
	console.log('[custom event triggered-04, once() 仅触发一次]');
});


const fn5 = () => {
	console.log('[custom event triggered-05]');
};
ee.on('cusEvent', fn5);
ee.off(fn5);


ee.emit('cusEvent');
ee.emit('cusEvent');


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
