var widget_clock = {
    _clock: null,
    elements: null,
    init: function () {
        _clock=this;
        _clock.elements = $('div[data-type="clock"]');
        _clock.elements.each(function(index) {
        });
    },
    update: function (dev,par) {
        var deviceElements;
	    if ( dev == '*' )
		    deviceElements= _clock.elements;
	    else
   		    deviceElements= _clock.elements.filter('div[data-device="'+dev+'"]');

	    deviceElements.each(function(index) {
	    	if ( $(this).data('get')==par || par =='*'){	
                var f = function() {
                    var d = new Array();
                    now = new Date();
                    // Y: Jahreszahl, vierstellig
                    // y: Jahreszahl, zweistellig
                    // m: Monatszahl, mit f�hrender Null
                    // n: Monatszahl, ohne f�hrende Null
                    // d: Tag des Monats, mit f�hrender Null
                    // j: Tag des Monats, ohne f�hrende Null
                    // H: Stunde des Tages, mit f�hrender Null
                    // G: Stunde im 24-Stunden-Format, ohne f�hrender Null
                    // i: Minute der Stunde, mit f�hrender Null
                    // s: Sekunde der Minute, mit f�hrender Null
                    // w: Wochentagszahl (Sonntag = 0)
                    // u: Millisekunden mit f�hrender Null
                    // O: Zeitunterschied zur Greenwich time (GMT) in Stunden
                    // U: Sekunden seit Beginn der UNIX-Epoche (January 1 1970 00:00:00 GMT)
                    
                    d['Y'] = now.getFullYear();
                    d['n'] = now.getMonth()+1;
                    d['j'] = now.getDate();
                    d['G'] = now.getHours();
                    d['i'] = now.getMinutes();
                    d['s'] = now.getSeconds();
                    d['w'] = now.getDay();
                    d['u'] = now.getMilliseconds();
                    d['O'] = now.getTimezoneOffset()/60;
                    d['U'] = Math.floor(now.getTime()/1000);
                    
                    d['y'] = d['Y']-2000;
                    d['d'] = d['j']<10?'0'+d['j']:d['j'];
                    d['m'] = d['n']<10?'0'+d['n']:d['n'];
                    d['H'] = d['G']<10?'0'+d['G']:d['G'];
                    d['i'] = d['i']<10?'0'+d['i']:d['i'];
                    d['s'] = d['s']<10?'0'+d['s']:d['s'];
                    d['u'] = d['u']<10?'000'+d['u']:d['u']<100?'00'+d['u']:d['u']<1000?'0'+d['u']:d['u'];
                    
                    datestring = f.format;
                    for ( var key in d ) {
                        datestring = datestring.replace(key, d[key]);
                    };
                    f.elem.text(datestring);
                };
                f.elem = $(this);
                f.format = $(this).attr("data-format")||'H:i:s';
                setInterval(f, $(this).attr("data-interval")||1000);
	    	}
	    });
    }
};