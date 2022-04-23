---
title: Générateur de Lettres S.O.S. (PDM1)
description: Générateur de Lettres S.O.S. (PDM1)
permalink: /pokemonmysterydungeon/1/sosmail
---
# Pokémon Donjon Mystère : Équipe de Secours Rouge et Bleue
## Générateur de Lettres S.O.S.
Utilisez cet outil pour générer une Lettre S.O.S. Dès que vous aurez réussi la mission, entrez le mot de passe de la Lettre O.K. que vous recevrez 
dans le [convertisseur de Lettres](aokmail) pour obtenir le mot de passe de la Lettre Remerciement.

Concernant les caractères spéciaux :
- Pour le symbole masculin « ♂ », utilisez à la place « # » ;
- Pour le symbole féminin « ♀ », utilisez à la place « % » ;
- Pour les points de suspension « … », utilisez à la place « . ».

Source : [http://www.upokecenter.com/games/dungeon/guides/sosgen.php](https://web.archive.org/web/20150203043525/http://www.upokecenter.com/games/dungeon/guides/sosgen.php)<br><br>

<script src="/assets/js/tools/PMD1/objets-fr.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/pokemon-fr.js" type="text/javascript">
</script>
<script type="text/javascript">
  let ChoosePokemon="Choisissez un Pokémon."
  let SpecialChars="Évitez d'utiliser des caractères spéciaux dans le nom."
</script>
<script src="/assets/js/tools/PMD1/lettresos.js" type="text/javascript">
</script>
<script type="text/javascript">
  //<![CDATA[

let debug=0


function formatpass(x){
 x=x.replace(/[\n\s\r]/g,"").toUpperCase()
 return x.substr(0,5)+" "
       +x.substr(5,8)+" "
       +x.substr(13,5)+"\r\n"
       +x.substr(18,5)+" "
       +x.substr(23,8)+" "
       +x.substr(31,5)+"\r\n"
       +x.substr(36,5)+" "
       +x.substr(41,8)+" "
       +x.substr(49,5)+"\r\n"
}

let baddungeons="18191E2731323336373D3F"
let badpokemon=
"C90078017C01230125010E0051005200"+
"33015E009100920090009C010D010C01"+
"0E0113019600990198019D0112011401"+
"95019601970197009B019A019E01A401"+
"A501A601"

let floors=
"04060A0E0A0B040D0F0D040A06100618"+
"041A0A2964150564150C64641A1A0D15"+
"331F1F1F151F100D141F0B1015151F05"+
"050B033346101F14140C644C29646402"

onload=function(){
 showfloors() 
}

function isbaditem(x){
 if(x>=0xF0)return 0
 for(let i=0;i<baditems.length/2;i++){
  if(x==c2c(baditems,i))
   return 1
 }
 return 0
}

function isbaddungeon(x){
 if(x>0x3F)return 1
 for(let i=0;i<baddungeons.length/2;i++){
  if(x==c2c(baddungeons,i))
   return 1
 }
 return 0
}

function getspecies(id){
 if(id==0x179||id==0x17A||id==0x17B)
  return 0x178
 if((id>=0xca&&id<=0xe2)||id==0x19F||id==0x1A0)
  return 201
 if(id==0x1A1||id==0x1A2||id==0x1A3)
  return 0x19E
 if(id==0x1A7)
  return 0x19C
 return id
}


function isbadpokemon(x){
 if(getspecies(x)!=x)
  return 1
 for(let i=0;i<badpokemon.length/2;i++){
  if(x==c2w(badpokemon,i))
   return 1
 }
 return 0
}


function option(x){
 return parseInt(x.value)
}

function showfloors(){
 let dungeon=option(document.getElementById("dungeon"))
 let numfloors=(dungeon>0x3F)?1:c2c(floors,dungeon);
 let startfloor=(dungeon>0x3F)?0:1;
 document.getElementById("floor").options.length=0
 for(let i=startfloor;i<numfloors;i++){
  document.getElementById("floor").options[i-startfloor]=new Option(i+"",i+"")
 }
}

function showdungeon(name){
 document.write("<select id=\""+name+"\" onchange=\"showfloors()\">");
 for(let i=0;i<dungeons.length;i++){
  if(!isbaddungeon(i)){
   document.write("<option value=\""+i+"\">"+dungeons[i]+"</option>");  
  }
 } 
 document.write("</select>");
}



function genpass(){
 let pass=[]
 for(let i=0;i<56;i++){
  pass[i]=0
 }
 pass[0]=1
 pass[1]=0
 pass[2]=0
 pass[4]=option(document.getElementById("dungeon"))
 pass[5]=option(document.getElementById("floor"))
 pass[8]=Math.floor(Math.random()*256)
 pass[9]=Math.floor(Math.random()*256)
 pass[10]=Math.floor(Math.random()*256)
 let poke=option(document.getElementById("poke"))
 if(poke==0){
  alert(ChoosePokemon)
  return 0
 }
 pass[12]=poke&0xFF
 pass[13]=(poke>>8)&0xFF
 let mailid=parseInt(document.getElementById("mailid").value)
 if(document.getElementById("mailid").value==""||isNaN(mailid)){
  pass[16]=Math.floor(Math.random()*256)
  pass[17]=Math.floor(Math.random()*256)
 } else {
  pass[16]=mailid&0xFF;
  pass[17]=(mailid>>8)&0xFF
 }
 pass[18]=Math.floor(Math.random()*256)
 pass[19]=Math.floor(Math.random()*256)
 let pokename=document.getElementById("pokename").value
 if(!pokename){
  pokename=pokemon[poke]
 }
 for(let i=0;i<10;i++){
  let c=pokename.charCodeAt(i)
  if(c<0x20||(c>=0x80&&c<=0x9F)||c>0xFF){
   alert(SpecialChars)
   return 0
  }
  pass[20+i]=c
 }
 let chances=parseInt(document.getElementById("chances").value)
 if(document.getElementById("chances").value==""||isNaN(chances)){
  pass[44]=10
 } else {
  pass[44]=chances
 }
 pass[45]=0
 pass[36]=Math.floor(Math.random()*256)
 pass[37]=Math.floor(Math.random()*256)
 pass[38]=Math.floor(Math.random()*256)
 pass[39]=Math.floor(Math.random()*256)
 let sos=datatopass(pass)
 document.getElementById("sos").value=formatpass(sos)
 if(debug){
  document.getElementById("data").value=tostr(pass)
 }
}


function showpkmn(name){
 document.write("<select id=\""+name+"\">");
 for(let i=0;i<pokemon.length;i++){
  if(i==0||1/*||!isbadpokemon(i)*/){
   document.write("<option value=\""+i+"\">"+pokemon[i]+"</option>");  
  }
 } 
 document.write("</select>");
}

function decsos(){
 let x=document.getElementById("sos").value.replace(/[\n\s\r]/g,"").toUpperCase()
 let pass=[]
 if(!convertpass(x,pass)){
  alert("The password is invalid.")
 } else {
  x=datatopass(pass)
  document.getElementById("sos").value=formatpass(x)
  if(debug){
   document.getElementById("data").value=tostr(pass)
  }
 }
}


function encsos(){
 let pass=document.getElementById("data").value.split(",")
 for(let i=0;i<pass.length;i++){
  pass[i]=parseInt(pass[i],16)
 }
 x=datatopass(pass)
 document.getElementById("sos").value=formatpass(x)
 if(debug){
  document.getElementById("data").value=tostr(pass)
 }
}

//]]></script>

<p>Pokémon à secourir :
  <br>
  <script type="text/javascript">
    showpkmn("poke");
  </script>
  <br>
  <br>
  Nom du Pokémon (dix lettres maximum) :
  <br>
  <input type="text" id="pokename" maxlength="10" size="10" />
  <br>
  <br>
  Donjon :
  <br>
  <script type="text/javascript">
    showdungeon("dungeon");
  </script>
  <br>
  <br>
  Étage :
  <br>
  <select id="floor">
    <option value="">
    </option>
  </select>
  <br>
  <br>
  ID de la Lettre (optionnel) :
  <br>
  <input type="text" id="mailid" maxlength="4" size="4" />
  <br>
  <br>
  Possibilités de sauvetages restantes :
  <br>
  <input type="text" id="chances" value="10" maxlength="2" size="2" />
  <br>
  <br>
  <input type="button" value="Générer la Lettre S.O.S." onclick="genpass()" />
  <br>
  <br>
  Mot de passe de la Lettre S.O.S. :
  <br>
  <textarea id="sos" cols="30" rows="5">
  </textarea>
  <br>
  <script type="text/javascript">
    if(debug){
      document.write('<input type="button" value="Décoder la Lettre S.O.S." onclick="decsos()"/>')
      <br>
      document.write('<textarea id="data" cols="30" rows="5"></textarea>')
      <br>
      document.write('<input type="button" value="Encoder la Lettre S.O.S." onclick="encsos()"/>')
      <br>
    }
  </script>
<p>
