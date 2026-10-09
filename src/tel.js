/* ===== v7.1 : le portable d'Aden (téléphone complet, applis qui s'ouvrent dedans) ===== */
APPS.contacts=['👤','Contacts','#8E8E93'];APPS.agenda=['📅','Agenda','#FF453A'];
var TELM=!!D.tel||(D.s||[]).some(function(i){return Array.isArray(i)&&(i[0]=='HOME'||i[0]=='LOCK')}),
TD={home:null,lock:null,conv:[],cur:null,mail:[],bank:[],fol:[],soc:[],news:[],ag:[],ph:[],no:[],comp:[]},TEL=null,OUT=[],ORIG={},APPX={};
for(var bk0 in BK)ORIG[bk0]=BK[bk0];
function isSoc(md){return /^@|tiktok|instagram|twitter|\bx\b|reddit|threads|youtube|snap/i.test(md||'')}
function same(a,b){if(!a||!b)return false;if(NZ(a)==NZ(b))return true;var x=who(a);return !!x&&x===who(b)}
function convOf(n){for(var q=0;q<TD.conv.length;q++)if(same(TD.conv[q].t,n))return TD.conv[q];return null}
function telAdd(i){var k=i[0],nw=!TEL;if(nw)TEL=H('div','tel');
if(k=='HOME')TD.home=i;else if(k=='LOCK')TD.lock=i;
else if(k=='SMS'){TD.cur={t:i[1],d:i[2],m:[],hd:1};TD.conv.push(TD.cur)}
else if(k=='S'){var c=TD.cur;if(!c||(!c.hd&&i[1]!='Aden'&&!same(c.t,i[1]))){c=convOf(i[1]=='Aden'?(c&&c.t):i[1]);if(!c){c={t:i[1]=='Aden'?'Messages':i[1],m:[]};TD.conv.push(c)}TD.cur=c}c.m.push(i)}
else if(k=='@')TD.mail.push(i);else if(k=='BANK')TD.bank.push(i);else if(k=='FOL')TD.fol.push(i);
else if(k=='#'){(isSoc(i[1])?TD.soc:TD.news).push(i)}else if(k=='UNE'||k=='INFO')TD.news.push(i);
else if(k=='AG')TD.ag=TD.ag.concat(i[1]||[]);else if(k=='PH')TD.ph=TD.ph.concat(i[1]||[]);else if(k=='NO')TD.no.push(i);
if(k!='S'&&k!='SMS')TD.cur=TD.cur&&TD.cur.hd&&k=='S'?TD.cur:null;
return nw?TEL:null}
if(TELM){['HOME','LOCK','S','SMS','@','BANK','FOL','#','UNE','INFO','AG','PH','NO'].forEach(function(k){BK[k]=telAdd});FIN.push(function(){if(TEL)buildTel()})}

/* blocs simples hors portable : agenda, photos, notes */
if(!TELM){BK.AG=function(i){var el=H('div','agc');el.dataset.app='Agenda';el.appendChild(H('div','agh','📅 Agenda'));agList(el,i[1]||[]);return el};
BK.PH=function(i){var el=H('div','picr phr');(i[1]||[]).forEach(function(p,j){el.appendChild(H('div','pcp','<span class="pcv">'+E(p[1]||'📸')+'</span><span class="pcl">'+E(p[0]||'')+'</span>'+(p[2]?'<small>'+E(p[2])+'</small>':'')));el.lastChild.style.setProperty('--r',((j%2?1:-1)*(1.2+j%3*.8))+'deg')});return el};
BK.NO=function(i){var el=H('div','nte','<b>'+E(i[1]||'Note')+'</b>'+(i[3]?'<small>'+E(i[3])+'</small>':'')+'<div>'+PARA(i[2])+'</div>');el.dataset.app='Notes';return el}}
function agList(el,L){var cur=null;if(!L.length){el.appendChild(H('div','tem','Rien de prévu.'));return}L.forEach(function(a){if(a[0]!==cur){cur=a[0];el.appendChild(H('div','agd',E(cur)))}el.appendChild(H('div','agr'+(/match|⚽/i.test((a[2]||'')+(a[3]||''))?' mt':''),'<span class="agt">'+E(a[1]||'')+'</span><span class="agi">'+E(a[3]||'•')+'</span><span>'+MD(a[2]||'')+'</span>'))})}

