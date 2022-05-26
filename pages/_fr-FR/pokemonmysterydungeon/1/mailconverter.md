---
title: Convertisseur de Lettres S.O.S./O.K./Remerciement (PDM1)
description: Convertisseur de Lettres S.O.S./O.K./Remerciement (PDM1)
---
# Pokémon Donjon Mystère : Équipe de Secours Rouge et Bleue
## Convertisseur de Lettres S.O.S./O.K./Remerciement (PDM1)
Utilisez cet outil pour générer :
- une Lettre O.K. à partir d'une Lettre S.O.S. ;
- une Lettre Remerciement à partir d'une Lettre S.O.S.
- une Lettre Remerciement à partir d'une Lettre O.K.

Concernant les caractères spéciaux :
- Pour le symbole masculin `♂`, utilisez à la place `#`
- Pour le symbole féminin `♀`, utilisez à la place `%`
- Pour les points de suspension `…`, utilisez à la place `.`

Source : [http://www.upokecenter.com/games/dungeon/guides/sosmail.php](https://web.archive.org/web/20150118004601/http://www.upokecenter.com/games/dungeon/guides/sosmail.php)

<script src="/assets/js/tools/PMD1/items-fr.js">
</script>
<script src="/assets/js/tools/PMD1/pokemon-fr.js">
</script>
<script type="text/javascript">
    let PasswordTooShort="Le mot de passe est incorrect car il contient moins de cinquente-quatre caractères. Ressaisissez-le tel qu'il apparaît dans le jeu puis réessayez."
    let NoPassword="Aucun mot de passe n'a été entré."
    let InvalidPasswordLong="Le mot de passe est incorrect. Ressaisissez-le puis réessayez."
    let NotSOSMail="Le mot de passe saisi n'est pas celui d'une Lettre S.O.S."
    let NotAOKMail="Le mot de passe saisi n'est pas celui d'une Lettre O.K."
    let SOSMailEnteredInAOK="Le mot de passe saisi semble être celui d'une Lettre S.O.S. et non d'une Lettre O.K.  Voulez-vous générer une Lettre O.K. à partir de ce mot de passe ? Si oui, sélectionnez OK."
    let AOKMailEnteredInSOS="Le mot de passe saisi semble être celui d'une Lettre O.K. et non d'une Lettre S.O.S.  Voulez-vous générer une Lettre Remeciement à partir de ce mot de passe ? Si oui, sélectionnez OK."
    let BasementFloor="E. -XX"
    let AboveGroundFloor="E. XX"
    let InvalidPassword="Le mot de passe est incorrect."
    let DifficultyLine="Difficulté :"
    let IDLine="ID :"
    let PlaceLine="Lieu :"
    let ClientLine="Client :"
    let RescueChancesLine="Possibilités de sauvetage restantes :"
</script>
<script src="/assets/js/tools/PMD1/sosmail.js">
</script>
<script src="/assets/js/tools/PMD1/diff.js">
</script>
<script type="text/javascript">
    //<![CDATA[
    
    let AboveGround=[
    0,0,1,1,0,1,1,1,0,1,1,1,1,1,1,0,0,1,1,0,0,0,
    1,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,1,0
    ]
    function IsAboveGround(d){
     if(d>=AboveGround.length)return 1
     return AboveGround[d]
    }
    function showitems(name){
     document.write("<select id=\""+name+"\">");
     for(let i=0;i<items.length;i++){
      document.write("<option value=\"\">"+items[i]+" ["+i.toString(16)+"]</option>");  
     } 
     document.write("</select>");
    }
    
    function showpokemon(name){
     document.write("<select id=\""+name+"\">");
     for(let i=0;i<pokemon.length;i++){
      document.write("<option value=\"\">"+pokemon[i]+"</option>");  
     } 
     document.write("</select>");
    }
    
    
    let debug=0
    
    function entrytopass(x){
     x=x.replace(/[\n\s\r\'\"]/g,"")
             .replace(/[\u2642]/g,"#")
             .replace(/[\u2640]/g,"%")
             .replace(/[\{\(\[]m([a\u00e2]le?)?[\)\]\}]/gi,"#")
             .replace(/[\{\(\[]f(em(ale|elle)?)?[\)\]\}]/gi,"%")
             .replace(/[\{\(\[]w(eib(l(ich)?)?)?[\)\]\}]/gi,"%")
             .replace(/[\{\(\[]m(acho)?[\)\]\}]/gi,"#")
             .replace(/[\{\(\[]h(em(bra)?)?[\)\]\}]/gi,"%")
             .replace(/[\{\(\[]m[a\u00e4\u00c4]nn(l(ich)?)?[\)\]\}]/gi,"#")
             .replace(/[\{\(\[]\.\.?\.?[\)\]\}]/g,".")
             .replace(/[\{\(\[][\u2026][\)\]\}]/g,".")
             .replace(/[\u2026]/g,".")
             .toUpperCase()
     testx=x.replace(/\.\.\./g,".")
     if(testx.length==54)
      x=testx
     return x
    }
    
    function formatpass(x){
     x=entrytopass(x)
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
    
    let baditems="EDEEEFB1E924D8D2B0DC323334C2ECF0"
    
    function option(x){
     return parseInt(x.value)
    }
    
    function isbaditem(x){
     if(x>=0xF0)return 0
     for(let i=0;i<baditems.length/2;i++){
      if(x==c2c(baditems,i))
       return 1
     }
     return 0
    }
    
    function showrewards(name){
     document.write("<select id=\""+name+"\">");
     for(let i=0;i<items.length;i++){
      if(!isbaditem(i)){
       document.write("<option value=\""+i+"\">"+items[i]
    //      +" ["+i.toString(16)+"]"
          +"</option>");  
      }
     } 
     document.write("</select>");
    }
    
    function decodemission(pass){
     let diffstring="EDCBAS*"
     let client=pass[12]|(pass[13]<<8)
     let clientname=""
     for(let i=0;i<10;i++){
      if(pass[20+i]==0)break
      clientname+=String.fromCharCode(pass[20+i])
     }
     let clientstr=ClientLine+" "+clientname+" ("+pokemon[client]+")"
     let placestr=PlaceLine+" "+dungeons[pass[4]]+" "
     if(IsAboveGround(pass[4]))
      placestr+=AboveGroundFloor.replace("XX",pass[5])
     else
      placestr+=BasementFloor.replace("XX",pass[5])
     let id=pass[16]|(pass[17]<<8)
     let idstr=IDLine+" "+(id%10000)+"\r\n"
              +RescueChancesLine+" "+pass[44]+"\r\n"
              +DifficultyLine+" "+diffstring.charAt(GetDifficulty(0,pass[4],pass[5]))
     return clientstr+"\r\n"+placestr+"\r\n"+idstr+"\r\n"
    }
    
    function genmailex(mail,flags,mailtype){
     let pass=[]
     let x=entrytopass(mail)
     if(x.length==0){
      alert(NoPassword)
      return 0
     } if(x.length<54){
      alert(PasswordTooShort)
      return 0
     }
     if(!convertpass(x,pass)){
      alert(InvalidPasswordLong)
      return 0
     } else if(pass[0]!=mailtype) {
      if(mailtype==1){
       if(pass[0]==4){
        if(confirm(AOKMailEnteredInSOS)){
         flags=2;
         document.getElementById("aok.value")=formatpass(x);
        } else {
         return 0;
        }
       } else {
        alert(NotSOSMail)
        return 0
       }
      }else if(mailtype==4){
       if(pass[0]==1){
        if(confirm(SOSMailEnteredInAOK)){
         flags=1;
         document.getElementById("sos.value")=formatpass(x);
        } else {
         return 0;
        }
       } else {
        alert(NotAOKMail)
        return 0
       }
      }
     }
     document.getElementById("mission.value")=decodemission(pass)
     if(flags&1){
      pass[0]=4//A-OK mail ID
      pass[40]=pass[36]
      pass[41]=pass[37]
      pass[42]=pass[38]
      pass[43]=pass[39]
      pass[44]=pass[44]-1//rescue chances left
      //works even if line below is commented out
      document.getElementById("aok.value")=formatpass(datatopass(pass))
     }
     if(flags&2){
      let itemidx=option(document.getElementById("item"))
      pass[0]=5//Thank-You mail ID
      if(itemidx){
       pass[33]=1
       pass[34]=itemidx&0xFF
       pass[35]=(itemidx>>8)&0xFF
      }
      document.getElementById("ty.value")=formatpass(datatopass(pass))
     }
     return 1
    }
    
    function genaok(){
     if(genmailex(document.getElementById("sos.value"),1,1)){
      document.getElementById("sos.value")=formatpass(document.getElementById("sos.value"))
     }
    }
    
    function genaokty(){
     if(genmailex(document.getElementById("sos.value"),3,1)){
      document.getElementById("sos.value")=formatpass(document.getElementById("sos.value"))
     }
    }
    
    function genty(){
     if(genmailex(document.getElementById("aok.value"),2,4)){
      document.getElementById("aok.value")=formatpass(document.getElementById("aok.value"))
     }
    }
    
    function decsos(){
     let x=entrytopass(document.getElementById("sos.value"))
     let pass=[]
     if(!convertpass(x,pass)){
      alert(InvalidPassword)
     } else {
      x=datatopass(pass)
      document.getElementById("sos.value")=formatpass(x)
      if(debug){
       document.getElementById("data.value")=tostr(pass)
      }
     }
    }
    
    function encsos(){
     let pass=document.getElementById("data.value.split")(",")
     for(let i=0;i<pass.length;i++){
      pass[i]=parseInt(pass[i],16)
     }
     x=datatopass(pass)
     document.getElementById("sos.value")=formatpass(x)
     if(debug){
      document.getElementById("data.value")=tostr(pass)
     }
    }
    //]]>
</script>

<p>Mot de passe de la Lettre S.O.S. :
    <br>
    <textarea id="sos" cols="60" rows="5">
    </textarea>
    <br>
    <script type="text/javascript">
        <!--
        if(debug){
            document.write(&#039;<input type="button" value="Décoder la Lettre S.O.S." onclick="decsos()"/><br>&#039;)
            document.write(&#039;<textarea id="data" cols="60" rows="5"></textarea><br>&#039;)
            document.write(&#039;<input type="button" value="Encoder la Lettre S.O.S." onclick="encsos()"/><br>&#039;)
        }
        //-->
    </script>
    <input type="button" value="Générer la Lettre O.K." onclick="genaok()" />
    <br>
    <input type="button" value="Générer la Lettre O.K. et Remerciement" onclick="genaokty()" />
    <br>
    <br>
    Mot de passe de la Lettre O.K. :
    <br>
    <textarea id="aok" cols="60" rows="5">
    </textarea>
    <br>
    <br>
    Objet joint à la Lettre Remerciement (optionnel) :
    <br>
    <script type="text/javascript">
        showrewards("items")
    </script>
    <br>
    <br>
    <input type="button" value="Générer la Lettre Remerciement" onclick="genty()" />
    <br>
    <br>
    Mot de passe de la Lettre Remerciement :
    <br>
    <textarea id="ty" cols="60" rows="5">
    </textarea>
    <br>
    <br>
    Données de la mission de sauvetage :
    <br>
    <textarea id="mission" cols="60" rows="6">
    </textarea>
</p>
