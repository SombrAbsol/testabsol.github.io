---
title: Wonder Mail Generator (PMD1)
description: Wonder Mail Generator (PMD1)
---
# Pokémon Mystery Dungeon: Red and Blue Rescue Team
## Wonder Mail Generator
Use this tool to generate a Wonder Mail.

Regarding special characters:
- For the male symbol `♂`, use instead `#`
- For the feminine symbol `♀`, use instead `%`
- For the ellipsis `…`, use instead `.`

It is quite normal that when you tell the generator that you want a Friend Area as a reward, it will be displayed as a Passmuraille when decoding the Wonder Mail.<br><br>
Source: [http://www.upokecenter.com/games/dungeon/guides/wondermail.php](https://web.archive.org/web/20141224065334/http://www.upokecenter.com/games/dungeon/guides/wondermail.php)<br><br>

<script src="/assets/js/tools/PMD1/items-en.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/areas-en.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/pokemon-en.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/flavor-en.js" type="text/javascript">
</script>
<script type="text/javascript">
  let FriendRescue="Friend Rescue"
  let RescueType0="Help me."
  let RescueType1="Find XXPKMN."
  let RescueType2="Escort to XXPKMN."
  let RescueType3="Find XXITEM!"
  let RescueType4="Deliver XXITEM!"
  let BasementFloor="BXXF"
  let AboveGroundFloor="XXF"
  let SpecialMission="Special mission"
  let ChooseClient="Please choose a client."
  let ChooseTarget="Please choose a Pokémon to save/find."
  let ChooseItem="Please choose an item to find or deliver."
  let ItemNotFound="The XX can't be found in the YY dungeon."
  let FriendAreaError="To receive a Friend Area reward, the mission must have at least D difficulty."
  let InvalidPassword="The password is invalid."
  let FriendAreaReward="Friend Area [XX]."
  let NearPlace="Near XX"
  let DifficultyLine="Difficulty:"
  let PlusReward="XX + ?"
  let PlusRewardBrackets="XX + ? [YY]"
  let RewardLine="Reward:"
  let PlaceLine="Place:"
  let ClientLine="Client:"
  let ObjectiveLine="Objective:"
  let WonderMailLine="Wonder Mail:"
</script>
<script src="/assets/js/tools/PMD1/sosmail.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/dungitems.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/ftext.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/diff.js" type="text/javascript">
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


        function entrytopass(x){
         x=x.replace(/[\n\s\r\'\"]/g,"")
                 .replace(/[\u2642]/g,"#")
                 .replace(/[\u2640]/g,"%")
                 .replace(/[\{\(\[]m(ale?)?[\)\]\}]/gi,"#")
                 .replace(/[\{\(\[]f(em(ale)?)?[\)\]\}]/gi,"%")
                 .replace(/[\{\(\[]\.\.?\.?[\)\]\}]/g,".")
                 .replace(/[\{\(\[][\u2026][\)\]\}]/g,".")
                 .replace(/[\u2026]/g,".")
                 .toUpperCase()
         return x
        }


        function formatpass(x){
         x=entrytopass(x)
         return x.substr(0,4)+" "
               +x.substr(4,4)+" "
               +x.substr(8,4)+"\r\n"
               +x.substr(12,4)+" "
               +x.substr(16,4)+" "
               +x.substr(20,4)+"\r\n"
        }

        let debug=0
        let baditems="EDEEEFB1E924D8D2B0DC323334C2EC"
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
         showfind2()
         showftext(1)
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

        function flavors(){
         document.write("<xmp><dl>\r\n")
         for(let i=0;i<ParentChild.length;i++){
          document.write("<dt><b>"+pokemon[ParentChild[i][0]]+", "+pokemon[ParentChild[i][1]]+"</b></dt>\r\n")
          document.write("<dd>"+ParentChild[i][2]+"</dd>\r\n")
         }
         document.write("</dl><dl>\r\n")
         for(let i=0;i<Pairs.length;i++){
          document.write("<dt><b>"+pokemon[Pairs[i][0]]+", "+pokemon[Pairs[i][1]]+":</b> \""+Pairs[i][2]+"\"</dt>\r\n")
          document.write("<dd>"+Pairs[i][3]+"</dd>\r\n")
         }
         document.write("</dl>\r\n")
         document.write("<ul>\r\n")
         for(let i=0;i<Lovers.length;i+=2){
          document.write("<li>"+pokemon[Lovers[i]]+", "+pokemon[Lovers[i+1]]+"</li>\r\n")
         }
         document.write("</ul>\r\n")
         document.write("</xmp>")
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


        function optionarray(x){
         if(x.selectedIndex<0){
          return []
         } else {
          let v=x[x.selectedIndex].value.split(",")
          for(let i=0;i<v.length;i++){
           v[i]=parseInt(v[i])
          }
          return v
         }
        }

        function showfloors(){
         let dungeon=option(document.getElementById("dungeon"))
         let numfloors=c2c(floors,dungeon);
         document.getElementById("floor").options.length=0
         for(let i=1;i<numfloors;i++){
          document.getElementById("floor").options[i-1]=new Option(i+"",i+"")
         }
        }

        function showdungeon(name){
         document.write("<select id=\""+name+"\" onchange=\"showfloors();updateform();\">");
         for(let i=0;i<dungeons.length;i++){
          if(!isbaddungeon(i)){
           document.write("<option value=\""+i+"\">"+dungeons[i]+"</option>");  
          }
         } 
         document.write("</select>");
        }

        function pkmnsort(a,b){
         if(a[1]==b[1])return 0
         return (a[1]<b[1])?-1:1
        }

        function showpkmn(name){
         document.write("<select id=\""+name+"\" onchange=\"showftext();\">");
         let poke=[]
         for(let i=0;i<pokemon.length;i++){
          if(i==0||!isbadpokemon(i)){
           poke[poke.length]=[i,pokemon[i]]
          }
         }
         poke=poke.sort(pkmnsort)
         for(let i=0;i<poke.length;i++){
          document.write("<option value=\""+poke[i][0]+"\">"+poke[i][1]+"</option>");  
         } 
         document.write("</select>");
        }


        function showareas(name){
         document.write("<select id=\""+name+"\">");
         document.write("<option value=\"-1\">\-\-\-\-\-\-</a>");
         for(let i=0;i<friendareas.length;i++){
          if(i==10||i==14||i==35||i==36){
           document.write("<option value=\""+i+"\">"+friendareas[i]+"</option>");  
          }
         } 
         document.write("</select>");
        }

        function showfind2(){
         let dungeon=option(document.getElementById("dungeon"))
         document.getElementById("item").options.length=0
         let len=0
         for(let i=0;i<items.length;i++){
          if(!isbaditem(i)&&i!=0x69&&i!=0x7c&&(i==0||i>=9)){
           if(document.getElementById("type").selectedIndex!=3||ItemInDungeon(i,dungeon)){
            document.getElementById("item").options[len++]=new Option(items[i],i+"")
           }
          }
         }
        }

        function updateform(){
         showfind2()
         showftext(0)
        }

        function updateform2(){
         showfind2()
         showftext(1)
        }


        function showftext(typechanged){
         let mtype=document.getElementById("type").selectedIndex
         let poke1=option(document.getElementById("client"))
         let poke2=option(document.getElementById("poke"))
         let item=items[option(document.getElementById("item"))]
         let fthead=FindFlavorTextHead(mtype,poke1,poke2)
         let oldsel=document.getElementById("mhead").selectedIndex
         document.getElementById("mhead").options.length=0
         let len=0
         for(let i=0;i<fthead.length;i++){
          let optstr=fthead[i][0]+","+fthead[i][1]+","+fthead[i][2]
          let ftext=fthead[i][3]
          if(mtype==3||mtype==4){
           ftext=ftext.replace(/\%s/g,item)
          } else {
           ftext=ftext.replace(/\%s/g,pokemon[poke2])   
          }
          ftext=ftext.replace(/\&\#x2642\;/g,"\u2642")
          ftext=ftext.replace(/\&\#x2640\;/g,"\u2640")
          document.getElementById("mhead").options[len++]=new Option(ftext,optstr)
         }
         if(oldsel>=0&&typechanged){
          document.getElementById("mhead").selectedIndex=oldsel
         }
         updateftext()
        }

        function updateftext(){
         let mtype=document.getElementById("type").selectedIndex
         let poke1=option(document.getElementById("client"))
         let poke2=option(document.getElementById("poke"))
         let dungeon=option(document.getElementById("dungeon"))
         let floor=option(document.getElementById("floor"))
         let item=items[option(document.getElementById("item"))]
         let headinfo=document.getElementById("mhead").options[document.getElementById("mhead").selectedIndex].value
         let oldsel,newsel=0
         headinfo=headinfo.split(",")
         let fthead=FindFlavorTextLines(
          headinfo[0],headinfo[1],headinfo[2],
          dungeon,floor)
         oldsel=optionarray(document.getElementById("mline1"))
         document.getElementById("mline1").options.length=0
         let len=0
         for(let i=0;i<fthead.length;i++){
          let optstr=fthead[i][0]+","+fthead[i][1]+","+fthead[i][2]
          let ftext=fthead[i][3]
          if(mtype==3||mtype==4){
           ftext=ftext.replace(/\%s/g,item)
          } else {
           ftext=ftext.replace(/\%s/g,pokemon[poke2])   
          }
          if(oldsel.length>0){
           if(oldsel[0]==fthead[i][0]
             &&oldsel[1]==fthead[i][1]){
            newsel=len
           }
          }
          ftext=ftext.replace(/\&\#x2642\;/g,"\u2642")
          ftext=ftext.replace(/\&\#x2640\;/g,"\u2640")
          ftext=ftext.replace(/<!\-\-break\-\->/g,"") 
          document.getElementById("mline1").options[len++]=new Option(ftext,optstr)
         }
         if(oldsel.length>0)
          document.getElementById("mline1").selectedIndex=newsel
        }


        function showrewards(name){
         document.write("<select id=\""+name+"\">");
         for(let i=0;i<items.length;i++){
          if(!isbaditem(i)){
           document.write("<option value=\""+i+"\">"+items[i]+"</option>");  
          }
         } 
         document.write("</select>");
        }

        function setpass(pass){
         let headinfo=optionarray(document.getElementById("mhead"))
         let line1=optionarray(document.getElementById("mline1"))
         PassSetFlavorText(pass,headinfo[0],headinfo[1],headinfo[2],
           line1[2]);
        }

        function genwonder(){
         let pass=[]
         for(let i=0;i<20;i++){
          pass[i]=0
         }
         pass[0]=5
         pass[1]=document.getElementById("type").selectedIndex
         pass[4]=option(document.getElementById("dungeon"))
         pass[5]=option(document.getElementById("floor"))
         pass[2]=0
         pass[8]=0xFF
         pass[9]=0xFF
         pass[10]=0xFF
         setpass(pass)
         let poke=option(document.getElementById("client"))
         if(poke==0){
          alert(ChooseClient)
          return 0
         }
         pass[12]=poke&0xFF
         pass[13]=(poke>>8)&0xFF
         if(pass[1]==1||pass[1]==2){
          let poke=option(document.getElementById("poke"))
          if(poke==0){
           alert(ChooseTarget)
           return 0
          }
          pass[14]=poke&0xFF
          pass[15]=(poke>>8)&0xFF
         } else {
          pass[14]=pass[12]
          pass[15]=pass[13]
         }
         if(pass[1]==3||pass[1]==4){
          pass[16]=option(document.getElementById("item"))
          if(pass[16]==0){
           alert(ChooseItem)
           return 0
          } else if(pass[1]==3&&!ItemInDungeon(pass[16],pass[4])){
           alert(ItemNotFound.replace("XX",items[pass[16]]).replace("YY",dungeons[pass[4]]))
           return 0
          }
         } else {
          pass[16]=9
         }
         if(document.getElementById("area").selectedIndex){
          if(GetDifficulty(pass[1],pass[4],pass[5])==0){
           alert(FriendAreaError)
           return
          }
          pass[17]=9
          pass[18]=9
          pass[19]=option(document.getElementById("area"))
         } else 
         if(document.getElementById("reward").selectedIndex){
        //  pass[17]=(document.getElementById("money").checked)?1:3
          pass[17]=(document.getElementById("money").checked)?6:8
          pass[18]=option(document.getElementById("reward"))
         } else {
          pass[17]=5
          pass[18]=9
         }
         let wonder=datatowonderpass(pass)
         document.getElementById("wonder").value=formatpass(wonder)
         if(debug){
          document.getElementById("data").value=tostr(pass)
         } else {
          document.getElementById("data").value=maildata(pass)
         }
        }


        function maildata(pass){
         let ftext=FlavorText(pass)
         let h=FlavorTextHead(pass,ftext)
         let b=FlavorTextBody(pass,ftext)
         b=b.split("<!--break-->")
         let diffstring="EDCBAS*"
         let data=h+"\r\n  "+b[0].replace(/\s+$/,"")
         if(b.length>1){
          data+="\r\n  "+b[1].replace(/\s+$/,"")
         }
         data+="\r\n"
         let poke1=pass[12]|(pass[13]<<8)
         let poke2=pass[14]|(pass[15]<<8)
         let item=items[pass[16]]
         data+=ClientLine+" "+pokemon[poke1]+"\r\n"
         data+=ObjectiveLine+" "
         switch(ftext[2]){
          case 0:data+=FriendRescue+"\r\n";break
          case 1:data+=RescueType3.replace("XXITEM",item)+"\r\n";break//Find X
          case 2:data+=RescueType4.replace("XXITEM",item)+"\r\n";break//Deliver X
          case 3:data+=RescueType0+"\r\n";break//Help me
          case 4:data+=RescueType1.replace("XXPKMN",pokemon[poke2])+"\r\n";break//Find Pokemon
          case 5:data+=RescueType2.replace("XXPKMN",pokemon[poke2])+"\r\n";break//Escort to X
          case 6:data+=SpecialMission+"\r\n";break
         }
         data+=PlaceLine+" "
         if(ftext[2]==1){
          data+=NearPlace.replace("XX",dungeons[pass[4]])
         } else {
          data+=dungeons[pass[4]]
         }
         data+=" "
         if(IsAboveGround(pass[4]))
          data+=AboveGroundFloor.replace("XX",""+pass[5])
         else
          data+=BasementFloor.replace("XX",""+pass[5])
         data+="\r\n"
         let diff=GetDifficulty(pass[1],pass[4],pass[5])
         data+=DifficultyLine+" "+diffstring.charAt(diff)+"\r\n"
         data+=RewardLine+" "
         diff=(diff+1)*100
         switch(pass[17]){
           case 0:data+=diff+" POKé";break
           case 1:data+=PlusRewardBrackets.replace("XX",diff+" POKé").replace("YY",items[pass[18]]);break
           case 2:data+=items[pass[18]];break
           case 3:data+=PlusReward.replace("XX",items[pass[18]]);break
           case 4:data+="???";break
           case 5:data+=(diff*2)+" POKé";break
           case 6:data+=PlusRewardBrackets.replace("XX",(diff*2)+" POKé").replace("YY",items[pass[18]]);break
           case 7:data+=items[pass[18]];break
           case 8:data+=items[pass[18]]+" + ?";break
           case 9:data+=PlusReward.replace("XX",items[pass[18]]);break
         }
         data+="\r\n"
         data+=WonderMailLine+"\r\n"
         let wonder=datatowonderpass(pass)
         data+=formatpass(wonder)
         return data
        }

        function decwonder(){
         let x=entrytopass(document.getElementById("wonder").value)
         let pass=[]
         if(!convertwonderpass(x,pass)
           ||pass[0]!=5
           ||pass[1]>4){
          alert(InvalidPassword)
         } else {
          x=datatowonderpass(pass)
          document.getElementById("wonder").value=formatpass(x)
          if(debug){
           document.getElementById("data").value=tostr(pass)
           alert(maildata(pass))
          } else {
           let md=maildata(pass)
           if(!md){
            alert(InvalidPassword)
           } else {
            document.getElementById("data").value=md
           }
          }
         }
        }

        function encwonder(){
         let pass=document.getElementById("data").value.split(",")
         for(let i=0;i<pass.length;i++){
          pass[i]=parseInt(pass[i],16)
         }
         x=datatowonderpass(pass)
         document.getElementById("wonder").value=formatpass(x)
         if(debug){
          document.getElementById("data").value=tostr(pass)
          alert(maildata(pass))
         }
        }
        //]]>
</script>

<p>Mission Type:
  <br>
  <select id="type" onchange="updateform();">
    <option value="">
      Help me.
    </option>
    <option value="">
      Find someone.
    </option>
    <option value="">
      Escort.
    </option>
    <option value="">
      Find item.
    </option>
    <option value="">
      Deliver item.
    </option>
  </select>
  <br>
  <br>
  Client:
  <br>
  <script type="text/javascript">
    showpkmn("client");
  </script>
  <br>
  <br>
  Pokémon to save/find:
  <br>
  <script type="text/javascript">
    showpkmn("poke");
  </script>
  <br>
  <br>
  Dungeon:
  <br>
  <script type="text/javascript">
    showdungeon("dungeon");
  </script>
  <br>
  <br>
  Floor:
  <br>
  <select id="floor" onchange="updateftext();">
    <option value="">
    </option>
  </select>
  <br>
  <br>
  Item to find/deliver:
  <br>
  <select id="item" onchange="showftext(0);">
    <option value="">
    </option>
  </select>
  <br>
  <br>
  Item reward:
  <br>
  <script type="text/javascript">
    showrewards("reward")
  </script>
  <input type="checkbox" id="money" id="money" />
  <label for="money">
    + <sup>P</sup>o<sup>K</sup>é
    <img src="/assets/images/tools/poke_pmd1.png" alt="POKé PMD1" />
  </label>
  <br>
  <br>
  Friend Area reward:
  <br>
  <script type="text/javascript">
    showareas("area");
  </script>
  <br>
  <br>
  Message Title:
  <br>
  <select id="mhead" onchange="updateftext();">
    <option value="">
    </option>
  </select>
  <br>
  <br>
  Message Body:
  <br>
  <select id="mline1">
    <option value="">
    </option>
  </select>
  <br>
  <br>
  <input type="button" value="Generate Wonder Mail" onclick="genwonder()" />
  <br>
  <br>
  Wonder Mail Password:
  <br>
  <textarea id="wonder" cols="30" rows="5">
  </textarea>
  <br>
  <br>
  <input type="button" value="Decode Wonder Mail" onclick="decwonder()" />
  <br>
  <br>
  Wonder Mail Data:
  <br>
  <textarea id="data" cols="30" rows="5">
  </textarea>
  <script type="text/javascript">
  /*
    if(debug){
      document.write('<input type="button" value="Encode Wonder Mail" onclick="encwonder()"/><br/>')
    }
  */
  </script>
</p>