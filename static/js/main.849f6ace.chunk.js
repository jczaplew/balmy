(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],{136:function(e,t,a){e.exports=a.p+"static/media/partly_cloudy.34484b54.svg"},137:function(e,t,a){e.exports=a.p+"static/media/partly_cloudy_windy.0bcd5b3f.svg"},138:function(e,t,a){e.exports=a.p+"static/media/rain.633504b6.svg"},139:function(e,t,a){e.exports=a.p+"static/media/sun_thunderstorm.98a13764.svg"},199:function(e,t,a){e.exports=a.p+"static/media/sun.c536ba25.svg"},200:function(e,t,a){e.exports=a.p+"static/media/mostly_cloudy.7ee35f1f.svg"},201:function(e,t,a){e.exports=a.p+"static/media/cloudy.72925540.svg"},202:function(e,t,a){e.exports=a.p+"static/media/snow.7f879cdd.svg"},203:function(e,t,a){e.exports=a.p+"static/media/sunny_rain.bdf06b84.svg"},204:function(e,t,a){e.exports=a.p+"static/media/thunderstorm.48b7e66b.svg"},265:function(e,t,a){e.exports=a(408)},270:function(e,t,a){},271:function(e,t,a){},408:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),r=a(198),c=a.n(r),o=(a(270),a(271),a(13)),l=a.n(o),s=a(30),d=a(31),u=a(54),p=a(17),m=a(14),f=a.n(m),v=a(452),y=a(453),h=a(455),E=a(454),x=a(450);function b(e){return Math.round(9*e/5+32)}function g(e){return Math.round(2.23694*e)}function w(e){return e.replace("https://api.weather.gov/icons/","").split("?")[0].split("/").slice(2).map((function(e){return e.split(",")})).map((function(e){return{icon:e[0],percent:parseInt(e[1])}})).sort((function(e,t){return t.percent-e.percent}))}var k=a(199),O=a.n(k),S=a(136),j=a.n(S),M=a(200),T=a.n(M),D=a(201),F=a.n(D),_=a(137),W=a.n(_),P=a(202),z=a.n(P),C=a(138),B=a.n(C),L=a(203),N=a.n(L),R=a(204),V=a.n(R),A=a(139),H=a.n(A),G={skc:{description:"Fair/clear",icon:O.a},few:{description:"A few clouds",icon:j.a},sct:{description:"Partly cloudy",icon:j.a},bkn:{description:"Mostly cloudy",icon:T.a},ovc:{description:"Overcast",icon:F.a},wind_skc:{description:"Fair/clear and windy"},wind_few:{description:"A few clouds and windy",icon:W.a},wind_sct:{description:"Partly cloudy and windy",icon:W.a},wind_bkn:{description:"Mostly cloudy and windy"},wind_ovc:{description:"Overcast and windy"},snow:{description:"Snow",icon:z.a},rain_snow:{description:"Rain/snow"},rain_sleet:{description:"Rain/sleet"},snow_sleet:{description:"Rain/sleet"},fzra:{description:"Freezing rain"},rain_fzra:{description:"Rain/freezing rain"},snow_fzra:{description:"Freezing rain/snow"},sleet:{description:"Sleet"},rain:{description:"Rain",icon:B.a},rain_showers:{description:"Rain showers (high cloud cover)",icon:B.a},rain_showers_hi:{description:"Rain showers (low cloud cover)",icon:N.a},tsra:{description:"Thunderstorm (high cloud cover)",icon:V.a},tsra_sct:{description:"Thunderstorm (medium cloud cover)",icon:H.a},tsra_hi:{description:"Thunderstorm (low cloud cover)",icon:H.a},tornado:{description:"Tornado"},hurricane:{description:"Hurricane conditions"},tropical_storm:{description:"Tropical storm conditions"},dust:{description:"Dust"},smoke:{description:"Smoke"},haze:{description:"Haze"},hot:{description:"Hot"},cold:{description:"Cold"},blizzard:{description:"Blizzard"},fog:{description:"Fog/mist"}},I=a(459),X=a(449);function J(e){var t=e.period;return i.a.createElement(I.a,{style:{margin:"8px",width:"230px",height:"175px",display:"inline-block"}},i.a.createElement(X.a,null,i.a.createElement(x.a,{variant:"subtitle1"},t.name," ",f()(t.startTime).format("MMM D")),i.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"}},i.a.createElement("div",{style:{display:"inline-block"}},i.a.createElement("img",{src:t.icon,style:{height:"45px"},alt:""})),i.a.createElement("div",{style:{display:"inline-block",textAlign:"left",marginLeft:"16px",paddingTop:"8px",paddingBottom:"8px"}},i.a.createElement(x.a,{variant:"h6"},i.a.createElement("span",{style:{color:"#d5202a"}},t.maxTemp),"\xb0"," | ",i.a.createElement("span",{style:{color:"#0053ae"}},t.minTemp),"\xb0",i.a.createElement("span",{style:{fontWeight:400}},"F")),i.a.createElement(x.a,{variant:"body2"},t.windSpeed," ",t.windDirection))),i.a.createElement(x.a,{variant:"body2"},t.shortForecast)))}var K=a(451);function $(){var e=Object(n.useState)([]),t=Object(p.a)(e,2),a=t[0],r=t[1],c=Object(K.a)("(max-width: 500px)");function o(){return(o=Object(u.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.weather.gov/gridpoints/MPX/109,70/forecast").then((function(e){return e.json()}));case 2:t=e.sent,a=t.properties.periods.map((function(e){var a,n=f()(e.startTime).format("ddd"),i=[];e.isDaytime&&(i=t.properties.periods.filter((function(e){return(f()(e.startTime).format("ddd")===n||f()(e.endTime).format("ddd")===n)&&e})).map((function(e){return e.temperature})));var r=i?{minTemp:Math.min.apply(Math,Object(d.a)(i)),maxTemp:Math.max.apply(Math,Object(d.a)(i))}:{},c=w(e.icon);return Object(s.a)({},e,{startDayOfTheWeek:n,startDay:f()(e.startTime).format("M/D"),endDayOfTheWeek:f()(e.endTime).format("ddd"),endDay:f()(e.endTime).format("M/D")},c.length&&c[0].percent?{precip:c[0].percent}:{},{},r,{},c?{icon:(null===(a=G[c[0].icon])||void 0===a?void 0:a.icon)||e.icon}:{icon:e.icon})})),r(a.filter((function(e){return e.isDaytime})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){!function(){o.apply(this,arguments)}()}),[]),a?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{overflowX:"scroll"}},i.a.createElement("div",{style:{width:"2000px",display:"flex",paddingTop:"16px",paddingBottom:"16px"}},a.map((function(e){return i.a.createElement(J,{period:e})})))),i.a.createElement(v.a,null,i.a.createElement(y.a,null,a.map((function(e,t){return i.a.createElement(E.a,{key:t},i.a.createElement(h.a,{style:{padding:c?"10px":"16px"}},i.a.createElement(x.a,{variant:"body2"},e.startDayOfTheWeek," ",e.startDay)),i.a.createElement(h.a,{style:{padding:c?"10px":"16px"}},i.a.createElement(x.a,{variant:"body2"},i.a.createElement("span",{style:{color:"#d5202a"}},e.maxTemp),"\xb0"," | ",i.a.createElement("span",{style:{color:"#0053ae"}},e.minTemp),"\xb0",i.a.createElement("span",{style:{fontWeight:400}},"F"))),i.a.createElement(h.a,{style:{padding:c?"10px":"16px"}},i.a.createElement(x.a,{variant:"body2"},e.windSpeed," ",e.windDirection)),!c&&i.a.createElement(h.a,{style:{width:"50%",textAlign:"left",padding:c?"10px":"16px"}},i.a.createElement(x.a,{variant:"body1"},e.detailedForecast)))}))))):null}var q=a(209),Q=a.n(q);function U(e){switch(!0){case e>=348.76||e<=11.25:return"N";case e>=11.26&&e<=33.75:return"NNE";case e>=33.76&&e<=56.25:return"NE";case e>=56.26&&e<=78.75:return"ENE";case e>=78.76&&e<=101.25:return"E";case e>=101.26&&e<=123.75:return"ESE";case e>=123.76&&e<=146.25:return"SE";case e>=146.26&&e<=168.75:return"SSE";case e>=168.76&&e<=191.25:return"S";case e>=191.26&&e<=213.75:return"SSW";case e>=213.76&&e<=236.25:return"SW";case e>=236.26&&e<=258.75:return"WSW";case e>=258.76&&e<=281.25:return"W";case e>=281.26&&e<=303.75:return"WNW";case e>=303.76&&e<=326.25:return"NW";case e>=326.26&&e<=348.75:return"NNW";default:return"N/A"}}function Y(){var e=Object(n.useState)(void 0),t=Object(p.a)(e,2),a=t[0],r=t[1],c=Object(K.a)("(max-width: 500px)");function o(){return(o=Object(u.a)(l.a.mark((function e(){var t,n,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.weather.gov/stations/KMSP/observations/latest").then((function(e){return e.json()}));case 2:t=e.sent,(n=w(t.properties.icon))&&(t.properties.icon=G[null===(i=n[0])||void 0===i?void 0:i.icon].icon),t.properties.feelsLike=(null===a||void 0===a?void 0:a.properties.windChill.value)||(null===a||void 0===a?void 0:a.properties.heatIndex.value),r(t.properties);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){!function(){o.apply(this,arguments)}()}),[]),a?i.a.createElement("div",null,i.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-evenly",padding:c?0:"40px"}},i.a.createElement("div",null,i.a.createElement("img",{src:a.icon,style:{width:c?"130px":"175px"},alt:""})),i.a.createElement("div",null,i.a.createElement(x.a,{variant:c?"h2":"h1"},b(a.temperature.value),"\xb0F"),a.feelsLike&&i.a.createElement(x.a,{variant:"h5"},"Feels like ",b(a.feelsLike),"\xb0F"),!c&&i.a.createElement("div",null,i.a.createElement(x.a,{variant:"h3",style:{display:"inline-block"}},i.a.createElement(Q.a,{style:{transform:"rotate(".concat(a.windDirection.value-180,"deg)"),marginRight:"8px"}}),g(a.windSpeed.value),a.windGust.value?" | "+g(a.windGust.value):""),i.a.createElement(x.a,{variant:"h5",style:{display:"inline-block",marginLeft:"8px"}},"mph"),i.a.createElement(x.a,{variant:"h5",style:{display:"inline-block",marginLeft:"8px"}},U(a.windDirection.value)))),!c&&i.a.createElement(Z,{currentConditions:a})),c&&i.a.createElement(Z,{currentConditions:a})):null}function Z(e){var t,a=e.currentConditions;return a?i.a.createElement("div",null,i.a.createElement(v.a,{size:"small"},i.a.createElement(y.a,null,i.a.createElement(E.a,{className:"mobile-wind"},i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"subtitle2"},"Wind")),i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"body2"},g(a.windSpeed.value)," mph ",U(a.windDirection.value)))),a.windGust.value&&i.a.createElement(E.a,{className:"mobile-wind"},i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"subtitle2"},"Gusting")),i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"body2"},g(a.windGust.value)," mph"))),i.a.createElement(E.a,null,i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"subtitle2"},"Humidity")),i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"body2"},Math.round(a.relativeHumidity.value),"%"))),i.a.createElement(E.a,null,i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"subtitle2"},"Dew Point")),i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"body2"},b(a.dewpoint.value),"\xb0F"))),i.a.createElement(E.a,null,i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"subtitle2"},"Visiblity")),i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"body2"},(t=a.visibility.value,Math.round(.0006213712*t))," mi"))),i.a.createElement(E.a,null,i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"subtitle2"},"Pressure")),i.a.createElement(h.a,null,i.a.createElement(x.a,{variant:"body2"},Math.round(.01*a.barometricPressure.value)," mb")))))):null}var ee=a(222),te=a(210);function ae(e){var t=e.axisBottom,a=e.axisLeft,n=Object(ee.a)(e,["axisBottom","axisLeft"]);return i.a.createElement(te.a,Object.assign({margin:{top:20,right:20,bottom:50,left:50},xScale:{type:"time",format:"native",precision:"day"},xFormat:"time:%m/%d %H:00",yFormat:function(e){return"".concat(e,"\xb0F")},yScale:{type:"linear",min:"auto",max:"auto",stacked:!0,reverse:!1},curve:"monotoneX",axisTop:null,axisRight:null,axisBottom:Object(s.a)({format:"%a %m/%e",tickValues:"every day",legendOffset:-12,orient:"bottom",tickSize:5,tickPadding:5,tickRotation:0},t),axisLeft:Object(s.a)({orient:"left",tickSize:5,tickValues:7,tickPadding:5,tickRotation:0,legendOffset:-45,legendPosition:"middle"},a),colors:{scheme:"nivo"},lineWidth:2,enablePoints:!1,enableArea:!0,areaOpacity:.5,useMesh:!0,enableSlices:"x",sliceTooltip:function(e){return i.a.createElement("div",{style:{paddingTop:"2px",paddingBottom:"2px",paddingLeft:"4px",paddingRight:"4px",backgroundColor:"#fff",border:"1px solid #eee"}},i.a.createElement(x.a,{variant:"subtitle2"},e.slice.points[0].data.yFormatted," @ ",f()(e.slice.points[0].data.x).format("hA")))}},n))}function ne(){var e=Object(n.useState)(void 0),t=Object(p.a)(e,2),a=t[0],r=t[1];function c(){return(c=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.weather.gov/gridpoints/MPX/109,70").then((function(e){return e.json()})).then((function(e){return e.properties}));case 2:(t=e.sent).windSpeed.data=t.windSpeed.values.map((function(e){return Object(s.a)({},e,{x:f()(e.validTime.split("/")[0]).toDate(),y:Math.round(1.15078*e.value)})})),t.temperature.data=t.temperature.values.map((function(e){return Object(s.a)({},e,{x:f()(e.validTime.split("/")[0]).toDate(),y:b(e.value),value:b(e.value)})})),t.skyCover.data=t.skyCover.values.map((function(e){return Object(s.a)({},e,{x:f()(e.validTime.split("/")[0]).toDate(),y:e.value})})),t.probabilityOfPrecipitation.data=t.probabilityOfPrecipitation.values.map((function(e){return Object(s.a)({},e,{x:f()(e.validTime.split("/")[0]).toDate(),y:e.value})})),t.windSpeed.id="windSpeed",t.skyCover.id="skyCover",t.temperature.id="temperature",t.probabilityOfPrecipitation.id="probabilityOfPrecipitation",r(t);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}if(Object(n.useEffect)((function(){!function(){c.apply(this,arguments)}()}),[]),!a)return null;for(var o=a.temperature.data.map((function(e){return f()(e.x)})),m=f.a.min.apply(f.a,Object(d.a)(o)).startOf("day").add(1,"day"),v=f.a.max.apply(f.a,Object(d.a)(o)).startOf("day").diff(m,"days"),y=[m.toDate()],h=1;h<=v;h++)y.push(m.clone().add(h,"days").toDate());return i.a.createElement("div",null,i.a.createElement("div",{style:{height:"200px"}},i.a.createElement(ae,{data:[a.temperature],areaBaselineValue:Math.min.apply(Math,Object(d.a)(a.temperature.data.map((function(e){return e.value}))))-10,yScale:{type:"linear",min:Math.min.apply(Math,Object(d.a)(a.temperature.data.map((function(e){return e.value}))))-10,max:Math.max.apply(Math,Object(d.a)(a.temperature.data.map((function(e){return e.value}))))+10},yFormat:function(e){return"".concat(e,"\xb0F")},axisLeft:{legend:"Degrees F",format:function(e){return"".concat(e,"\xb0")}},axisBottom:{tickValues:y},colors:"#ff8833"})),i.a.createElement("div",{style:{height:"200px"}},i.a.createElement(ae,{data:[a.skyCover],yFormat:function(e){return"".concat(e,"%")},yScale:{type:"linear",min:0,max:100},axisLeft:{legend:"Cloud cover",tickValues:[0,25,50,75,100],format:function(e){return"".concat(e,"%")}},axisBottom:{tickValues:y},colors:"#a3a3a3"})),i.a.createElement("div",{style:{height:"200px"}},i.a.createElement(ae,{data:[a.probabilityOfPrecipitation],yFormat:function(e){return"".concat(e,"%")},yScale:{type:"linear",min:0,max:100},axisLeft:{legend:"Chance of Precip",tickValues:[0,25,50,75,100],format:function(e){return"".concat(e,"%")}},axisBottom:{tickValues:y},colors:"#15aadc"})),i.a.createElement("div",{style:{height:"200px"}},i.a.createElement(ae,{data:[a.windSpeed],yFormat:function(e){return"".concat(e," mph")},yScale:{type:"linear",min:0,max:Math.max.apply(Math,Object(d.a)(a.windSpeed.data.map((function(e){return e.value}))))+2},axisLeft:{legend:"Wind Speed (mph)"},axisBottom:{tickValues:y},colors:"#15aadc",enableArea:!1})))}var ie=function(){return i.a.createElement("div",{className:"App",style:{maxWidth:"1000px",margin:"0 auto",padding:"25px"}},i.a.createElement(Y,null),i.a.createElement($,null),i.a.createElement(ne,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(ie,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[265,1,2]]]);
//# sourceMappingURL=main.849f6ace.chunk.js.map