function buildTel(){var hm=TD.home||['HOME'],tm=hm[1]||(TD.lock&&TD.lock[1])||'9:41',T=TEL,stack=[];
T.innerHTML='<div class="tsb"><b>'+E(tm)+'</b><span class="tisl"></span><span class="tic">5G <i class="tbat"><u></u></i></span></div><div class="tsc"></div><button class="thb" type="button" aria-label="Accueil"><i></i></button>';
T.dataset.app='Portable';var SC2=T.querySelector('.tsc'),OB=H('div','tout');OB.hidden=1;T.parentNode.insertBefore(OB,T.nextSibling);
function show(fn,dir){var v=H('div','tvw '+(dir||'fw'));isl(T,null);fn(v);SC2.innerHTML='';SC2.appendChild(v);SC2.scrollTop=0;T.classList.toggle('onhome',fn===home);T.classList.toggle('onlock',fn===lock)}
function open(fn){stack.push(fn);show(fn,'fw')}
function back(){stack.pop();show(stack[stack.length-1]||home,'bw')}
function nav(v,title,right){var n=H('div','tnb','<button class="tbk" type="button">‹</button><b>'+E(title)+'</b>');n.firstChild.onclick=function(e){e.stopPropagation();back()};if(right){var r=H('button','tnr',right[0]);r.type='button';r.onclick=right[1];n.appendChild(r)}v.appendChild(n);return n}
function empty(v,t){v.appendChild(H('div','tem',E(t)))}
function lab(o){return o.k=='sms'?'💬 SMS à '+o.w+' : « '+o.t+' »':o.k=='call'?'📞 Appeler '+o.w:o.k=='vid'?'📹 Visio avec '+o.w:'✉️ Mail à '+o.w+(o.o?' · '+o.o:'')}
function drop(o){var q=OUT.indexOf(o);if(q>-1)OUT.splice(q,1);if(o.el)o.el.remove();outUpd()}
function outUpd(){OB.hidden=!OUT.length;OB.innerHTML='';if(!OUT.length)return;OB.appendChild(H('b','',OUT.length+' action'+(OUT.length>1?'s':'')+' en attente · part'+(OUT.length>1?'ent':'')+' avec « Envoyer au MJ » · ✕ pour annuler'));OUT.forEach(function(o){var r=H('div','tor','<span>'+E(lab(o))+'</span>'),x=H('button','tox','✕');x.type='button';x.setAttribute('aria-label','Annuler');x.onclick=function(){drop(o)};r.appendChild(x);OB.appendChild(r)})}
T.querySelector('.thb').onclick=function(){stack=[];show(TD.lock&&!T.dataset.ul?lock:home,'bw')};
/* ---- données dérivées ---- */
function unreadConv(c){return c.m.length&&c.m[c.m.length-1][1]!='Aden'&&!c.read?1:0}
function badges(){var b={messages:0,mail:0,telephone:0};TD.conv.forEach(function(c){b.messages+=unreadConv(c)});TD.mail.forEach(function(i){if(!(i[5]||{}).lu&&!i.rd)b.mail++});calls().forEach(function(c){if(c.miss)b.telephone+=c.n||1});(hm[2]||[]).forEach(function(a){if(a[1]!=null)b[NZ(appOf(a[0])[1])]=a[1]});return b}
function calls(){var L=[];(TD.lock&&TD.lock[3]||[]).forEach(function(n){if(appOf(n[0])[1]=='Téléphone')L.push({n:(/\((\d+)\)/.exec(n[2]||'')||[0,1])[1]*1,who:n[1],t:n[3],miss:/manqu/i.test(n[2]||''),txt:n[2]})});TD.conv.forEach(function(c){c.m.forEach(function(i){var x=i[4]||{};if(x.call&&!L.some(function(l){return NZ(l.who)==NZ(i[1])}))L.push({n:x.call,who:i[1],t:i[3],miss:1,txt:'Appel manqué'})})});return L}
function contacts(){var S={},W=[],L=[];function add(n){if(!n||n=='Aden'||n=='Messages'||S[NZ(n)])return;var w=who(n);if(w&&W.indexOf(w)>-1)return;S[NZ(n)]=1;if(w)W.push(w);L.push(n)}Object.keys(D.P||{}).forEach(add);TD.conv.forEach(function(c){if(!grpOf(c))add(c.t);c.m.forEach(function(i){add(i[1])})});TD.mail.forEach(function(i){if(who(i[1]))add(i[1])});calls().forEach(function(c){add(c.who)});
return L.sort(function(a,b){var ga=gOf(a),gb=gOf(b);return (gb==null?-1:gb)-(ga==null?-1:ga)||a.localeCompare(b)})}
function gOf(n){var r=pget(n);return typeof r=='number'?r:(typeof r=='string'&&/\d/.test(r)?parseInt(r.replace(/[^\d]/g,''),10):null)}
function tierOf(n){var r=pget(n),g=gOf(n);return typeof r=='string'&&/[a-z]/i.test(r)?r.replace(/\s*\d+\s*$/,''):(g!=null?tier(g):'')}
function grpOf(c){var s=[];c.m.forEach(function(i){if(i[1]!='Aden'&&s.indexOf(i[1])<0)s.push(i[1])});return s.length>1}
function queue(o,lbl){if(o.k=='call'||o.k=='vid'){for(var q=0;q<OUT.length;q++)if(OUT[q].k==o.k&&same(OUT[q].w,o.w)){open(function(v){callScr(v,OUT[q])});return}OUT.push(o);outUpd();open(function(v){callScr(v,o)});return}OUT.push(o);outUpd();flash(lbl)}
function callScr(v,o){v.classList.add('tcall');var vid=o.k=='vid';setTimeout(function(){isl(T,(vid?'📹 ':'📞 ')+o.w)},50);v.innerHTML='<span class="tbig">'+AV(o.w)+'</span><b>'+E(o.w)+'</b><small>'+(vid?'📹 Appel vidéo…':'📞 Appel…')+'<br>Il sera passé quand tu enverras au MJ.</small>';var cx=H('div','tcx'),h=H('button','hang','<i>✕</i>Raccrocher'),k=H('button','keep','<i>✓</i>Garder');h.type=k.type='button';h.onclick=function(){drop(o);flash((vid?'Visio avec ':'Appel à ')+o.w+' annulé'+(vid?'e':''));back()};k.onclick=function(){back()};cx.appendChild(h);cx.appendChild(k);v.appendChild(cx)}
function flash(t){var f=H('div','tfl',E(t));T.appendChild(f);setTimeout(function(){f.classList.add('go')},1400);setTimeout(function(){f.remove()},1900)}
/* ---- écrans ---- */
function lock(v){var l=ORIG.LOCK(TD.lock);l.classList.add('in');v.appendChild(l);var u=l.querySelector('.lkf2');u.innerHTML='<button class="tul" type="button">Déverrouiller</button>';u.firstChild.onclick=function(e){e.stopPropagation();T.dataset.ul=1;stack=[];show(home,'up')}}
function home(v){var b=badges();v.classList.add('thm');
var mt=null;for(var q=0;q<TD.ag.length&&!mt;q++)if(/match|\bvs\b|journée/i.test(TD.ag[q][2]||''))mt=TD.ag[q];for(var q2=0;q2<TD.ag.length&&!mt;q2++)if(/⚽/.test((TD.ag[q2][2]||'')+(TD.ag[q2][3]||'')))mt=TD.ag[q2];
var hh=(/(\d{1,2})\s?[h:]/.exec(tm)||[0,12])[1]*1,wx=WX=='rain'?['🌧️','Pluie','11°']:WX=='snow'?['❄️','Neige','-1°']:WX=='sun'?['☀️','Grand soleil','27°']:hh>=21||hh<6?['🌙','Nuit claire','9°']:hh<10?['🌤️','Matin frais','12°']:['⛅','Éclaircies','17°'],
wdg=function(c,h){return '<div class="hme '+c+'">'+h+'</div>'},
w1='<div class="hmc"><b>'+E(tm)+'</b><small>'+E(hm[4]||'')+'</small></div>',
w2=hm[3]?wdg('',MD(hm[3])):SC?wdg('wmt','<small>En direct</small><b>'+E(SC[1])+' '+SC[2]+'-'+SC[3]+' '+E(SC[4])+'</b>'+(MI?'<em>'+E(MI)+'</em>':'')):mt?wdg('wmt','<small>Prochain match</small><b>'+MD(mt[2])+'</b><em>'+E(mt[0]+' · '+(mt[1]||''))+'</em>'):wdg('','🦊 Bonne journée'),
w3=wdg('wwx','<span class="wxi">'+wx[0]+'</span><b>'+wx[2]+'</b><small>'+wx[1]+(MY.city?' · '+E(MY.city):'')+'</small>'),
w4=N0!=null?wdg('wnt','<small>Note moyenne</small><b>'+F1(N0)+'</b><i><u style="width:'+Math.round(N0*10)+'%"></u></i>'):TD.ag.length?wdg('wag','<small>📅 '+E(TD.ag[0][0])+'</small><b>'+E(TD.ag[0][1]||'')+'</b><em>'+MD(TD.ag[0][2])+'</em>'):wdg('wag','<small>📅 Agenda</small><em>Rien de prévu</em>');
v.appendChild(H('div','hmw',w1+w2+w3+w4));
APPS[NZ(MY.n)]=[MY.em,MY.n,MYC2[1]];APPS[NZ(SPO[1])]=[SPO[0],SPO[1],SPO[2]];var dock=['Téléphone','Messages','Mail','Agenda'],base=['Contacts','Photos','Banque','Réseaux','Actus','Notes',MY.n,SPO[1]].concat(Object.keys(APPX).map(function(k){return appOf(k)[1]}));(hm[2]||[]).forEach(function(a){var n=appOf(a[0])[1];if(dock.indexOf(n)<0&&base.indexOf(n)<0)base.push(n)});
var gr=H('div','hmg');base.forEach(function(n,j){gr.appendChild(icon(n,b,j))});v.appendChild(gr);var dk=H('div','tdk');dock.forEach(function(n,j){dk.appendChild(icon(n,b,j+base.length))});v.appendChild(dk)}
function icon(n,b,j){var ap=appOf(n),bd=b[NZ(ap[1])],e=H('button','hma','<span class="hmi" style="background:'+ap[2]+'">'+ap[0]+(bd?'<i>'+E(bd)+'</i>':'')+'</span><small>'+E(ap[1])+'</small>');e.type='button';e.style.animationDelay=(60+j*30)+'ms';e.onclick=function(){open(APP[NZ(ap[1])]||function(v){nav(v,ap[1]);empty(v,'Rien de nouveau dans '+ap[1]+'.')})};return e}
var APP={};for(var ax in APPX)APP[NZ(appOf(ax)[1])]=(function(f){return function(v){f(v,nav,empty,open)}})(APPX[ax]);
APP.messages=function(v){nav(v,'Messages',['✎',function(){open(newMsg)}]);if(!TD.conv.length)return empty(v,'Aucune conversation.');
TD.conv.forEach(function(c){var l=c.m[c.m.length-1]||[],g=grpOf(c),x=l[4]||{},pv=x.call?'📞 Appel manqué':x.v?'🎤 Message vocal':x.p?'📷 Photo':x.del?'Message supprimé':String(l[2]||'');
var r=H('button','tcv'+(unreadConv(c)?' un':''),'<span class="mdot"></span><span class="tav">'+(g&&!who(c.t)?'👥':AV(c.t))+'</span><span class="tct"><span class="mh"><b>'+E(c.t)+'</b><time>'+E(l[3]||'')+'</time></span><span class="tcp">'+(l[1]=='Aden'?'Toi : ':g&&l[1]?E(l[1])+' : ':'')+E(pv.replace(/==|\*\*/g,'').slice(0,80))+'</span></span>');r.type='button';r.onclick=function(){open(function(v){thread(v,c)})};v.appendChild(r)})};
function thread(v,c){var g=grpOf(c),snd=[];c.m.forEach(function(i){if(i[1]!='Aden'&&snd.indexOf(i[1])<0)snd.push(i[1])});nav(v,c.t,['📞',function(){queue({k:'call',w:c.t},'Appel à '+c.t+' ajouté')}]).classList.add('tnc');
var bd=H('div','pbd tth');v.appendChild(bd);if(c.d)bd.appendChild(H('div','pdy',E(c.d)));var lm=-1,lh=-1;c.m.forEach(function(i,j){if(i[1]=='Aden')lm=j;else lh=j});
var it=smsItems(c.m,g,lm,lh),first=!c.read,cut=first?lm+1:it.length;if(cut<0)cut=0;
it.forEach(function(r,j){if(j<cut||!first){bd.appendChild(r.el);if(r.rc)bd.appendChild(r.rc)}});
OUT.forEach(function(o){if(o.k=='sms'&&same(o.w,c.t))bd.appendChild(pend(o))});
if(first&&cut<it.length){var ty=H('div','sm2 typ','<span class="tyd"><i></i><i></i><i></i></span>'),q=cut;function nx(){if(q>=it.length||!bd.isConnected){ty.remove();return}var r=it[q++];if(r.me||r.sys){bd.appendChild(r.el);if(r.rc)bd.appendChild(r.rc);setTimeout(nx,250)}else{bd.appendChild(ty);sc();setTimeout(function(){ty.remove();bd.appendChild(r.el);if(r.rc)bd.appendChild(r.rc);sc();nx()},Math.min(1100,420+r.len*9))}};setTimeout(nx,250)}
c.read=1;var cp=H('div','tcm','<input placeholder="Message à '+E(c.t).replace(/"/g,'&quot;')+'"><button type="button" aria-label="Envoyer">↑</button>'),inp=cp.firstChild;
function send(){var t=inp.value.trim();if(!t)return;var o={k:'sms',w:c.t,t:t};OUT.push(o);outUpd();bd.appendChild(pend(o));inp.value='';sc()}
cp.lastChild.onclick=send;inp.onkeydown=function(e){if(e.key=='Enter'){e.preventDefault();send()}};v.appendChild(cp);function sc(){SC2.scrollTop=SC2.scrollHeight}setTimeout(sc,30)}
function pend(o){var e=H('div','sm2 me pend',MD(o.t)+'<em>En attente · touche pour annuler</em>');o.el=e;e.onclick=function(){drop(o)};return e}
function newMsg(v){nav(v,'Nouveau message');var L=contacts();if(!L.length)return empty(v,'Aucun contact.');L.forEach(function(n){v.appendChild(crow(n,function(){var c=convOf(n);if(!c){c={t:n,m:[],read:1};TD.conv.unshift(c)}stack.pop();open(function(v){thread(v,c)})}))})}
function crow(n,fn){var w=who(n),tr=tierOf(n),r=H('button','tcr','<span class="tav">'+AV(n)+'</span><span class="tct"><b>'+E(n)+'</b><small>'+E(w?w[1]:'')+'</small></span>'+(tr?'<span class="bd" style="background:'+(PAL[tr]||'#444441')+'">'+E(tr)+'</span>':''));r.type='button';r.onclick=fn;return r}
APP.contacts=function(v){nav(v,'Contacts');var L=contacts();if(!L.length)return empty(v,'Aucun contact.');L.forEach(function(n){v.appendChild(crow(n,function(){open(function(v){card(v,n)})}))})};
function card(v,n){var w=who(n),g=gOf(n),tr=tierOf(n);nav(v,'Contacts');v.appendChild(H('div','tcd','<span class="tbig">'+AV(n)+'</span><b>'+E(n)+'</b><small>'+E(w?w[1]:'')+'</small>'+(tr?'<span class="bd" style="background:'+(PAL[tr]||'#444441')+'">'+E(tr)+(g!=null?' '+g:'')+'</span>':'')+'<small>'+E([w&&w[2],w&&w[3]].filter(Boolean).join(' · '))+'</small>'+(g!=null?bar('Relation',g):'')));
var a=H('div','tca');[['💬','Message',function(){var c=convOf(n);if(!c){c={t:n,m:[],read:1};TD.conv.unshift(c)}open(function(v){thread(v,c)})}],['📞','Appeler',function(){queue({k:'call',w:n},'Appel à '+n+' ajouté')}],['📹','Visio',function(){queue({k:'vid',w:n},'Visio avec '+n+' ajoutée')}],['✉️','Mail',function(){open(function(v){newMail(v,n)})}]].forEach(function(b){var e=H('button','','<span>'+b[0]+'</span><small>'+b[1]+'</small>');e.type='button';e.onclick=b[2];a.appendChild(e)});v.appendChild(a)}
APP.telephone=function(v){nav(v,'Téléphone');var C=calls();v.appendChild(H('div','tsh','Récents'));if(!C.length)v.appendChild(H('div','tem s','Aucun appel récent.'));C.forEach(function(c){var r=H('div','tcl'+(c.miss?' miss':''),'<span class="tav">'+AV(c.who)+'</span><span class="tct"><b>'+E(c.who)+(c.n>1?' ('+c.n+')':'')+'</b><small>'+(c.miss?'Appel manqué':'Appel')+'</small></span><time>'+E(c.t||'')+'</time>');var b=H('button','tcb','📞');b.type='button';b.onclick=function(){queue({k:'call',w:c.who},'Rappel de '+c.who+' ajouté')};r.appendChild(b);v.appendChild(r)});
v.appendChild(H('div','tsh','Contacts'));contacts().forEach(function(n){var r=crow(n,function(){queue({k:'call',w:n},'Appel à '+n+' ajouté')});r.insertAdjacentHTML('beforeend','<span class="tcb">📞</span>');v.appendChild(r)})};
APP.mail=function(v){nav(v,'Mail',['✎',function(){open(function(v){newMail(v,'')})}]);if(!TD.mail.length)return empty(v,'Boîte de réception vide.');var o={m:TD.mail,el:H('div','mb')};v.appendChild(o.el);buildBox(o);TD.mail.forEach(function(i){i.rd=1})};
function newMail(v,to){nav(v,'Nouveau mail');var f=H('div','tnm','<label>À <input value="'+E(to).replace(/"/g,'&quot;')+'" placeholder="Nom"></label><label>Objet <input placeholder="Objet"></label><textarea placeholder="Ton message"></textarea><button type="button" class="lb">Ajouter à l\'envoi</button><div class="er"></div>'),I=f.querySelectorAll('input'),A=f.querySelector('textarea'),er=f.querySelector('.er');
f.querySelector('.lb').onclick=function(){if(!I[0].value.trim()||!A.value.trim()){er.textContent='Indique un destinataire et un message.';return}queue({k:'mail',w:I[0].value.trim(),o:I[1].value.trim(),t:A.value.trim()},'Mail ajouté');back()};v.appendChild(f)}
APP.agenda=function(v){nav(v,'Agenda');agList(v,TD.ag)};
APP.photos=function(v){nav(v,'Photos');if(!TD.ph.length)return empty(v,'Aucune photo.');var g=H('div','tpg');TD.ph.forEach(function(p,j){var bg=pbg(p[0]||j),b=H('button','tpt','<span>'+E(p[1]||'📸')+'</span>'+(p[0]?'<small>'+E(p[0])+'</small>':''));b.type='button';b.style.setProperty('--pg',bg);b.style.animationDelay=(j*40)+'ms';b.onclick=function(){open(function(v){nav(v,'Photos').classList.add('tnd');v.classList.add('tpf');v.appendChild(H('div','tpfi','<div class="tpfp" style="background:'+bg+'"><span>'+E(p[1]||'📸')+'</span></div><b>'+E(p[0]||'')+'</b>'+(p[2]?'<small>'+E(p[2])+'</small>':'')+'<div class="tpfa"><span>♡</span><span>↗</span><span>🗑</span></div>'))})};g.appendChild(b)});v.appendChild(g)};
APP.banque=function(v){nav(v,'Banque');if(!TD.bank.length)return empty(v,'Pas de relevé ce mois-ci.');TD.bank.forEach(function(i){v.appendChild(ORIG.BANK(i))})};
APP.reseaux=function(v){nav(v,'Réseaux');if(!TD.fol.length&&!TD.soc.length)return empty(v,'Rien de neuf sur tes réseaux.');TD.fol.forEach(function(i){v.appendChild(ORIG.FOL(i))});TD.soc.forEach(function(i){v.appendChild(ORIG['#'](i))})};
APP.actus=function(v){nav(v,'Actus');if(!TD.news.length)return empty(v,'Pas d\'actualité.');TD.news.forEach(function(i){v.appendChild(ORIG[i[0]](i))})};
APP.notes=function(v){nav(v,'Notes');if(!TD.no.length)return empty(v,'Aucune note.');TD.no.forEach(function(i){var r=H('button','tcr','<span class="tav" style="background:#C9A400">📝</span><span class="tct"><b>'+E(i[1]||'Note')+'</b><small>'+E(String(i[2]||'').replace(/==|\*\*/g,'').slice(0,70))+'</small></span>');r.type='button';r.onclick=function(){open(function(v){nav(v,'Notes');v.appendChild(H('div','nte','<b>'+E(i[1]||'Note')+'</b>'+(i[3]?'<small>'+E(i[3])+'</small>':'')+'<div>'+PARA(i[2])+'</div>'))})};v.appendChild(r)})};
XS.push({any:function(){return OUT.length>0},msg:function(){return OUT.map(function(o){return o.k=='sms'?'> SMS à '+o.w+' : « '+o.t+' »':o.k=='call'?'> Appeler '+o.w:o.k=='vid'?'> Appel vidéo avec '+o.w:'> Mail à '+o.w+(o.o?' (« '+o.o+' »)':'')+' : « '+o.t+' »'})}});
show(TD.lock?lock:home,'up');if(D.tel&&typeof D.tel=='string'&&APP[NZ(D.tel)]){stack=[APP[NZ(D.tel)]];if(TD.lock)T.dataset.ul=1;show(APP[NZ(D.tel)],'fw')}}
